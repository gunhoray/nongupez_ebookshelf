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
  // 정적 파일 서빙을 위한 설정
  async rewrites() {
    return [
      {
        source: '/guides_pdf/:path*',
        destination: '/public/guides_pdf/:path*',
      },
      {
        source: '/ebooks/:path*',
        destination: '/public/ebooks/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
