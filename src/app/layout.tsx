// Style
import localFont from 'next/font/local';
import './globals.css';

// Types
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

// Components
import Nav from '@/components/ui/Nav';
import TanstackQueryClientProvider from '@/providers/queryClientProvider';

////////////////////////////////////////////////////////////////////////////////

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '500 600',
});

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '400 500 600 700',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#000000',
	colorScheme: 'dark',
};

export const metadata: Metadata = {
	metadataBase: new URL('https://www.microred.vercel.app'),
	title: 'Microred – Beautiful Reddit Browsing',
	description: 'A light and modern alternative to browsing Reddit.',
	referrer: 'origin',
	creator: 'DRUEVISUAL',
	publisher: 'DRUEVISUAL',
	keywords: ['reddit', 'redesign', 'microred', 'reddit client', 'nextjs app'],
	robots: {
		index: true,
		follow: true,
	},
	generator: 'Next.js',
	category: 'technology',
	openGraph: {
		type: 'website',
		url: 'https://www.microred.vercel.app',
		title: 'Microred – Beautiful Reddit Browsing',
		description: 'A light and modern alternative to browsing Reddit.',
		images: [
			{
				url: '/assets/og_img.jpg',
				width: 1200,
				height: 630,
				alt: 'Microred logo',
			},
		],
		siteName: 'Microred',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Microred – Beautiful Reddit Browsing',
		description: 'An elegant and modern alternative to browsing Reddit.',
		images: ['/assets/og_img.jpg'],
		creator: '@druevisual',
	},
};

////////////////////////////////////////////////////////////////////////////////

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary antialiased selection:text-white`}
			>
				<TanstackQueryClientProvider>
					<Nav />
					{children}
				</TanstackQueryClientProvider>
			</body>
		</html>
	);
}
