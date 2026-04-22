import { useState } from "react";
import { Mail } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Message sent", description: "We'll get back to you soon." });
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <SEOHead title="Contact Kos Car Rental"
        description="Have a question about car rental in Kos? Contact Kos Car Rental for assistance."
        canonical="https://kos-car-rental.com/contact"
        jsonLd={[{ "@context": "https://schema.org", "@type": "WebPage", "name": "Contact Kos Car Rental", "url": "https://kos-car-rental.com/contact" }]}
      />

      <Section>
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>

        <div className="mt-6 max-w-2xl space-y-6">
          <p className="text-foreground leading-relaxed">
            Have a question about renting a car in Kos? We&rsquo;re happy to help.
          </p>

          <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm border">
            <Mail className="text-primary shrink-0" size={22} />
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <a href="mailto:info@kos-car-rental.com" className="text-primary hover:underline text-sm">info@kos-car-rental.com</a>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Please note:</strong> We are an independent information website, not a car rental company. We cannot make bookings or modify existing reservations. For booking questions, please try the search widget above or read our <a href="/kos-car-rental-faq" className="text-primary underline hover:text-accent">Kos car rental FAQ</a>.</p>
            <p>For on-the-ground emergencies with a Kos operator, the Hellenic <strong>Tourist Police</strong> are reachable 24/7 at <strong>1571</strong>. For post-trip financial disputes, the Dodecanese consumer authority INKA12 accepts complaints at <a href="https://inka12.gr/" target="_blank" rel="noopener" className="text-primary underline hover:text-accent">inka12.gr</a>. Thinking of driving to Bodrum? Read our <a href="/ferry-to-kos" className="text-primary underline hover:text-accent">Kos ferry-port rules</a> first — Greek rental contracts forbid the crossing.</p>
          </div>

          {submitted ? (
            <div className="rounded-lg bg-card p-8 text-center shadow-sm border">
              <p className="text-lg font-semibold text-foreground">Thank you!</p>
              <p className="text-muted-foreground mt-1">We&rsquo;ll respond within 24 hours.</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="rounded-lg bg-card p-6 shadow-sm border space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><label>Don&rsquo;t fill this out: <input name="bot-field" /></label></p>

              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required maxLength={100} placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required maxLength={2000} rows={5} placeholder="Your question or suggestion..." />
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Send Message</Button>
            </form>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
