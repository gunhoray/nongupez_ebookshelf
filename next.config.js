/** @type {import('next').NextConfig} */
const nextConfig = {
  // PDF.js worker 파일 경로 설정
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js',
    };
    return config;
  },
  // Vercel 배포를 위한 최적화
  // 정적 파일 서빙을 위한 설정 (Vercel에서는 public 폴더가 자동으로 서빙됨)
  async headers() {
    return [
      {
        source: '/guides_pdf/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/ebooks/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/epub+zip',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
