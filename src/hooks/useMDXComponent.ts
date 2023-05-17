import { useMDXComponent as useContentLayerMDXComponent } from 'next-contentlayer/hooks'

export const useMDXComponent = (code?: string) => {
  const Component = useContentLayerMDXComponent(
    code ?? 'var Component = () => { return null }; return Component',
  )

  return Component
}
