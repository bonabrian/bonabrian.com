import type { Metadata } from 'next'
import Image from 'next/image'

import { Document, GitHub, LinkedIn, Mail } from '@/components/icons'
import PageHeader from '@/components/page-header'
import { Button, Container, Link } from '@/components/ui'
import { GITHUB_ACCOUNT } from '@/config/github'
import { ROUTES } from '@/config/links'
import site from '@/config/site'
import { env } from '@/lib/env'
import { seo } from '@/lib/meta'
import cn from '@/utils/cn'

import AvailableForHire from './available-for-hire'
import TechStack from './tech-stack'

export const metadata: Metadata = seo({
  title: 'About',
  description: 'Discover insights about me, my career journey, and more.',
  keywords: ['bio', 'biography', 'information', 'about'],
  url: ROUTES.about,
})

const AboutPage = () => {
  const isAvailableForHire = env.NEXT_PUBLIC_AVAILABLE_FOR_HIRE

  return (
    <>
      <PageHeader title="About" description="A short story of me." />
      <Container>
        <div
          className={cn(
            'items-start space-y-2',
            'xl:grid xl:grid-cols-4 xl:gap-x-6 xl:space-y-0',
          )}
        >
          <div
            className={cn('flex flex-col items-center', 'xl:sticky xl:top-24')}
          >
            <Image
              src={site.author.avatar}
              alt={site.author.name}
              width={256}
              height={256}
              placeholder="blur"
              blurDataURL="/media/bonabrian/bonabrian-small.jpg"
              className={cn('rounded-full object-cover', 'xl:rounded-xl')}
              quality={100}
            />
            <div className={cn('flex flex-col items-center py-2')}>
              <h3 className={cn('font-cal text-xl')}>{site.author.name}</h3>
              <h4 className={cn('font-cal text-muted-foreground')}>
                Full-stack Engineer
              </h4>
            </div>
            <AvailableForHire isAvailable={isAvailableForHire} />
          </div>

          <div
            className={cn(
              'prose max-w-none',
              'dark:prose-dark',
              'xl:col-span-3',
            )}
          >
            <h2 className={cn('font-cal text-2xl', 'lg:text-3xl')}>About Me</h2>
            <p>
              Hi there! Thanks for visiting my digital home on the internet.
            </p>
            <p>
              I'm Bona Brian Siagian, a Full-stack Engineer with a focus on
              delivery innovative digital solutions that drive business value. I
              am currently working at{' '}
              <Link href="https://investree.id">Investree</Link>, a
              well-regarded company located in{' '}
              <Link href="https://www.google.com/maps/place/Jakarta,+Daerah+Khusus+Ibukota+Jakarta/@-6.2293866,106.6890864,11z">
                Jakarta, Indonesia
              </Link>
              , where I have the opportunity to put my skills to work on a daily
              basis.
            </p>
            <p>
              I have a wealth of experience in crafting scalable software
              systems that meet both technical and business requirements,
              utilizing a range of programming languages such as{' '}
              <Link href="https://kotlinlang.org/">Kotlin</Link>,{' '}
              <Link href="https://www.php.net/">PHP</Link>,{' '}
              <Link href="https://www.javascript.com/">JavaScript</Link>, and{' '}
              <Link href="https://www.typescriptlang.org/">TypeScript</Link>.
              Leveraging my proficiency in backend frameworks like{' '}
              <Link href="https://spring.io/">Spring</Link> and{' '}
              <Link href="https://laravel.com/">Laravel</Link>, coupled with
              expertise in frontend frameworks such as{' '}
              <Link href="https://reactjs.org/">React</Link> and{' '}
              <Link href="https://vuejs.org/">Vue</Link>, allows me to deliver
              efficient and effective software solutions that meet the unique
              needs of organizations.
            </p>
            <p>
              In my role as a Full-Stack Engineer, I take a charge of designing,
              developing, and maintaining software that meets both technical
              specifications and business requirements. I understand the
              importance of delivering high-quality products that not only meet
              technical requirements, but also provide tangible business value.
              To achieve this, I work closely with organizations to understand
              their unique needs and requirements, and I utilize my technical
              expertise to deliver customized solutions that drive business
              outcomes.
            </p>
            <p>
              I consider myself a curious and inquisitive person, always eager
              to learn and improve my skills. In my free time, I enjoy working
              on personal side projects, as it provides me with an opportunity
              to explore new technologies and further my knowledge and
              expertise. I am also a continuous learner, and I actively seek out
              new learning opportunities in order to stay up-to-date with the
              latest industry advancements.
            </p>
            <p>
              Besides hacking, I also have a strong appreciation for video games
              and music. I find that these activities provide an important
              balance to my professional life, allowing me to relax and recharge
              after a long day at work. I believe that maintaining a healthy
              work-life balance is is the key to keeping both my code and my
              spirits bug-free! 🎮🎶
            </p>
            <p>
              If you're interested in learning more about my professional
              background and qualifications, I encourage you to review{' '}
            </p>
            <Link href={ROUTES.resume} className={cn('text-inherit')}>
              <Button variant="shadow" className={cn('gap-x-1')}>
                <Document className={cn('h-5 w-5')} /> My Resume
              </Button>
            </Link>

            <h2 className={cn('font-cal text-2xl', 'lg:text-3xl')}>
              Tech Stack
            </h2>
            <TechStack />

            <h2 className={cn('font-cal text-2xl', 'lg:text-3xl')}>
              Let's Connect
            </h2>
            <p>
              Questions or collaborations? Reach out to me at{' '}
              <Link
                href={`mailto:${site.author.email}?subject=Hi Bona!`}
                className={cn('underline')}
              >
                {site.author.email}
              </Link>{' '}
              or connect through social media. Let's build something amazing
              together!
            </p>
            <div className={cn('my-2 flex items-center gap-4')}>
              <Link
                href={GITHUB_ACCOUNT.url}
                className={cn(
                  'text-muted-foreground transition-colors duration-200',
                  'hover:text-foreground',
                )}
              >
                <GitHub className={cn('h-5 w-5')} />
              </Link>
              <Link
                href={site.author.linkedIn}
                className={cn(
                  'text-muted-foreground transition-colors duration-200',
                  'hover:text-foreground',
                )}
              >
                <LinkedIn className={cn('h-5 w-5')} />
              </Link>
              <Link
                href={`mailto:${site.author.email}?subject=Hi Bona!`}
                className={cn(
                  'text-muted-foreground transition-colors duration-200',
                  'hover:text-foreground',
                )}
              >
                <Mail className={cn('h-5 w-5')} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AboutPage
