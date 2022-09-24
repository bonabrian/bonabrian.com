interface Organization {
  name: string
  logo: string
  url: string
}

interface Stack {
  name: string
  bgColor: string
  color: string
}

export interface Experience {
  organization: Organization
  role: string
  url?: string
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
        bgColor: 'rgb(109, 179, 63)',
        color: 'rgb(38, 103, 20)',
      },
      {
        name: 'Kotlin',
        bgColor: 'rgb(178, 37, 234)',
        color: 'rgb(74, 11, 135)',
      },
      {
        name: 'Laravel',
        bgColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        bgColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        bgColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'Javascript',
        bgColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Built configurable automation process to improve business operations.',
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
    stacks: [
      {
        name: 'Laravel',
        bgColor: 'rgb(240, 83, 64)',
        color: 'rgb(115, 12, 34)',
      },
      {
        name: 'PHP',
        bgColor: 'rgb(137, 147, 190)',
        color: 'rgb(35, 37, 49)',
      },
      {
        name: 'Vue',
        bgColor: 'rgb(65, 184, 130)',
        color: 'rgb(14, 78, 69)',
      },
      {
        name: 'React',
        bgColor: 'rgb(97, 219, 251)',
        color: 'rgb(30, 95, 145)',
      },
      {
        name: 'Javascript',
        bgColor: 'rgb(240, 219, 79)',
        color: 'rgb(86, 73, 15)',
      },
    ],
    accomplishments: [
      'Maintain and update old codebases to following design pattern.',
      'Analyze and restructure the database to enhance performance.',
      'Implemented elastic search for network monitoring to increase load time and rendered data visually in real time.',
      'Identify and design new features for the company’s products.',
    ],
  },
]
