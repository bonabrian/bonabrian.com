export type Experience = {
  organization: string
  role: string
  link?: string
  date: string
  content: Array<string>
}

export const experiences: Array<Experience> = [
  {
    organization: 'Investree',
    role: 'Full Stack Engineer',
    link: 'https://investree.id',
    date: 'November 2022 - Present',
    content: [
      'Followed Agile methodology for application development process.',
      'Mainly working in Kotlin (Spring) for Back-end and PHP (Laravel) for Legacy and Javascript (Vue) for Frontend.',
      'Work with Product Managers, QA, and other developer team members to plan new features or tech enhancements.',
      'Built configurable automation process to improve business operations using RabbitMQ that eliminates 132 clicks per loan process, eliminating 49 manual data input.',
      'Perform unit tests for every new feature and enhancement. Coverage must be more than 80% both frontend and backend.',
      'Centralized structured logging to provide monitoring, auditability, business metrics and service metrics (Elastic Search, New Relic).',
      'Continuous integration and delivery with Jenkins and Git.',
      'Move storage into proper and more secure (Alibaba).',
      'Help establish technical standards and best practices.',
      'Responsible for performing code reviews.',
      'Used Vue.js to provide usable components in Frontend development.',
      'Integrated with 3rd party services for digital signature, generating documents, and payment system.',
    ],
  },
  {
    organization: 'Varnion',
    role: 'Full Stack Engineer',
    link: 'https://www.varnion.com',
    date: 'June 2018 - August 2020',
    content: [
      'Modifying existing software to correct errors, upgrade interfaces, improve performance and write clean code.',
      'Analyze and restructure the database to normalized data.',
      'Improved a Telegram bot using PHP (Slim) for network monitoring.',
      'Implemented elastic search for network monitoring that increases 30% load time and rendered data visually in real time and using Redis for caching.',
      'Created a company’s profile and careers page using Javascript (Vue and React) for Frontend and PHP (Laravel) for CMS.',
      'Identify and design new features for the company’s products.',
      'Coded an internal application for Human Resources, General Affair to manage data using PHP (Laravel).',
    ],
  },
]
