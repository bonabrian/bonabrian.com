import type { Endorsement } from '@prisma/client'

import prisma from '@/lib/prisma'
import type { Skill, SkillCategory, User } from '@/types'

interface EndorsementParams {
  skillId: number
  userId: string
}

export const getEndorsements = async () => {
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

    return data.map<SkillCategory>(({ name, skills_in_category }) => ({
      name: name,
      skills: skills_in_category.map<Skill>(({ id, name, endorsements }) => ({
        id: id.toString(),
        name,
        users: endorsements
          .filter((endorsement) => endorsement.userId)
          .map<User>(({ user }) => ({
            id: user?.id!,
            name: user?.name!,
            image: user?.image!,
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

export const isEndorsed = async ({
  skillId,
  userId,
}: EndorsementParams): Promise<Endorsement | null> => {
  const isEndorsed = await prisma.endorsement.findFirst({
    where: {
      skill_id: skillId,
      userId,
    },
  })

  return isEndorsed
}

export const createEndorsement = async ({
  skillId,
  userId,
}: EndorsementParams): Promise<void> => {
  await prisma.endorsement.create({
    data: {
      skill_id: skillId,
      userId,
    },
  })
}

export const countAllEndorsements = async (): Promise<number> => {
  return await prisma.endorsement.count()
}
