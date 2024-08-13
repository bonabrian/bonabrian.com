import { useCallback, useEffect, useState } from 'react';

const useScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const onScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return isScrolled;
};

export default useScroll;
