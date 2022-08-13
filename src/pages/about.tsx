import Image from 'next/image'

import Experiences from '@/components/Experiences'
import Link from '@/components/Link'
import { PageMeta } from '@/components/Meta'
import PageTitle from '@/components/PageTitle'
import SocialIcon from '@/components/SocialIcon'
import siteMetadata from '@/data/siteMetadata'

const About = () => {
  return (
    <>
      <PageMeta
        title='About'
        description={`About me - ${siteMetadata.author}`}
      />
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <PageTitle>About</PageTitle>
      </div>

      <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
        <div className='flex flex-col items-center xl:items-start pt-8 xl:sticky xl:top-12'>
          <Image
            src='/static/about/profile-picture.png'
            width={192}
            height={192}
            alt='Profile Picture'
            className='rounded-full xl:rounded-lg'
            placeholder='blur'
            blurDataURL='/static/about/profile-picture-blur.png'
          />
          <h3 className='pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight'>
            {siteMetadata.author}
          </h3>
          <div className='text-gray-500 dark:text-gray-400'>
            Full Stack Developer
          </div>
          <div className='flex items-center justify-center pt-6 space-x-3'>
            <SocialIcon kind={'mail'} href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind={'github'} href={siteMetadata.github} />
            <SocialIcon kind={'linkedin'} href={siteMetadata.linkedin} />
          </div>
        </div>
        <div className='py-8 prose dark:prose-dark max-w-none xl:col-span-2'>
          <p>
            I&apos;m Full-stack developer focused on solving problems with
            digital products. I currently work at{' '}
            <Link href={'https://investree.id'}>Investree</Link> based in{' '}
            <Link
              href={
                'https://www.google.com/maps/place/Jakarta,+Daerah+Khusus+Ibukota+Jakarta/@-6.2293866,106.6890864,11z'
              }
            >
              Jakarta, Indonesia.
            </Link>{' '}
            Developed scalable software with specifications and business
            requirements. Perform technical analysis and testing to deliver
            business value through quality software.
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
          <h2>Experience</h2>
          <p>
            Here&apos;s a brief timeline of my careers. If you want to know more
            about me as a professional programmer, see{' '}
            <Link href='https://drive.google.com/file/d/15U3JhtsQqeemOEcNaNS17QGbTnXEu3Gk/view?usp=sharing'>
              my resume
            </Link>
          </p>

          <Experiences />
        </div>
      </div>
    </>
  )
}

export default About
