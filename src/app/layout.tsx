import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barbergestaopro.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Barber Gestão Pro | Curso para donos de barbearia',
    template: '%s | Barber Gestão Pro',
  },
  description:
    'Curso Barber Gestão Pro com Carlos Copetti: gestão, liderança, marketing e financeiro para estruturar, escalar e lucrar na sua barbearia.',
  keywords: [
    'Barber Gestão Pro',
    'curso de barbearia',
    'gestão de barbearia',
    'Carlos Copetti',
    'barbearia lucrativa',
    'liderança para barbeiros',
    'marketing para barbearia',
    'financeiro para barbearia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Barber Gestão Pro',
    title: 'Barber Gestão Pro | Curso para donos de barbearia',
    description:
      'Aprenda gestão real de barbearia com Carlos Copetti: operação, liderança, processos e crescimento com método validado.',
    images: [
      {
        url: '/hero-v2.png',
        width: 1272,
        height: 1424,
        alt: 'Carlos Copetti - Barber Gestão Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barber Gestão Pro | Curso para donos de barbearia',
    description:
      'Método prático para sair da operação e escalar sua barbearia com previsibilidade e lucro.',
    images: ['/hero-v2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} grain`}>
        {children}
      </body>
    </html>
  );
}
