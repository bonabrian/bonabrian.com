type RenderIfProps = {
  children: React.ReactNode
  isTrue: boolean
}

const RenderIf = ({ children, isTrue }: RenderIfProps) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{isTrue ? children : null}</>
}

export default RenderIf
