
<img width="1912" height="906" alt="스크린샷 2025-09-02 000108" src="https://github.com/user-attachments/assets/20f6ae9a-b967-43aa-b14f-c74d563b72ac" />
<img width="1913" height="903" alt="스크린샷 2025-09-02 000125" src="https://github.com/user-attachments/assets/bc169576-ac84-47dc-a7fc-f39d49cef39f" />

# 농업e지 eBook 제작 프로젝트

## 📖 프로젝트 개요

농업e지 교재들을 EPUB3 전자책으로 변환하고, 웹 뷰어를 통해 접근할 수 있도록 하는 프로젝트입니다. 특히 노년층을 고려한 접근성과 사용성을 중시하여 설계되었습니다.

## 🎯 주요 목표

- PDF 교재를 EPUB3 형식으로 변환
- 웹 기반 PDF/EPUB 뷰어 구현
- 노년층 친화적인 UI/UX 디자인
- 접근성 향상 (글자 크기 조절, 색상 대비 등)

## 🛠️ 기술 스택

- **Frontend**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **PDF Viewer**: PDF.js
- **EPUB Viewer**: react-reader (epub.js)
- **Package Manager**: npm

## 📁 프로젝트 구조

```
nongupez_ebook/
├── guides_pdf/                    # 원본 PDF 교재
│   ├── 250808_농업e지_안내서_기존.pdf
│   └── 250814_농업e지_경영체교재_기본.pdf
├── public/
│   ├── guides_pdf/               # 웹 서빙용 PDF 파일
│   └── ebooks/                   # EPUB 파일 저장소
├── src/
│   ├── app/
│   │   ├── globals.css           # 전역 스타일 (메인 + 뷰어)
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── page.tsx              # 메인 페이지
│   │   └── reader/
│   │       └── page.tsx          # 뷰어 라우트
│   └── components/
│       ├── PdfViewer.tsx         # PDF 뷰어 컴포넌트
│       └── EpubViewer.tsx        # EPUB 뷰어 컴포넌트
├── project_guideline/
│   └── project_guideline.yaml    # 프로젝트 가이드라인
├── package.json                   # 의존성 및 스크립트
├── next.config.js                 # Next.js 설정
├── tailwind.config.js             # Tailwind CSS 설정
└── tsconfig.json                  # TypeScript 설정
```

## 🎨 UI/UX 디자인 특징

### 메인 페이지
- **그라데이션 배경**: 따뜻한 오렌지 계열 색상
- **책 카드 레이아웃**: 직관적인 그리드 형태
- **반응형 디자인**: 모바일/태블릿 최적화
- **호버 효과**: 부드러운 애니메이션과 그림자

### 뷰어 페이지
- **사이드바 목차**: 빠른 섹션 이동
- **줌 컨트롤**: 100% ~ 200% 줌 레벨 조절
- **페이지 네비게이션**: 이전/다음 버튼
- **반응형 레이아웃**: 다양한 화면 크기 지원

## ✨ 작업 내용

### 1. 프로젝트 초기 설정
- Next.js 14+ 프로젝트 생성
- TypeScript, Tailwind CSS 설정
- PDF.js, react-reader 라이브러리 설치
- 프로젝트 구조 및 폴더 생성

### 2. 메인 페이지 구현
- 농업e지 교재 목록 표시
- PDF/EPUB 형식별 책 카드 디자인
- 반응형 그리드 레이아웃
- "책 읽기" 버튼으로 뷰어 연결
- **통계 섹션 제거**: 총 전자책, PDF 교재, EPUB 교재 통계 카드 제거
- **이미지 폴더 생성**: `public/images/banners/`, `public/images/thumbnails/` 폴더 생성

### 3. 뷰어 페이지 구현
- **PDF 뷰어**: 
  - 실제 PDF 파일 연동 (pdfjs-dist 라이브러리 사용)
  - 전체 PDF 완전 로딩 후 뷰어 표시
  - 페이지 전환 및 줌 컨트롤
  - 목차 사이드바 (페이지별 이동)
  - 키보드 네비게이션 (화살표 키)
- **EPUB 뷰어**: 
  - react-reader 기반 구현
  - 동적 임포트로 SSR 이슈 해결

### 4. PDF 뷰어 최적화 및 안정성 개선
- **렌더링 안정성**: 
  - RenderingCancelledException 오류 처리
  - 렌더링 작업 취소 로직 개선
  - 페이지 카운터 깜박거림 문제 해결
- **이미지 렌더링**: 
  - PDF 내 이미지 정상 표시 (maxImageSize 10MB로 증가)
  - 렌더링 컨텍스트 최적화
- **UI 개선**: 
  - 교재 제목에서 "농촌진흥청" 부제 제거
  - 사이드바에서 교재 제목과 페이지 정보 제거
  - 깔끔한 목차만 표시

### 5. 접근성 개선
- **폰트**: Noto Sans KR 사용
- **색상**: 높은 대비의 오렌지 계열 (#ff8c42)
- **줌**: 75% ~ 200% 지원
- **키보드**: 화살표 키로 페이지 이동
- **안정성**: 페이지 전환 시 깜박거림 없는 부드러운 동작

## 🚀 실행 방법

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 📱 지원 브라우저

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 주요 기능

### PDF 뷰어
- A4 가로형 최적화
- 페이지 전환 애니메이션
- 줌 레벨 조절 (100% ~ 200%)
- 목차 사이드바
- 키보드 네비게이션

### EPUB 뷰어
- EPUB3 형식 지원
- 자동 목차 생성
- 북마크 및 위치 저장
- 반응형 레이아웃

## 📋 향후 계획

- [x] 실제 PDF 파일 연동
- [x] PDF 뷰어 안정성 개선
- [x] UI/UX 개선 (불필요한 정보 제거)
- [ ] PDF → EPUB3 변환 기능 구현
- [ ] 사용자 인증 시스템
- [ ] 북마크 및 하이라이트 기능
- [ ] 다운로드 기능 구현
- [ ] 성능 최적화
- [ ] 웹 배너 및 썸네일 이미지 추가

## 🤝 기여 방법

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다
3. 변경사항을 커밋합니다
4. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 팀

- **프로젝트 매니저**: 농업e지 팀
- **개발**: AI Assistant
- **디자인**: 농업e지 브랜드 가이드라인 기반

---

**마지막 업데이트**: 2024년 12월
**버전**: 1.1.0
