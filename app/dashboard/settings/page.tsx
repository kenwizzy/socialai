"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Link2,
  CreditCard,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Check,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
//import { API } from "@/lib/config";
import { apiFetch } from '@/lib/api';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { API } from "@/lib/config";

const connectedAccounts = [
  {
    platform: "Instagram",
    icon: Instagram,
    handle: "@yourbrand",
    status: "connected",
    followers: "12.4K",
    color: "text-pink-400",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    handle: "@yourbrand",
    status: "connected",
    followers: "8.2K",
    color: "text-sky-400",
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    handle: "Your Brand",
    status: "connected",
    followers: "15.1K",
    color: "text-blue-300",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    handle: "Your Brand Inc.",
    status: "disconnected",
    followers: null,
    color: "text-blue-400",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    current: false,
    features: ["3 social accounts", "100 posts/month", "Basic analytics"],
  },
  {
    name: "Professional",
    price: "$79",
    current: true,
    features: ["10 social accounts", "Unlimited posts", "Advanced analytics", "AI assistant"],
  },
  {
    name: "Enterprise",
    price: "$199",
    current: false,
    features: ["Unlimited accounts", "Priority support", "Custom integrations", "Team features"],
  },
];

interface ProtectedResponse {
  message: string;
  data?: any;        // adjust to your actual response shape
  user?: { id: number; name: string };
}

export default function SettingsPage() {
   const router = useRouter()
   const [result, setResult] = useState<ProtectedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

    const handleConnect = async () => {
     setLoading(true);
    setResult(null);

   try {
      const data = await apiFetch<ProtectedResponse>('/dashboard/auth/facebook/connect'); // ← your Laravel GET endpoint

      setResult(data);
      toast.success('Protected data loaded successfully!', {
        autoClose: 4000,
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to fetch protected data', {
        position: 'top-right',
        autoClose: 6000,
      });

      // Optional: if 401 and refresh failed → already redirected in apiFetch
    } finally {
      setLoading(false);
    } 
    
    // Simulate login - in production, this would call an auth API
    await new Promise(resolve => setTimeout(resolve, 1000))
    //router.push("/dashboard")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="accounts" className="gap-2">
            <Link2 className="h-4 w-4" />
            Accounts
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/20 text-2xl text-primary">JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Preferences</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Manage your security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connected Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Connected Social Accounts</CardTitle>
              <CardDescription>Manage your connected social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedAccounts.map((account) => (
                <div
                  key={account.platform}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("rounded-lg bg-card p-2", account.color)}>
                      <account.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{account.platform}</p>
                      <p className="text-sm text-muted-foreground">{account.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {account.status === "connected" ? (
                      <>
                        <div className="text-right">
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            <Check className="mr-1 h-3 w-3" />
                            Connected
                          </Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {account.followers} followers
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleConnect} variant="outline" size="sm">
                        Try Connect
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Email Notifications</h4>
                {[
                  { label: "Campaign Performance", desc: "Weekly summary of your campaigns" },
                  { label: "New Mentions", desc: "When someone mentions your brand" },
                  { label: "Scheduled Posts", desc: "Reminders before posts go live" },
                  { label: "AI Suggestions", desc: "New AI-generated content ideas" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Push Notifications</h4>
                {[
                  { label: "Urgent Alerts", desc: "Critical issues requiring attention" },
                  { label: "Comment Replies", desc: "When someone replies to your comments" },
                  { label: "Goal Achievements", desc: "When you hit campaign milestones" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={cn(
                      "rounded-lg border p-4 transition-colors",
                      plan.current
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{plan.name}</h4>
                      {plan.current && (
                        <Badge className="bg-primary text-primary-foreground">Current</Badge>
                      )}
                    </div>
                    <p className="mb-4 text-2xl font-bold text-foreground">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </p>
                    <ul className="mb-4 space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.current ? "outline" : "default"}
                      className="w-full"
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-card p-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
