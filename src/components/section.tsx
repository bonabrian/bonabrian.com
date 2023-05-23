interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <>
      <div className="flex flex-col">
        <span className="text-sm md:text-lg font-bold text-primary-500">
          {title}
        </span>
        {subtitle && (
          <h2 className="text-lg sm:text-xl md:text-2xl">{subtitle}</h2>
        )}
      </div>
      {children}
    </>
  )
}

export default Section
