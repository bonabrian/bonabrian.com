import Image from 'next/image'

import { PageMeta } from '@/components/Meta'
import PageTitle from '@/components/PageTitle'
import SocialIcon from '@/components/SocialIcon'
import TextLink from '@/components/TextLink'
import siteMetadata from '@/data/siteMetadata'

const About = () => {
  const yearExperience =
    new Date().getFullYear() - new Date('2018-06-25').getFullYear()

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
            {`
              Full-stack developer with ${yearExperience}+ years of experience using a range of
              Frontend and Backend technologies like Java/Kotlin (Spring), PHP
              (Laravel), Javascript/Typescript (Vue, React). Developed scalable
              applications with specifications and business requirements. Perform
              technical analysis and testing to deliver business value through
              quality software.
            `}
          </p>
          <h2>Timeline</h2>
          <p>
            Here&apos;s a brief timeline of my life events. If you want to know
            more about me as a professional programmer, see{' '}
            <TextLink href='/resume' label='my resume' />
          </p>
          <h3>2022</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            quaerat aliquam est mollitia rerum fuga dolor, aut delectus repellat
            cumque, sunt ex aliquid consequuntur quod adipisci possimus
            repellendus. Nostrum, dolorum.
          </p>
          <h3>2021</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo odio
            distinctio explicabo, facilis consequuntur labore, quidem mollitia
            alias magnam eveniet voluptates itaque maiores corporis ad, dolores
            aspernatur nihil tempora eos?
          </p>
          <h3>2020</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            voluptate earum nam ullam enim impedit repellendus nobis corporis
            consequatur magni dolore officia facilis, quisquam tempore. Eos ad
            doloremque corrupti maxime!
          </p>
          <h3>2019</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
            nesciunt quia aspernatur qui veniam quisquam voluptatum dignissimos
            nisi rerum vel eum dolore eaque amet, delectus modi iste esse,
            molestias recusandae.
          </p>
          <h3>2018</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga unde
            atque explicabo soluta! Dignissimos dolores magnam totam repellat ab
            maiores sed, ullam eos velit ratione facilis mollitia perferendis
            sit perspiciatis?
          </p>
        </div>
      </div>
    </>
  )
}

export default About
