import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
});
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Grimoire — Some things deserve to last forever',
  description: 'A personal encrypted vault on Filecoin. Your most precious data — seed phrases, private keys, documents, letters — encrypted client-side, stored forever on Filecoin, registered onchain via FEVM.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body bg-[var(--parchment)] text-[var(--ink)] antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
