'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PdfViewer from '@/components/PdfViewer';
import EpubViewer from '@/components/EpubViewer';

export default function ReaderPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const src = searchParams.get('src');
  const [bookInfo, setBookInfo] = useState<{title: string, author: string} | null>(null);

  useEffect(() => {
    if (src) {
      // URL에서 책 정보 추출
      const fileName = src.split('/').pop()?.replace('.pdf', '').replace('.epub', '');
      if (fileName) {
        setBookInfo({
          title: decodeURIComponent(fileName),
          author: '농촌진흥청' // 기본값, 실제로는 메타데이터에서 가져와야 함
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
          <a href="/" className="text-orange-500 hover:text-orange-600">
            메인으로 돌아가기
          </a>
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
          author={bookInfo.author} 
        />
      )}
      {type === 'epub' && bookInfo && (
        <EpubViewer 
          src={src} 
          title={bookInfo.title} 
          author={bookInfo.author} 
        />
      )}
    </div>
  );
}
