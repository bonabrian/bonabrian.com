import {
  JavaScript,
  Jest,
  Kotlin,
  Laravel,
  NextJS,
  PHP,
  RabbitMQ,
  ReactJS,
  Redis,
  Spring,
  TailwindCSS,
  TypeScript,
  VueJS,
} from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types/experience';

export const EXPERIENCES: Experience[] = [
  {
    company: {
      name: 'Yummy Bros',
      logo: '/media/resume/yummybros.png',
      url: 'https://yummybros.com',
      location: 'Singapore',
      workplaceType: 'Remote',
      jobType: 'Freelance',
    },
    role: 'Full-stack Engineer',
    startDate: '2023-12',
    endDate: null,
    stacks: [
      {
        name: 'Next.js',
        icon: <NextJS className={cn('size-5 fill-black', 'dark:fill-white')} />,
      },
      {
        name: 'React.js',
        icon: <ReactJS className={cn('size-5 fill-[#61DAFB]')} />,
      },
      {
        name: 'TypeScript',
        icon: <TypeScript className={cn('size-5 fill-[#3178C6]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'Tailwind CSS',
        icon: <TailwindCSS className={cn('size-5 fill-[#06B6D4]')} />,
      },
      {
        name: 'Laravel',
        icon: <Laravel className={cn('size-5 fill-[#FF2D20]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
    ],
    accomplishments: [
      'Expanded application capabilities through the implementation of additional features aligned with evolving business requirements.',
      'Utilized Next.js to code the Storefront, implementing Server-Side Rendering (SSR) for enhanced performance and user experience.',
      'Developed a dynamic Users Dashboard (CMS) with React.js, elevating the interface and usability for content management.',
      'Developed robust APIs to seamlessly connect the Storefront and CMS, ensuring efficient data communication and exchange.',
      'Currently migrating from JavaScript to TypeScript, enhancing codebase maintainability, scalability, and type safety.',
      'Currently transforming the styling infrastructure by migrating from Bootstrap to the Tailwind CSS.',
      'Build reusable UI components.',
    ],
  },
  {
    company: {
      name: 'Investree',
      logo: '/media/resume/investree.png',
      url: 'https://investree.id',
      location: 'Jakarta',
      workplaceType: 'Hybrid',
      jobType: 'Full-time',
    },
    role: 'Full-stack Engineer',
    startDate: '2020-11',
    endDate: null,
    stacks: [
      {
        name: 'Spring',
        icon: <Spring className={cn('size-5 fill-[#6DB33F]')} />,
      },
      {
        name: 'Kotlin',
        icon: <Kotlin className={cn('size-5 fill-[#7F52FF]')} />,
      },
      {
        name: 'Vue.js',
        icon: <VueJS className={cn('size-5 fill-[#4FC08D]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
      {
        name: 'Jest',
        icon: <Jest className={cn('size-5 fill-[#C21325]')} />,
      },
      {
        name: 'Laravel',
        icon: <Laravel className={cn('size-5 fill-[#FF2D20]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
      {
        name: 'Redis',
        icon: <Redis className={cn('size-5 fill-[#DC382D]')} />,
      },
      {
        name: 'RabbitMQ',
        icon: <RabbitMQ className={cn('size-5 fill-[#FF6600]')} />,
      },
    ],
    accomplishments: [
      'Designed, developed, and maintained high-performance, robust, and scalable server-side applications using Kotlin (Spring) for the back-end, PHP (Laravel) for legacy systems, and JavaScript (Vue) for front-end development.',
      'Collaborated closely with cross-functional teams, including designers, product managers, and stakeholders to ensure seamless integration and implementation of new features.',
      'Developed a flexible and configurable loan automation process that efficiently streamlines business operations.',
      'Developed and maintained APIs that are widely used by our partners, facilitating seamless collaboration and integration with their systems.',
      'Contributed to the development of technical standards, best practices, and design patterns.',
      'Developed Partner Dashboard that are used by our partners.',
      'Actively participated in code reviews, providing valuable feedback and ensuring adherence to coding standards, best practices, and quality assurance.',
      'Conducted comprehensive unit testing on all new features and enhancements.',
      'Resolved technical issues in a timely and efficient manner.',
      'Deliver delightful UX and performant front-end software.',
      'Build reusable UI components.',
      'Adhered to an agile methodology for the software development process.',
      'Integrated with various third-party services and APIs, including digital signature, document generation, and payment systems to add additional functionality to applications.',
      'Maintained and updated documentation for the software development process.',
    ],
  },
  {
    company: {
      name: 'Varnion',
      logo: '/media/resume/varnion.png',
      url: 'https://varnion.com',
      location: 'Jakarta',
      workplaceType: 'On-Site',
      jobType: 'Full-time',
    },
    role: 'Full-stack Engineer',
    startDate: '2018-06',
    endDate: '2020-08',
    stacks: [
      {
        name: 'Laravel',
        icon: <Laravel className={cn('size-5 fill-[#FF2D20]')} />,
      },
      {
        name: 'PHP',
        icon: <PHP className={cn('size-5 fill-[#777BB4]')} />,
      },
      {
        name: 'Vue.js',
        icon: <VueJS className={cn('size-5 fill-[#4FC08D]')} />,
      },
      {
        name: 'React.js',
        icon: <ReactJS className={cn('size-5 fill-[#61DAFB]')} />,
      },
      {
        name: 'JavaScript',
        icon: <JavaScript className={cn('size-5 fill-[#F7DF1E]')} />,
      },
    ],
    accomplishments: [
      'Refactored legacy code to adhere to modern design patterns, ensuring maintainability and longevity of software systems.',
      'Optimized database structure to improve performance and scalability, reducing latency and downtime.',
      'Integrated Elasticsearch for advanced network monitoring, resulting in improved load times and real-time data visualization.',
      "Conceptualized and designed innovative features to enhance the company's products, providing a competitive advantage and improved user experience.",
      'Mentored and provided guidance to junior developers on best practices, coding standards, and software development methodologies.',
      'Stayed current with emerging technologies and industry trends to continuously improve software systems and capabilities.',
      'Developed an internal data management application using PHP (Laravel) to effectively handle data-related tasks within the organization.',
    ],
  },
];
