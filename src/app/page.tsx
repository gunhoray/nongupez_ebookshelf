'use client';

import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  emoji: string;
  type: 'pdf' | 'epub';
  filename?: string;
}

const books: Book[] = [
  {
    id: 1,
    title: '농업e지 안내서',
    author: '농촌진흥청',
    emoji: '🌱',
    type: 'pdf',
    filename: '250808_농업e지_안내서_기존.pdf'
  },
  {
    id: 2,
    title: '농업e지 경영체교재',
    author: '농촌진흥청',
    emoji: '🚜',
    type: 'pdf',
    filename: '250814_농업e지_경영체교재_기본.pdf'
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
      const filename = book.filename || `${book.title}.pdf`;
      window.location.href = `/reader?type=pdf&src=/guides_pdf/${encodeURIComponent(filename)}`;
    } else {
      // EPUB 뷰어로 이동
      const filename = book.filename || `${book.title}.epub`;
      window.location.href = `/reader?type=epub&src=/ebooks/${encodeURIComponent(filename)}`;
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

          </main>
        </div>
      </div>
    </>
  );
}
