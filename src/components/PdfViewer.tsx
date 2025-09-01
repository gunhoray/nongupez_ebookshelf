'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface PdfViewerProps {
  src: string;
  title: string;
  author: string;
}

interface PageContent {
  title: string;
  content: string;
}

export default function PdfViewer({ src, title, author }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentZoom, setCurrentZoom] = useState(100);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = 12;
  const singleViewRef = useRef<HTMLDivElement>(null);

  // 페이지 컨텐츠 데이터
  const pageContents: Record<number, PageContent> = {
    1: {
      title: '제1장 트랙터 기본 조작법',
      content: `
        <h1>제1장 트랙터 기본 조작법</h1>
        <div class="landscape-content">
          <div class="content-left">
            <h2>1.1 시동 전 점검사항</h2>
            <div class="step-box">
              <span class="step-number">1</span>
              <strong>연료 확인:</strong> 연료 게이지를 확인하고 충분한 연료가 있는지 점검합니다.
            </div>
            <div class="step-box">
              <span class="step-number">2</span>
              <strong>오일 점검:</strong> 엔진 오일 레벨을 확인하고 필요시 보충합니다.
            </div>
            <div class="step-box">
              <span class="step-number">3</span>
              <strong>냉각수 확인:</strong> 라디에이터 냉각수 수위를 점검합니다.
            </div>
            <div class="step-box">
              <span class="step-number">4</span>
              <strong>타이어 공기압:</strong> 전후 타이어의 공기압을 적정 수준으로 유지합니다.
            </div>
            <h2>1.2 안전 수칙</h2>
            <p><strong>⚠️ 중요:</strong> 트랙터 조작 전 반드시 안전벨트를 착용하고, 주변에 사람이 없는지 확인하세요.</p>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
              <li>시동 전 변속레버가 중립에 있는지 확인</li>
              <li>PTO(동력전달장치) 스위치가 OFF인지 확인</li>
              <li>주차 브레이크가 체결되어 있는지 확인</li>
              <li>운전석 주변 정리정돈 확인</li>
            </ul>
          </div>
          <div class="content-right">
            <h2>트랙터 조작 패널</h2>
            <div class="machinery-diagram">
              🚜<br>
              <div style="font-size: 1rem; margin-top: 1rem; color: #333;">
                조작 패널 다이어그램<br>
                <small>(실제 구현 시 상세 이미지)</small>
              </div>
            </div>
            <h3>주요 조작 장치</h3>
            <div style="background: white; border: 1px solid #dee2e6; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
              <p><strong>A.</strong> 시동 스위치</p>
              <p><strong>B.</strong> 가속 페달</p>
              <p><strong>C.</strong> 브레이크 페달</p>
              <p><strong>D.</strong> 클러치 페달</p>
              <p><strong>E.</strong> 변속 레버</p>
              <p><strong>F.</strong> PTO 스위치</p>
              <p><strong>G.</strong> 유압 조작 레버</p>
            </div>
            <div class="step-box" style="background: #e8f5e8; border-left-color: #28a745;">
              <strong>💡 팁:</strong> 처음 트랙터를 조작할 때는 반드시 숙련된 조작자와 함께 연습하세요.
            </div>
          </div>
        </div>
      `
    },
    2: {
      title: '제2장 콤바인 운용 가이드',
      content: `
        <h1>제2장 콤바인 운용 가이드</h1>
        <div class="landscape-content">
          <div class="content-left">
            <h2>2.1 수확 전 준비사항</h2>
            <div class="step-box">
              <span class="step-number">1</span>
              <strong>곡물탱크 점검:</strong> 곡물탱크가 깨끗하고 이물질이 없는지 확인합니다.
            </div>
            <div class="step-box">
              <span class="step-number">2</span>
              <strong>절단날 점검:</strong> 절단날의 상태와 간격을 점검합니다.
            </div>
            <h2>2.2 운용 방법</h2>
            <p>콤바인은 적정 속도를 유지하며 운용해야 합니다. 속도가 너무 빠르면 탈곡이 불완전해집니다.</p>
          </div>
          <div class="content-right">
            <h2>콤바인 구조</h2>
            <div class="machinery-diagram">🌾<br><div style="font-size: 1rem; margin-top: 1rem; color: #333;">콤바인 구조도</div></div>
            <div class="step-box" style="background: #fff3e6; border-left-color: #ff8c42;">
              <strong>⚠️ 주의:</strong> 작업 중에는 엔진을 정지하지 마세요.
            </div>
          </div>
        </div>
      `
    },
    3: {
      title: '제3장 이앙기 사용법',
      content: `
        <h1>제3장 이앙기 사용법</h1>
        <div class="landscape-content">
          <div class="content-left">
            <h2>3.1 모판 준비</h2>
            <div class="step-box">
              <span class="step-number">1</span>
              <strong>모 상태 확인:</strong> 모의 크기와 뿌리 발달 상태를 점검합니다.
            </div>
            <div class="step-box">
              <span class="step-number">2</span>
              <strong>모판 적재:</strong> 모판을 이앙기에 올바르게 적재합니다.
            </div>
          </div>
          <div class="content-right">
            <h2>이앙 패턴</h2>
            <div class="machinery-diagram">🌱<br><div style="font-size: 1rem; margin-top: 1rem; color: #333;">이앙기 구조도</div></div>
            <p>정확한 간격으로 이앙하여 최적의 수확량을 얻을 수 있습니다.</p>
          </div>
        </div>
      `
    }
  };

  const chapterTitles = [
    '1장. 트랙터 기본 조작법',
    '2장. 콤바인 운용 가이드', 
    '3장. 이앙기 사용법',
    '4장. 경운기 정비 방법',
    '5장. 방제기 안전 수칙',
    '6장. 건조기 운영 매뉴얼',
    '7장. 파종기 설정 가이드',
    '8장. 수확기 점검 사항',
    '9장. 운반기 사용 요령',
    '10장. 정비 도구 활용법',
    '11장. 안전 관리 지침',
    '12장. 고장 진단 및 수리'
  ];

  const animatePageTransition = (direction: 'next' | 'prev', newPageNum: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const currentPageEl = singleViewRef.current;
    if (!currentPageEl) return;
    
    const isNext = direction === 'next';
    
    // 현재 페이지 슬라이드 아웃
    currentPageEl.classList.add(isNext ? 'slide-out-left' : 'slide-out-right');
    
    setTimeout(() => {
      // 컨텐츠 업데이트
      setCurrentPage(newPageNum);
      
      // 새 페이지를 반대편에서 준비
      currentPageEl.classList.remove('slide-out-left', 'slide-out-right');
      currentPageEl.classList.add(isNext ? 'slide-in-right' : 'slide-in-left');
      
      setTimeout(() => {
        // 새 페이지를 중앙으로 슬라이드 인
        currentPageEl.classList.remove('slide-in-left', 'slide-in-right');
        currentPageEl.classList.add('slide-in-center');
        
        setTimeout(() => {
          currentPageEl.classList.remove('slide-in-center');
          setIsAnimating(false);
        }, 800);
      }, 50);
    }, 400);
  };

  const nextPage = () => {
    if (currentPage < totalPages && !isAnimating) {
      const newPage = currentPage + 1;
      animatePageTransition('next', newPage);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && !isAnimating) {
      const newPage = currentPage - 1;
      animatePageTransition('prev', newPage);
    }
  };

  const goToSection = (sectionNum: number) => {
    if (sectionNum === currentPage || isAnimating) return;
    
    const direction = sectionNum > currentPage ? 'next' : 'prev';
    animatePageTransition(direction, sectionNum);
  };

  const zoomIn = () => {
    if (currentZoom < 150) {
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

  const getPageContent = (pageNum: number) => {
    const pageData = pageContents[pageNum];
    if (pageData) {
      return pageData.content;
    }
    
    // 기본 템플릿으로 폴백
    return `
      <h1>제${pageNum}장 농기계 매뉴얼</h1>
      <div class="landscape-content">
        <div class="content-left">
          <h2>${pageNum}.1 개요</h2>
          <p>이 장에서는 농기계 사용법에 대해 설명합니다.</p>
          <div class="step-box">
            <span class="step-number">1</span>
            기본 점검사항을 확인합니다.
          </div>
        </div>
        <div class="content-right">
          <div class="machinery-diagram">🚜<br><div style="font-size: 1rem; margin-top: 1rem; color: #333;">장비 다이어그램</div></div>
          <p>안전한 사용을 위해 매뉴얼을 숙지하세요.</p>
        </div>
      </div>
    `;
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
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
          animatePageTransition('prev', 1);
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (currentPage !== totalPages) {
          animatePageTransition('next', totalPages);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isAnimating]);

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
            <div style={{fontSize: '0.8rem', color: '#666'}}>농기계 매뉴얼 • 12장</div>
          </div>
          <div className="toc-list">
            {chapterTitles.map((title, index) => (
              <div
                key={index}
                className={`toc-item ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => goToSection(index + 1)}
              >
                {title}
              </div>
            ))}
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="content-area">
          <div className="content-header">
            <div className="page-info">
              <span>{chapterTitles[currentPage - 1] || `${currentPage}장`}</span>
            </div>
            <div className="zoom-controls">
              <button className="zoom-btn" onClick={zoomOut}>-</button>
              <span className="zoom-level">{currentZoom}%</span>
              <button className="zoom-btn" onClick={zoomIn}>+</button>
            </div>
          </div>

          <div className="pdf-viewer" id="pdfViewer">
            <div className="pdf-container">
              {/* 단일 페이지 뷰 */}
              <div 
                ref={singleViewRef}
                className="pdf-page-single active-page"
                style={{
                  transform: `scale(${currentZoom / 100})`,
                  transformOrigin: 'top center'
                }}
                dangerouslySetInnerHTML={{ __html: getPageContent(currentPage) }}
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
            <div className="page-counter">{currentPage} / {totalPages} 페이지</div>
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
