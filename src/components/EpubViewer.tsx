'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// react-reader를 동적으로 import (SSR 회피)
const ReactReader = dynamic(() => import('react-reader'), {
  ssr: false,
  loading: () => <div className="loading-spinner">로딩 중...</div>
});

interface EpubViewerProps {
  src: string;
  title: string;
  author: string;
}

export default function EpubViewer({ src, title, author }: EpubViewerProps) {
  const [location, setLocation] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLocationChange = (epubcifi: string) => {
    setLocation(epubcifi);
    // localStorage에 독서 위치 저장
    localStorage.setItem(`reader:location:${title}`, epubcifi);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      {/* 헤더 */}
      <div className="header">
        <div className="header-left">
          <Link href="/" className="back-button">
            ← 메인으로
          </Link>
          <div className="book-info-header">
            <div className="book-title-header">{title}</div>
            <div className="book-author-header">{author}</div>
          </div>
        </div>
        <div className="header-right">
          <button className="download-btn">
            📖 EPUB 다운로드
          </button>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="main-container">
        {/* 사이드바 (목차) */}
        <div className={`sidebar ${!sidebarVisible ? 'hidden' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">📖 EPUB 뷰어</div>
            <div style={{fontSize: '0.8rem', color: '#666'}}>{title}</div>
          </div>
          <div className="toc-list">
            <div className="toc-item">
              EPUB 뷰어가 로드되었습니다.
            </div>
            <div className="toc-item">
              목차는 EPUB 파일에서 자동으로 생성됩니다.
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="content-area">
          <div className="content-header">
            <div className="page-info">
              <span>EPUB 뷰어</span>
            </div>
            <div className="zoom-controls">
              <span className="zoom-level">EPUB</span>
            </div>
          </div>

          <div className="pdf-viewer" style={{padding: '1rem'}}>
            <div className="pdf-container">
              <ReactReader
                url={src}
                location={location}
                locationChanged={handleLocationChange}
                styles={{
                  container: {
                    width: '100%',
                    height: '100%',
                    maxWidth: 'none'
                  }
                }}
              />
            </div>
          </div>

          <div className="page-navigation">
            <div className="page-counter">EPUB 뷰어</div>
          </div>
        </div>
      </div>
    </>
  );
}
