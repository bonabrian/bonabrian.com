import Link from './link'

interface CallToActionProps {
  children: React.ReactNode
  href: string
}

const CallToAction = ({ children, href }: CallToActionProps) => {
  return (
    <Link
      href={href}
      className="relative px-8 md:px-10 text-xs sm:text-sm overflow-hidden inline-flex uppercase font-semibold -tracking-tighter h-12 md:h-14 justify-center items-center outline-none transition duration-300 ease-in-out bg-transparent hover:bg-primary-500 hover:text-white border-2 border-solid border-gray-900 dark:border-slate-100 rounded-full shadow-[5px_5px_rgb(0_0_0_/_20%)] dark:shadow-[5px_5px_rgb(163_163_163_/_20%)]"
    >
      {children}
    </Link>
  )
}

export default CallToAction
