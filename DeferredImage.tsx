import React, { useEffect, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

type DeferredImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  /** Load immediately. Use this only for an image the user explicitly opened. */
  immediate?: boolean;
  /** Start only when the image itself reaches the viewport. */
  rootMargin?: string;
  /** Small delay lets text/layout paint before a visible heavy image starts. */
  delayMs?: number;
};

/**
 * Strong lazy loading: unlike loading="lazy", the real URL is not assigned to
 * the <img> at all until IntersectionObserver says the image is visible.
 */
export const DeferredImage: React.FC<DeferredImageProps> = ({
  src,
  immediate = false,
  rootMargin = '0px',
  delayMs = 120,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setShouldLoad(true);
      return;
    }

    setShouldLoad(false);
    const element = imgRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const startLoad = () => {
      const win = window as typeof window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (win.requestIdleCallback) {
        idleId = win.requestIdleCallback(() => setShouldLoad(true), { timeout: 350 });
      } else {
        timeoutId = window.setTimeout(() => setShouldLoad(true), delayMs);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          startLoad();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      const win = window as typeof window & { cancelIdleCallback?: (id: number) => void };
      if (idleId !== undefined && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
    };
  }, [src, immediate, rootMargin, delayMs]);

  return (
    <img
      ref={imgRef}
      {...props}
      src={shouldLoad ? src : TRANSPARENT_PIXEL}
      loading={immediate ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={immediate ? props.fetchPriority : 'low'}
    />
  );
};
