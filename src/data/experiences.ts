interface Organization {
  name: string
  logo: string
  url: string
}

export interface Experience {
  organization: Organization
  role: string
  url?: string
  date: string
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
    accomplishments: [
      'Mainly working in Kotlin (Spring) for Back-end and PHP (Laravel) for Legacy, and Javascript (Vue) for Front-end.',
      'Built configurable loan automation process to improve business operations.',
      'Perform unit tests for every new feature and enhancement.',
      'Move storage into proper and more secure.',
      'Help establish technical standards, best practices, and design patterns.',
      'Responsible for performing code reviews.',
      'Deliver delightful UX and performant front-end software.',
      'Followed agile methodology for application development process.',
      'Integrated with 3rd party services for digital signature, generating documents, and payment system.',
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
    accomplishments: [
      'Maintain and update old codebases to following design pattern.',
      'Analyze and restructure the database to enhance performance.',
      'Implemented elastic search for network monitoring to increase load time and rendered data visually in real time.',
      'Identify and design new features for the company’s products.',
    ],
  },
]
