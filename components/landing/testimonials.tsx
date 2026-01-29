import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "SocialAI has completely transformed how we handle social media. What used to take hours now takes minutes.",
    author: "Sarah Chen",
    role: "Owner, Bloom Boutique",
    rating: 5,
  },
  {
    quote: "The AI suggestions are spot-on. It's like having a social media expert on the team without the cost.",
    author: "Marcus Johnson",
    role: "Marketing Manager, TechStart",
    rating: 5,
  },
  {
    quote: "We've seen a 60% increase in engagement since switching to SocialAI. The ROI is incredible.",
    author: "Emily Rodriguez",
    role: "Founder, Fresh Eats Cafe",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Loved by small businesses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Join thousands of businesses already growing with SocialAI
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
