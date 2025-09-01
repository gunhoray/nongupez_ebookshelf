import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '농업e지 eBook 뷰어',
  description: '농업e지 교재를 웹에서 열람할 수 있는 접근성 친화적 뷰어',
  keywords: ['농업e지', 'eBook', 'PDF', 'EPUB', '뷰어', '접근성'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
