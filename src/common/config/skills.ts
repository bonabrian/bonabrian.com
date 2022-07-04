export enum SkillType {
  Language = 'Language',
  Technology = 'Technology',
  Platform = 'Platform',
}

export type Skill = {
  name: string
  icon: string
  type: string
}

export const skills: Array<Skill> = [
  {
    name: 'Kotlin',
    icon: '/images/skills/kotlin.svg',
    type: SkillType.Language,
  },
  {
    name: 'Java',
    icon: '/images/skills/java.svg',
    type: SkillType.Language,
  },
  {
    name: 'PHP',
    icon: '/images/skills/php.svg',
    type: SkillType.Language,
  },
  {
    name: 'Javascript',
    icon: '/images/skills/javascript.svg',
    type: SkillType.Language,
  },
  {
    name: 'Typescript',
    icon: '/images/skills/typescript.svg',
    type: SkillType.Language,
  },
  // {
  //   name: 'Golang',
  //   icon: '/images/skills/go.svg',
  //   type: SkillType.Language,
  // },
  {
    name: 'Spring',
    icon: '/images/skills/spring.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Laravel',
    icon: '/images/skills/laravel.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Vue.js',
    icon: '/images/skills/vue.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Vite',
    icon: '/images/skills/vitejs.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Nuxt.js',
    icon: '/images/skills/nuxt.svg',
    type: SkillType.Technology,
  },
  {
    name: 'React.js',
    icon: '/images/skills/react.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Next.js',
    icon: '/images/skills/nextjs.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Node.js',
    icon: '/images/skills/nodejs.svg',
    type: SkillType.Technology,
  },
  {
    name: 'MySQL',
    icon: '/images/skills/mysql.svg',
    type: SkillType.Technology,
  },
  // {
  //   name: 'MongoDB',
  //   icon: '/images/skills/mongodb.svg',
  //   type: SkillType.Technology,
  // },
  {
    name: 'Redis',
    icon: '/images/skills/redis.svg',
    type: SkillType.Technology,
  },
  {
    name: 'RabbitMQ',
    icon: '/images/skills/rabbitmq.svg',
    type: SkillType.Technology,
  },
  // {
  //   name: 'Elastic Search',
  //   icon: '',
  //   type: SkillType.Technology,
  // },
  {
    name: 'Docker',
    icon: '/images/skills/docker.webp',
    type: SkillType.Technology,
  },
  {
    name: 'Git',
    icon: '/images/skills/git.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Github',
    icon: '/images/skills/github.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Postman',
    icon: '/images/skills/postman.svg',
    type: SkillType.Technology,
  },
  {
    name: 'Vercel',
    icon: '/images/skills/vercel.svg',
    type: SkillType.Platform,
  },
]
