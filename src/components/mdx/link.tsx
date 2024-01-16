import { Link as UILink } from '@/components/ui'
import cn from '@/utils/cn'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = ({ href, ...props }: LinkProps) => {
  return (
    <UILink
      href={href as string}
      className={cn(
        'bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(216,189,255)0)] text-foreground no-underline',
        'hover:text-foreground hover:no-underline',
        'dark:bg-[linear-gradient(rgb(0,0,0,0)75%,rgb(164,133,208)0)]',
      )}
      {...props}
    />
  )
}

export default Link
