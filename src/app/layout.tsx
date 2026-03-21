import type { Metadata } from 'next';
import { Archivo, Bebas_Neue, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Barber Gestão Pro',
  description: 'LP ultra profissional para donos de barbearia escalarem o negócio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivo.variable} ${bebas.variable} ${cormorant.variable} grain`}>
        {children}
      </body>
    </html>
  );
}
