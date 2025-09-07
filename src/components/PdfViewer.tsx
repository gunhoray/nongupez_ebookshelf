'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정 - Next.js public 폴더에서 worker 로드
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// PDF.js 설정

interface PdfViewerProps {
  src: string;
  title: string;
  author: string;
}

export default function PdfViewer({ src, title, author }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentZoom, setCurrentZoom] = useState(75);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  // PDF 전체 로딩
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // PDF 로드 옵션 최적화
        const loadingTask = pdfjsLib.getDocument({
          url: src,
          disableFontFace: true,
          disableRange: false,
          disableStream: false,
          disableAutoFetch: false,
          maxImageSize: 10 * 1024 * 1024, // 10MB로 증가
          isEvalSupported: false,
          useSystemFonts: true,
          stopAtErrors: false,
          rangeChunkSize: 65536
        });


        const pdf = await loadingTask.promise;
        setPdfDocument(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error('PDF 로드 실패:', err);
        setError('PDF 파일을 로드할 수 없습니다.');
        setLoading(false);
      }
    };

    if (src) {
      loadPdf();
    }
  }, [src]);

  // 페이지 렌더링
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocument || !canvasRef.current) return;

      try {
        // 이전 렌더링 작업이 있다면 취소
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const page = await pdfDocument.getPage(currentPage);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) {
          return;
        }

        const scale = currentZoom / 100;
        const viewport = page.getViewport({ scale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          intent: 'display',
          enableWebGL: false,
          renderInteractiveForms: false
        };
        
        // 렌더링 작업을 ref에 저장
        renderTaskRef.current = page.render(renderContext);
        
        try {
          await renderTaskRef.current.promise;
          renderTaskRef.current = null;
        } catch (renderErr: any) {
          // 렌더링 취소는 정상적인 동작
          if (renderErr.name === 'RenderingCancelledException') {
            console.log('렌더링이 취소되었습니다.');
            renderTaskRef.current = null;
            return;
          }
          throw renderErr;
        }
      } catch (err: any) {
        // 렌더링 취소는 정상적인 동작이므로 에러로 처리하지 않음
        if (err.name === 'RenderingCancelledException') {
          console.log('렌더링이 취소되었습니다.');
          renderTaskRef.current = null;
          return;
        }
        
        console.error('페이지 렌더링 실패:', err);
        setError('페이지를 렌더링할 수 없습니다.');
        renderTaskRef.current = null;
      }
    };

    renderPage();
  }, [pdfDocument, currentPage, currentZoom]);

  // 컴포넌트 언마운트 시 렌더링 작업 정리
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (err) {
          // 취소 중 오류는 무시
          console.log('렌더링 작업 취소 중 오류:', err);
        }
        renderTaskRef.current = null;
      }
    };
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToSection = (sectionNum: number) => {
    if (sectionNum >= 1 && sectionNum <= totalPages) {
      setCurrentPage(sectionNum);
    }
  };

  const zoomIn = () => {
    if (currentZoom < 200) {
      setCurrentZoom(currentZoom + 25);
    }
  };

  const zoomOut = () => {
    if (currentZoom > 50) {
      setCurrentZoom(currentZoom - 25);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'Escape') {
        toggleSidebar();
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (currentPage !== 1) {
          setCurrentPage(1);
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (currentPage !== totalPages) {
          setCurrentPage(totalPages);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">PDF를 로드하는 중...</p>
          <p className="text-sm text-gray-500">전체 교재를 완벽하게 로딩합니다</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="text-orange-500 hover:text-orange-600">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

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
            {author && <div className="book-author-header">{author}</div>}
          </div>
        </div>
        <div className="header-right">
          <button className="download-btn" onClick={() => window.open(src, '_blank')}>
            📄 PDF 다운로드
          </button>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="main-container">
        {/* 사이드바 (목차) */}
        <div className={`sidebar ${!sidebarVisible ? 'hidden' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">📖 목차</div>
          </div>
          <div className="toc-list">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`toc-item ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => goToSection(index + 1)}
              >
                {index + 1}페이지
              </div>
            ))}
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="content-area">
          <div className="content-header">
            <div className="page-info">
              <span>{currentPage}페이지</span>
            </div>
            <div className="zoom-controls">
              <button className="zoom-btn" onClick={zoomOut}>-</button>
              <span className="zoom-level">{currentZoom}%</span>
              <button className="zoom-btn" onClick={zoomIn}>+</button>
            </div>
          </div>

          <div className="pdf-viewer" id="pdfViewer">
            <div className="pdf-container">
              <canvas 
                ref={canvasRef}
                className="pdf-canvas"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>

          <div className="page-navigation">
            <button 
              className="nav-btn" 
              onClick={prevPage} 
              disabled={currentPage === 1}
            >
              ← 이전
            </button>
            <div className="page-counter">
              {currentPage} / {totalPages} 페이지
            </div>
            <button 
              className="nav-btn" 
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              다음 →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
