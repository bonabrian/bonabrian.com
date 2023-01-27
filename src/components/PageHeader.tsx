interface PageHeaderProps {
  title: string
  description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="pb-10 sm:pb-15 md:pb-20 flex flex-col">
      <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-9 sm:leading-10 md:leading-14 mb-4 sm:mb-6 lg:mb-8 tracking-tight">
        {title}
      </h1>
      {description && <p className="text-base">{description}</p>}
    </div>
  )
}

export default PageHeader
