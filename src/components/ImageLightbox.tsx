import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X } from 'lucide-react';

export const ImageLightbox: React.FC = () => {
  const { lightboxImage, closeLightbox } = usePortfolio();

  if (!lightboxImage) return null;

  return (
    <div
      id="image-lightbox-overlay"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox();
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-white z-10">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-white">
            {lightboxImage.title}
          </h3>
          {lightboxImage.caption && (
            <p className="text-xs text-[#A0A09A] max-w-xl truncate">
              {lightboxImage.caption}
            </p>
          )}
        </div>

        <button
          onClick={closeLightbox}
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          title="닫기"
          aria-label="닫기"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Large Image Container */}
      <div
        className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden cursor-zoom-out"
        onClick={closeLightbox}
      >
        <img
          src={lightboxImage.url}
          alt={lightboxImage.title}
          className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-default"
          onClick={(e) => e.stopPropagation()}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="text-center text-xs font-mono text-[#888880] pb-2">
        배경화면 또는 상단 닫기(✕) 버튼을 클릭하여 닫을 수 있습니다.
      </div>
    </div>
  );
};
