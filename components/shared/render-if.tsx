const RenderIf = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: React.ReactNode;
}) => {
  return <>{isTrue ? children : null}</>;
};

export default RenderIf;
