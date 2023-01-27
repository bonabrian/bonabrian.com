import Image from 'next/image'

import Link from '@/components/Link'
import PageSeo from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'
import SocialIcon from '@/components/SocialIcon'
import { siteMetaData } from '@/data'

const About = () => {
  return (
    <>
      <PageSeo
        title="About"
        description="Learn a bit about me, careers, and more"
        keywords={['bio', 'biography', 'information', 'about']}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>About</PageTitle>
      </div>

      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center xl:items-start pt-8 xl:sticky xl:top-12">
          <Image
            src="/static/about/profile-picture.png"
            width={192}
            height={192}
            alt="Profile Picture"
            className="rounded-full xl:rounded-lg"
            placeholder="blur"
            blurDataURL="/static/about/profile-picture-blur.png"
            objectFit="cover"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
            {siteMetaData.author}
          </h3>
          <div className="text-gray-500 dark:text-gray-400">
            Full Stack Developer
          </div>
          <div className="flex items-center justify-center pt-6 space-x-3">
            <SocialIcon kind="mail" href={`mailto:${siteMetaData.email}`} />
            <SocialIcon kind="github" href={siteMetaData.github} />
            <SocialIcon kind="linkedin" href={siteMetaData.linkedin} />
          </div>
        </div>
        <div className="py-8 prose dark:prose-dark max-w-none xl:col-span-2">
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <p>
            Hi Visitor 👋, My name is Bona Brian Siagian as a Full-stack
            developer who focused on solving problems with digital products. I
            currently work at <Link href="https://investree.id">Investree</Link>{' '}
            based in{' '}
            <Link href="https://www.google.com/maps/place/Jakarta,+Daerah+Khusus+Ibukota+Jakarta/@-6.2293866,106.6890864,11z">
              Jakarta, Indonesia.
            </Link>
          </p>
          <p>
            I craft scalable software with specifications and business
            requirements. Perform technical analysis and testing to deliver
            business value through quality software. I enjoy creating things
            that live on the internet.
          </p>
          <p>
            I consider myself a curious and inquisitive person and a continuous
            learner, so on my spare time I like to work on side projects and try
            to keep learning new stuff to improve my skill set.
          </p>
          <p>
            Besides hacking, I also enjoy playing video games, and listening to
            music.
          </p>
          <p>
            Here&apos;s a brief timeline of my careers. If you want to know more
            about me as a professional programmer, see{' '}
            <Link href="/resume">my resume</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default About
