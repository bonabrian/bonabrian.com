import RenderIf from '@/components/shared/render-if';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const OpenForHire = ({ isOpenForHire }: { isOpenForHire: boolean }) => (
  <RenderIf isTrue={isOpenForHire}>
    <Button
      size="sm"
      variant="outline"
      className={cn('pointer-events-none gap-3 border-none px-3 shadow-none')}
    >
      <div className={cn('relative flex size-2')}>
        <span
          className={cn(
            'absolute -top-1 -left-1 inline-flex size-4 animate-ping rounded-full bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)] opacity-75 transition-colors will-change-transform',
          )}
        />
        <span
          className={cn('bg-primary relative inline-flex size-2 rounded-full')}
        />
      </div>
      Open for hire
    </Button>
  </RenderIf>
);

export default OpenForHire;
