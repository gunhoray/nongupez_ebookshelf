'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    <Image
      src={src}
      alt={alt}
      className={`pdf-thumbnail ${className}`}
      onError={handleImageError}
      width={300}
      height={280}
      style={{ objectFit: 'cover' }}
    />
  );
}
