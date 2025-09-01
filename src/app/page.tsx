'use client';

import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  emoji: string;
  type: 'pdf' | 'epub';
}

const books: Book[] = [
  {
    id: 1,
    title: '농업e지 안내서',
    author: '농촌진흥청',
    emoji: '🌱',
    type: 'pdf'
  },
  {
    id: 2,
    title: '농업e지 경영체교재',
    author: '농촌진흥청',
    emoji: '🚜',
    type: 'pdf'
  },
  {
    id: 3,
    title: '스마트팜 운영 가이드',
    author: '농촌진흥청',
    emoji: '🌾',
    type: 'epub'
  },
  {
    id: 4,
    title: '농기계 활용 매뉴얼',
    author: '농업기술센터',
    emoji: '💧',
    type: 'epub'
  },
  {
    id: 5,
    title: '작물 재배 기술',
    author: '농업과학기술원',
    emoji: '🌿',
    type: 'epub'
  },
  {
    id: 6,
    title: '관수 시스템 관리',
    author: '한국농어촌공사',
    emoji: '📊',
    type: 'epub'
  },
  {
    id: 7,
    title: '친환경 농업 실무',
    author: '친환경농업연구소',
    emoji: '🌡️',
    type: 'epub'
  },
  {
    id: 8,
    title: '농업 데이터 분석',
    author: '농업기술실용화재단',
    emoji: '🍃',
    type: 'epub'
  }
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'epub'>('all');

  const filteredBooks = selectedType === 'all' 
    ? books 
    : books.filter(book => book.type === selectedType);

  const openEbook = (book: Book) => {
    if (book.type === 'pdf') {
      // PDF 뷰어로 이동
      window.location.href = `/reader?type=pdf&src=/guides_pdf/${encodeURIComponent(book.title)}.pdf`;
    } else {
      // EPUB 뷰어로 이동
      window.location.href = `/reader?type=epub&src=/ebooks/${encodeURIComponent(book.title)}.epub`;
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="banner-space">
            📢 웹 배너 영역<br />
            <small>여기에 배너 광고가 표시됩니다</small>
          </div>
          <div className="header-content">
            <a href="#" className="logo">🌾 농업e지 활용 가이드 E-BOOKSHELF</a>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="main-content">
          <main className="content-area">


            <div className="books-grid">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="book-card"
                  onClick={() => openEbook(book)}
                >
                  <div className="book-cover">
                    {book.emoji}
                  </div>
                  <div className="book-info">
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">{book.author}</div>
                    <div className="book-buttons">
                      <button className="book-button">
                        📖 책 읽기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-number">{books.length}</div>
                <div className="stat-label">총 전자책</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{books.filter(b => b.type === 'pdf').length}</div>
                <div className="stat-label">PDF 교재</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{books.filter(b => b.type === 'epub').length}</div>
                <div className="stat-label">EPUB 교재</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
