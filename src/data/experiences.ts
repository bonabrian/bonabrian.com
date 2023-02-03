interface Organization {
  name: string
  logo: string
  url: string
}

interface Stack {
  name: string
  backgroundColor: string
  color: string
}

export interface Experience {
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
        backgroundColor: 'rgb(109, 179, 63)',
        color: 'rgb(38, 103, 20)',
      },
      {
        name: 'Kotlin',
        backgroundColor: 'rgb(178, 37, 234)',
        color: 'rgb(74, 11, 135)',
      },
      {
        name: 'Laravel',
        backgroundColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        backgroundColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        backgroundColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Collaborated closely with cross-functional teams, including designers, product managers, and stakeholders to ensure seamless integration and implementation of new features.',
      'Developed a flexible and configurable automation process to streamline business operations.',
      'Developed and maintaining robust and scalable server-side applications.',
      'Contributed to the development of technical standards, best practices, and design patterns.',
      'Resolved technical issues in a timely and efficient manner.',
      'Conducted thorough unit testing on all new features and enhancements.',
      'Responsible for performing code reviews.',
      'Deliver delightful UX and performant front-end software.',
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
        backgroundColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        backgroundColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        backgroundColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'React',
        backgroundColor: 'rgb(97, 219, 251)',
        color: 'rgb(30, 95, 145)',
      },
      {
        name: 'Javascript',
        backgroundColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Refactored legacy code to adhere to modern design patterns, ensuring maintainability and longevity of software systems.',
      'Optimized database structure to improve performance and scalability, reducing latency and downtime.',
      'Integrated Elasticsearch for advanced network monitoring, resulting in improved load times and real-time data visualization.',
      "Conceptualized and designed innovative features to enhance the company's products, providing a competitive advantage and improved user experience.",
      'Mentored and provided guidance to junior developers on best practices, coding standards, and software development methodologies.',
      'Stayed current with emerging technologies and industry trends to continuously improve software systems and capabilities.',
    ],
  },
]
