import {
  JavaScript,
  Kotlin,
  Laravel,
  PHP,
  RabbitMq,
  ReactJs,
  Spring,
  VueJs,
} from '@/components/icons'
import cn from '@/lib/cn'

interface Organization {
  name: string
  logo: string
  url: string
}

interface Stack {
  name: string
  backgroundColor: string
  color: string
  icon?: JSX.Element
}

interface Experience {
  organization: Organization
  role: string
  date: string
  stacks: Array<Stack>
  accomplishments: Array<string>
}

export const experiences: Experience[] = [
  {
    organization: {
      name: 'Investree',
      logo: '/static/images/resume/investree.png',
      url: 'https://investree.id',
    },
    role: 'Full-stack Engineer',
    date: 'November 2020 - Present',
    stacks: [
      {
        name: 'Spring',
        backgroundColor: 'rgba(109, 179, 63, 0.3)',
        color: '#6DB33F',
        icon: <Spring className={cn('w-4 h-4')} />,
      },
      {
        name: 'Kotlin',
        backgroundColor: 'rgba(127, 82, 255, 0.3)',
        color: '#7F52FF',
        icon: <Kotlin className={cn('w-4 h-4')} />,
      },
      {
        name: 'Vue',
        backgroundColor: 'rgba(79, 192, 141, 0.3)',
        color: '#4FC08D',
        icon: <VueJs className={cn('w-4 h-4')} />,
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgba(247, 223, 30, 0.2)',
        color: '#F7DF1E',
        icon: <JavaScript className={cn('w-4 h-4')} />,
      },
      {
        name: 'Laravel',
        backgroundColor: 'rgba(255, 45, 32, 0.3)',
        color: '#FF2D20',
        icon: <Laravel className={cn('w-4 h-4')} />,
      },
      {
        name: 'PHP',
        backgroundColor: 'rgba(119, 123, 180, 0.3)',
        color: '#777BB4',
        icon: <PHP className={cn('w-4 h-4')} />,
      },
      {
        name: 'RabbitMQ',
        backgroundColor: 'rgba(255, 102, 0, 0.3)',
        color: '#FF6600',
        icon: <RabbitMq className={cn('w-4 h-4')} />,
      },
    ],
    accomplishments: [
      'Designed, developed, and maintained high-performance, robust, and scalable server-side applications using Kotlin (Spring) for the back-end, PHP (Laravel) for legacy systems, and JavaScript (Vue) for front-end development.',
      'Collaborated closely with cross-functional teams, including designers, product managers, and stakeholders to ensure seamless integration and implementation of new features.',
      'Developed a flexible and configurable loan automation process that efficiently streamlines business operations.',
      'Developed and maintained APIs that are widely used by our partners, facilitating seamless collaboration and integration with their systems.',
      'Contributed to the development of technical standards, best practices, and design patterns.',
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
    organization: {
      name: 'Varnion',
      logo: '/static/images/resume/varnion.png',
      url: 'https://www.varnion.com',
    },
    role: 'Full-stack Engineer',
    date: 'June 2018 - August 2020',
    stacks: [
      {
        name: 'Laravel',
        backgroundColor: 'rgba(255, 45, 32, 0.3)',
        color: '#FF2D20',
        icon: <Laravel />,
      },
      {
        name: 'PHP',
        backgroundColor: 'rgba(119, 123, 180, 0.3)',
        color: '#777BB4',
        icon: <PHP />,
      },
      {
        name: 'Vue',
        backgroundColor: 'rgba(79, 192, 141, 0.3)',
        color: '#4FC08D',
        icon: <VueJs />,
      },
      {
        name: 'React',
        backgroundColor: 'rgba(97, 218, 251, 0.3)',
        color: '#61DAFB',
        icon: <ReactJs />,
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgba(247, 223, 30, 0.2)',
        color: '#F7DF1E',
        icon: <JavaScript />,
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
]
