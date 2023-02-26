import Image from 'next/image'
import { RiGithubFill, RiLinkedinFill, RiMailFill } from 'react-icons/ri'

import Link from '@/components/link'
import { Metadata } from '@/components/metadata'
import PageHeader from '@/components/page-header'
import { routePaths, siteMetadata } from '@/data'

const About = () => {
  return (
    <>
      <Metadata
        title="About"
        description="Learn a bit about me, careers, and more"
        keywords={['bio', 'biography', 'information', 'about']}
      />
      <div className="my-4 space-y-3 md:space-y-5">
        <PageHeader title="About" />
      </div>

      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center xl:sticky xl:top-24">
          <div className="relative w-52 h-52 xl:w-72 xl:h-72">
            <Image
              src={siteMetadata.avatarUrl}
              alt={siteMetadata.author}
              className="rounded-full xl:rounded-xl object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="/static/avatar-blur.png"
            />
          </div>
          <div className="flex flex-col items-center py-4">
            <h3 className="text-xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <h4 className="text-base font-medium text-gray-900/50 dark:text-white/60">
              Full-stack Engineer
            </h4>
            <div className="flex items-center justify-center gap-4 my-2">
              <Link href={siteMetadata.github} showExternalLinkIcon={false}>
                <RiGithubFill className="w-7 h-7 hover:fill-primary-500 transition-all ease-in-out duration-150" />
              </Link>
              <Link href={siteMetadata.linkedin} showExternalLinkIcon={false}>
                <RiLinkedinFill className="w-7 h-7 hover:fill-primary-500 transition-all ease-in-out duration-150" />
              </Link>
              <Link href={siteMetadata.github} showExternalLinkIcon={false}>
                <RiMailFill className="w-7 h-7 hover:fill-primary-500 transition-all ease-in-out duration-150" />
              </Link>
            </div>
          </div>
        </div>
        <div className="prose dark:prose-dark max-w-none xl:col-span-2 text-justify">
          <p>
            Hello! I am Bona Brian Siagian, a Full-Stack Engineer with a focus
            on delivering innovative digital solutions that drive business
            value. I am currently working at{' '}
            <Link href="https://investree.id">Investree</Link>, a well-regarded
            company located in{' '}
            <Link href="https://www.google.com/maps/place/Jakarta,+Daerah+Khusus+Ibukota+Jakarta/@-6.2293866,106.6890864,11z">
              Jakarta, Indonesia
            </Link>
            , where I have the opportunity to put my skills to work on a daily
            basis.
          </p>
          <p>
            I have a wealth of experience in crafting scalable software systems
            that meet both technical and business requirements, utilizing a
            range of programming languages such as{' '}
            <Link href="https://kotlinlang.org/">Kotlin</Link>,{' '}
            <Link href="https://www.php.net/">PHP</Link>,{' '}
            <Link href="https://www.javascript.com/">JavaScript</Link>, and{' '}
            <Link href="https://www.typescriptlang.org/">TypeScript</Link>. My
            expertise in backend frameworks such as{' '}
            <Link href="https://spring.io/">Spring</Link> and{' '}
            <Link href="https://laravel.com/">Laravel</Link>, and frontend
            frameworks such as <Link href="https://reactjs.org/">React</Link>{' '}
            and <Link href="https://vuejs.org/">Vue</Link>, allows me to deliver
            efficient and effective software solutions that meet the needs of
            organizations.
          </p>
          <p>
            As a Full-Stack Engineer, I am responsible for designing,
            developing, and maintaining software that meets both technical
            specifications and business requirements. I understand the
            importance of delivering high-quality products that not only meet
            technical requirements, but also provide tangible business value. To
            achieve this, I work closely with organizations to understand their
            unique needs and requirements, and I utilize my technical expertise
            to deliver customized solutions that drive business outcomes.
          </p>
          <p>
            I consider myself a curious and inquisitive person, always eager to
            learn and improve my skills. In my free time, I enjoy working on
            personal side projects, as it provides me with an opportunity to
            explore new technologies and further my knowledge and expertise. I
            am also a continuous learner, and I actively seek out new learning
            opportunities in order to stay up-to-date with the latest industry
            advancements.
          </p>
          <p>
            Besides hacking, I also have a strong appreciation for video games
            and music. I find that these activities provide an important balance
            to my professional life, allowing me to relax and recharge after a
            long day at work. I believe that maintaining a healthy work-life
            balance is essential for both personal and professional well-being.
          </p>
          <p>
            If you're interested in learning more about my professional
            background and qualifications, I encourage you to review{' '}
            <Link href={routePaths.RESUME}>my resume.</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default About
