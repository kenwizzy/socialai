// lib/api.ts
import { API_BASE_URL } from './config';

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject?.(error) : prom.resolve?.()));
  failedQueue = [];
};

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include', // if refresh_token is in httpOnly cookie
        });

        if (!refreshRes.ok) throw new Error('Refresh failed');

        const { access_token } = await refreshRes.json();
        localStorage.setItem('auth_token', access_token);

        processQueue();

        // Retry original request
        return apiFetch(endpoint, options);
      } catch (err) {
        processQueue(err);
        localStorage.removeItem('auth_token');
        window.location.href = '/login?session_expired=true';
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    // Queue if refresh already in progress
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve: () => resolve(apiFetch(endpoint, options)), reject });
    });
  }

  //console.log('API Response Status:', token);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }

  return response.json();
}