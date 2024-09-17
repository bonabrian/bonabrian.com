import { useState } from 'react';

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

const getMatch = (query: string): MediaQueryList => window.matchMedia(query);

const parseQueryString = (query: string): string =>
  query.replaceAll('@media only screen and', '').trim();

const useMediaQuery = (query: string, defaultState: boolean = false) => {
  const [state, setState] = useState(defaultState);
  const parseAndMatch = (q: string) => getMatch(parseQueryString(q));

  useIsomorphicLayoutEffect(() => {
    let mounted = true;
    const mql = parseAndMatch(query);

    const onChange = (): void => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange); // iOS 13 and below
    }

    setState(mql.matches);

    return () => {
      mounted = false;

      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange); // iOS 13 and below
      }
    };
  }, [query]);

  return state;
};

export default useMediaQuery;
