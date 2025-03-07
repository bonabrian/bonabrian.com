'use server';

import type { Prisma } from '@prisma/client';

import db from '@/lib/db';

import type { SkillCategory } from '../types';

export const countAllEndorsements = async (): Promise<number> => {
  return await db.endorsement.count();
};

export const getEndorsements = async (): Promise<SkillCategory[]> => {
  const data = await db.skillCategory.findMany({
    include: {
      skills_in_category: {
        include: {
          endorsements: {
            include: { user: true },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      },
    },
  });

  return data.map(({ name, skills_in_category }) => ({
    name,
    skills: skills_in_category.map(({ id, name: skillName, endorsements }) => ({
      id: id.toString(),
      name: skillName,
      users: endorsements
        .filter((endorsement) => endorsement.userId)
        .map(({ user: endorser }) => ({
          id: endorser?.id!,
          name: endorser?.name!,
          email: endorser?.email!,
          image: endorser?.image!,
        })),
    })),
  }));
};

export const countEndorsement = async (
  where: Prisma.EndorsementWhereInput,
): Promise<number> => {
  return await db.endorsement.count({
    where,
  });
};

export const createEndorsement = async ({
  userId,
  skillId,
}: {
  userId: string;
  skillId: number;
}): Promise<void> => {
  await db.endorsement.create({
    data: {
      userId,
      skill_id: skillId,
    },
  });
};
