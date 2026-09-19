'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { EMAIL_URL } from '@/lib/constants';
import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const mailto = (
  <a href={`mailto:${EMAIL_URL}`} className="underline underline-offset-4 hover:text-primary">
    {EMAIL_URL}
  </a>
);

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('unconfigured');
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name'));
    const botcheck = (form.elements.namedItem('botcheck') as HTMLInputElement).checked;
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email: data.get('email'),
          message: data.get('message'),
          subject: `Portfolio contact from ${name}`,
          botcheck,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error('Submission failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-prose space-y-5">
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" name="name" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Role, team, and a link to the job description"
        />
      </div>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <Button type="submit" disabled={sending}>
        {sending && <Spinner />}
        {sending ? 'Sending' : 'Send message'}
      </Button>
      <p role="status" aria-live="polite" className="text-sm">
        {status === 'sent' && 'Message sent. I reply within two business days.'}
        {status === 'error' && <>Something went wrong. Email me at {mailto} instead.</>}
        {status === 'unconfigured' && <>The form is not set up yet. Email me at {mailto} instead.</>}
      </p>
    </form>
  );
}
