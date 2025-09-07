'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import PdfViewer from '@/components/PdfViewer';
import EpubViewer from '@/components/EpubViewer';
import { tocData, TocItem } from '@/lib/tocData';
import { formatFileNameToTitle, getSubtitleForFile } from '@/lib/utils';

function ReaderContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const src = searchParams.get('src');
  const [bookInfo, setBookInfo] = useState<{title: string, subtitle: string, tocItems: TocItem[]} | null>(null);

  useEffect(() => {
    if (src) {
      // URL에서 책 정보 추출
      const fileName = src.split('/').pop();
      if (fileName) {
        const decodedFileName = decodeURIComponent(fileName);
        const tocItems = tocData[decodedFileName] || [];
        
        setBookInfo({
          title: formatFileNameToTitle(decodedFileName),
          subtitle: getSubtitleForFile(decodedFileName),
          tocItems: tocItems
        });
      }
    }
  }, [src]);

  if (!type || !src) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">잘못된 접근</h1>
          <p className="text-gray-600 mb-4">올바른 책 정보가 필요합니다.</p>
          <Link href="/" className="text-orange-500 hover:text-orange-600">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {type === 'pdf' && bookInfo && (
        <PdfViewer 
          src={src} 
          title={bookInfo.title} 
          subtitle={bookInfo.subtitle}
          tocItems={bookInfo.tocItems}
        />
      )}
      {type === 'epub' && bookInfo && (
        <EpubViewer 
          src={src} 
          title={bookInfo.title} 
          subtitle={bookInfo.subtitle} 
        />
      )}
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner">로딩 중...</div>
      </div>
    </div>}>
      <ReaderContent />
    </Suspense>
  );
}
