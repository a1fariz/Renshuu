import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Renshuu — Belajar Bahasa Jepang',
  description: 'Platform belajar bahasa Jepang mandiri dari kana sampai N4.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
