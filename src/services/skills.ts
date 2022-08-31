import prisma from '@/lib/prisma'
import type { Skill, SkillCategory, User } from '@/types'

export const getGroupedSkillsByCategory = async () => {
  try {
    const data = await prisma.skillCategory.findMany({
      include: {
        skills_in_category: {
          include: {
            endorsements: {
              include: { user: true },
            },
          },
        },
      },
    })

    return data.map<SkillCategory>((category) => ({
      name: category.name,
      skills: category.skills_in_category.map<Skill>((skill) => ({
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
    throw Error(
      // @ts-ignore
      err?.message || err?.stackTrace.toString() || 'Unexpected error',
    )
  }
}
