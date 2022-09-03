type RenderIfProps = {
  children: React.ReactNode
  isTrue: boolean
}

const RenderIf = ({ children, isTrue }: RenderIfProps) => {
  return <>{isTrue ? children : null}</>
}

export default RenderIf
