import { FileTextIcon } from 'lucide-react';

import { Email, GitHub, LinkedIn } from '@/components/icons';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

import TechStacks from './tech-stacks';

const Biography = () => {
  return (
    <>
      <p>Hi there! Thanks for visiting my digital home on the internet.</p>
      <p>
        I'm Bona Brian Siagian, a Software Engineer passionate about building
        innovative digital solutions that drive real business impact. I
        specialize in both frontend development—the coding you see on the
        screen—and backend development, the processes happening behind the
        scenes.
      </p>
      <p>
        I have extensive experience in crafting scalable software systems that
        align with both technical and business needs, leveraging a wide range of
        technologies:
      </p>
      <ul>
        <li>
          Languages:{' '}
          <Link href="https://www.typescriptlang.org/">TypeScript</Link>,{' '}
          <Link href="https://www.javascript.com/">JavaScript</Link>,{' '}
          <Link href="https://www.php.net/">PHP</Link>,{' '}
          <Link href="https://kotlinlang.org/">Kotlin</Link>{' '}
        </li>
        <li>
          Frontend Frameworks & Meta-frameworks:{' '}
          <Link href="https://reactjs.org/">React</Link>,{' '}
          <Link href="https://vuejs.org/">Vue</Link>,{' '}
          <Link href="https://nextjs.org/">Next.js</Link>,{' '}
          <Link href="https://nuxt.com/">Nuxt.js</Link>
        </li>
        <li>
          Backend Frameworks: <Link href="https://laravel.com/">Laravel</Link>,{' '}
          <Link href="https://spring.io/">Spring</Link>
        </li>
      </ul>
      <p>
        As a Software Engineer, I take ownership of designing, developing, and
        maintaining software that meets technical specifications while
        delivering tangible business value. I work closely with organizations to
        understand their unique requirements and apply my technical expertise to
        build customized solutions that drive success.
      </p>
      <p>
        I consider myself a curious and inquisitive learner, always eager to
        expand my skills. In my free time, I enjoy working on personal side
        projects, as they allow me to explore new technologies and refine my
        expertise. I actively seek out new learning opportunities to stay ahead
        of industry trends and advancements.
      </p>
      <p>
        Besides hacking, I also have a strong appreciation for video games and
        music. I find that these activities provide an important balance to my
        professional life, allowing me to relax and recharge after a long day at
        work. I believe that maintaining a healthy work-life balance is is the
        key to keeping both my code and my spirits bug-free! 🎮🎶
      </p>
      <p>
        If you'd like to learn more about my professional background and
        qualifications, feel free to explore my resume.{' '}
      </p>
      <Link href={ROUTES.resume} className="text-inherit">
        <Button variant="shadow" className="gap-x-1">
          <FileTextIcon /> My Resume
        </Button>
      </Link>

      <h2 className="font-cal">Tech Stack</h2>
      <TechStacks />

      <h2 className="font-cal">Let's Connect</h2>
      <p>
        Questions or collaborations? Reach out to me at{' '}
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Bona!`}
          className="underline"
        >
          {SITE.author.email}
        </Link>{' '}
        or connect through social media. Let's build something amazing together!
      </p>
      <div className="my-2 flex items-center gap-4">
        <Link
          href={SITE.author.github.url}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <GitHub className="size-5" />
        </Link>
        <Link
          href={SITE.author.linkedIn}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <LinkedIn className="size-5" />
        </Link>
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Bona!`}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Email className="size-5" />
        </Link>
      </div>
    </>
  );
};

export default Biography;
