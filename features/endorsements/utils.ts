import type { User } from '@/types/user';

export const formatEndorserNames = (
  endorsers: User[],
  maxVisible: number,
): string => {
  const count = endorsers.length;

  if (count === 0) return '';
  if (count === 1) return `Endorsed by ${endorsers[0].name}`;

  if (count <= maxVisible) {
    return `Endorsed by ${endorsers
      .slice(0, -1)
      .map((e) => e.name)
      .join(', ')}, and ${endorsers[count - 1].name}`;
  }

  return `Endorsed by ${endorsers
    .slice(0, maxVisible)
    .map((e) => e.name)
    .join(', ')}, and ${count - maxVisible} others`;
};
