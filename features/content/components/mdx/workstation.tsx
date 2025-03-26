import Image from 'next/image';

import Anchor from './anchor';

interface WorkstationProps {
  items: {
    name: string;
    image: string;
    url: string;
    description?: string;
  }[];
}

const Workstation = ({ items }: WorkstationProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-3.5">
      {items.map((item, index) => (
        <Anchor
          key={`${item.name}-${index}`}
          className="group/workstation text-foreground hover:text-foreground focus:text-foreground flex min-h-24 flex-row items-center gap-1.5 overflow-hidden rounded-xl border border-dashed py-1.5 pr-1.5 pl-0.5 transition"
          href={item.url}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={320}
            height={320}
            className="shadow-primary/30 my-0 max-w-[4.5rem] scale-95 p-2 drop-shadow-[0_1px_3px_var(--tw-shadow-color)] transition select-none group-hover/workstation:scale-100 md:max-w-[5rem] lg:max-w-[5.5rem]"
          />
          <div className="flex w-full flex-col gap-0.5 py-0.5">
            <p className="text-foreground m-0 text-xs font-medium transition group-hover/workstation:underline">
              {item.name}
            </p>
            {item.description && (
              <span className="text-muted-foreground text-xs font-normal">
                {item.description}
              </span>
            )}
          </div>
        </Anchor>
      ))}
    </div>
  );
};

export default Workstation;
