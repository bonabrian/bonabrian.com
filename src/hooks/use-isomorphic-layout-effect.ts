import { useEffect, useLayoutEffect } from 'react'

import { isClient } from '@/utils/env'

const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
