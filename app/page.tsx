import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { HowIDevelop } from '@/components/how-i-develop';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Testimonials } from '@/components/testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <HowIDevelop />
      <Skills />
      <Contact />
    </main>
  );
}
