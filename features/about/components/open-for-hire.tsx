import { Button } from '@/components/ui/button';

const OpenForHire = ({ isOpenForHire }: { isOpenForHire: boolean }) => {
  if (isOpenForHire) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="pointer-events-none gap-3 border-none px-3 shadow-none"
      >
        <div className="relative flex size-2">
          <span className="absolute -top-1 -left-1 inline-flex size-4 animate-ping rounded-full bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)] opacity-75 transition-colors will-change-transform" />
          <span className="bg-primary relative inline-flex size-2 rounded-full" />
        </div>
        Open for hire
      </Button>
    );
  }

  return null;
};

export default OpenForHire;
