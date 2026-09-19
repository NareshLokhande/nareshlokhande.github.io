import { ContactForm } from '@/components/contact-form';
import { CopyButton } from '@/components/copy-button';
import { Section } from '@/components/section';
import { EMAIL_URL, EMPLOYER, LOCATION, TIMEZONE } from '@/lib/constants';

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      intro="Email is fastest. The form goes to the same inbox."
    >
      <h3 className="text-xl">Hiring for a backend role?</h3>
      <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
        I&apos;m a Software Engineer at {EMPLOYER.short} in {LOCATION} ({TIMEZONE}),
        open to remote work, and happy to talk about backend roles. I usually reply
        within two business days.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={`mailto:${EMAIL_URL}`}
          className="underline underline-offset-4 hover:text-primary"
        >
          {EMAIL_URL}
        </a>
        <CopyButton text={EMAIL_URL} label="Copy address" />
      </div>
      <ContactForm />
    </Section>
  );
}
