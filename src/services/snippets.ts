import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'

import { pick } from '@/utils'

export const getAllSnippets = (
  fields: (keyof Snippet)[] = [],
): Array<Snippet> => {
  const filteredSnippets = allSnippets
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((it: Snippet) => it.title?.length > 0 && it.slug?.length > 0)

  return fields && fields.length
    ? filteredSnippets.map((it: Snippet) => pick(it, fields))
    : filteredSnippets
}
