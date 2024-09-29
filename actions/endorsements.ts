'use server';

import db from '@/lib/db';
import type { Skill, SkillCategory } from '@/types/skill';
import type { User } from '@/types/user';

export const countAllEndorsements = async (): Promise<number> => {
  return await db.endorsement.count();
};

export const getEndorsements = async () => {
  const data = await db.skillCategory.findMany({
    include: {
      skills_in_category: {
        include: {
          endorsements: {
            include: { user: true },
          },
        },
      },
    },
  });

  return data.map<SkillCategory>(({ name, skills_in_category }) => ({
    name,
    skills: skills_in_category.map<Skill>(({ id, name, endorsements }) => ({
      id: id.toString(),
      name,
      users: endorsements
        .filter((endorsement) => endorsement.userId)
        .map<User>(({ user }) => ({
          id: user?.id!,
          name: user?.name!,
          email: user?.email!,
          image: user?.image!,
        })),
    })),
  }));
};

export const isEndorsed = async ({
  skillId,
  userId,
}: {
  skillId: number;
  userId: string;
}): Promise<boolean> => {
  const endorsementCount = await db.endorsement.count({
    where: {
      skill_id: skillId,
      userId,
    },
  });

  return endorsementCount > 0;
};

export const createEndorsement = async ({
  skillId,
  userId,
}: {
  skillId: number;
  userId: string;
}) => {
  await db.endorsement.create({
    data: {
      skill_id: skillId,
      userId,
    },
  });
};
