'use client';

import { useState } from 'react';

interface PdfThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
}

export default function PdfThumbnail({ src, alt, className = '', fallbackEmoji = '📖' }: PdfThumbnailProps) {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className={`pdf-thumbnail-fallback ${className}`}>
        <span className="fallback-emoji">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`pdf-thumbnail ${className}`}
      onError={handleImageError}
    />
  );
}
