import type { Skill, SkillCategory } from '@/types/skill'
import type { User } from '@/types/user'

import prisma from './prisma'

export const getSkillsByCategory = async () => {
  try {
    const skillsByCategory = await prisma.skillCategory.findMany({
      include: {
        skillsInCategory: {
          include: {
            endorsements: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    return skillsByCategory.map<SkillCategory>((category) => ({
      name: category.name,
      skills: category.skillsInCategory.map<Skill>((skill) => ({
        id: skill.id.toString(),
        name: skill.name,
        users: skill.endorsements
          .filter((endorsement) => endorsement.userId)
          .map<User>((endorsement) => ({
            id: endorsement.user!.id,
            name: endorsement.user!.name!,
            image: endorsement.user!.image!,
          })),
      })),
    }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error getting skills: ', err)
    return []
  }
}
