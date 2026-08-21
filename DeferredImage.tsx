import React, { useEffect, useMemo, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

type DeferredImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string;
  /** Load immediately. Use for images visible as soon as the user opens a modal/lightbox. */
  immediate?: boolean;
  /** Start only when the image itself reaches the viewport. */
  rootMargin?: string;
  /** Small delay lets text/layout paint before a below-the-fold image starts. */
  delayMs?: number;
  /** Target CSS image width. Netlify serves an appropriately reduced file. */
  optimizeWidth?: number;
  /** Lossy output quality used by Netlify Image CDN. */
  optimizeQuality?: number;
  /** Responsive sizes hint. */
  sizes?: string;
};

const isLocalPortfolioImage = (src: string) =>
  src.startsWith('/portfolio-media/') || src.startsWith('portfolio-media/');

const normalizeLocalPath = (src: string) => (src.startsWith('/') ? src : `/${src}`);

const netlifyImageUrl = (src: string, width: number, quality: number) => {
  if (!isLocalPortfolioImage(src)) return src;
  const local = normalizeLocalPath(src);
  return `/.netlify/images?url=${encodeURIComponent(local)}&w=${width}&q=${quality}`;
};

/**
 * Deferred + optimized image loader.
 *
 * - The original files stay untouched in /public/portfolio-media.
 * - On Netlify, visible images are served through Netlify Image CDN at a much
 *   smaller width/format instead of downloading the full original file.
 * - Below-the-fold images still do not receive a real src/srcSet until visible.
 */
export const DeferredImage: React.FC<DeferredImageProps> = ({
  src,
  immediate = false,
  rootMargin = '0px',
  delayMs = 80,
  optimizeWidth = 1200,
  optimizeQuality = 80,
  sizes,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(immediate);

  const optimizedSrc = useMemo(
    () => netlifyImageUrl(src, optimizeWidth, optimizeQuality),
    [src, optimizeWidth, optimizeQuality],
  );

  const responsiveSrcSet = useMemo(() => {
    if (!isLocalPortfolioImage(src)) return undefined;
    const widths = Array.from(new Set([
      Math.min(480, optimizeWidth),
      Math.min(800, optimizeWidth),
      optimizeWidth,
    ])).filter((w) => w > 0).sort((a, b) => a - b);
    return widths
      .map((w) => `${netlifyImageUrl(src, w, optimizeQuality)} ${w}w`)
      .join(', ');
  }, [src, optimizeWidth, optimizeQuality]);

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
    const startLoad = () => {
      timeoutId = window.setTimeout(() => setShouldLoad(true), delayMs);
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
    };
  }, [src, immediate, rootMargin, delayMs]);

  return (
    <img
      ref={imgRef}
      {...props}
      src={shouldLoad ? optimizedSrc : TRANSPARENT_PIXEL}
      srcSet={shouldLoad ? responsiveSrcSet : undefined}
      sizes={shouldLoad ? sizes : undefined}
      loading={immediate ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={immediate ? props.fetchPriority : 'low'}
    />
  );
};
