import { useEffect, useLayoutEffect } from 'react'

import { isClient } from '@/lib/utils'

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect
