'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { EMAIL_URL } from '@/lib/constants';
import { copyToClipboard } from '@/lib/clipboard';
import { Copy, Mail, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter a message.');
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      toast.error(
        'Contact form is not configured. Please email me directly.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Portfolio contact from ${name.trim()}`,
        }),
      });

      const data = (await response.json()) as { success?: boolean };

      if (!response.ok || !data.success) {
        throw new Error('Submission failed');
      }

      toast.success('Message sent! I will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      toast.error('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or want to collaborate? Send a message or
            reach out through the channels below.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3" delay={100}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
                <CardDescription>
                  I typically respond within 1–2 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot for spam bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                  />

                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      autoComplete="name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      'Send message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2" delay={200}>
            <Card className="h-full border-border/50">
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                  Prefer email? Copy the address or open your mail client.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${EMAIL_URL}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {EMAIL_URL}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-8 px-2"
                      onClick={() =>
                        copyToClipboard(EMAIL_URL, 'Email copied to clipboard')
                      }
                    >
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      Copy email
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
