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
	// metadataBase: new URL(''),
	title: '',
	description: '',
	referrer: 'origin',
	creator: 'DRUEVISUAL',
	publisher: 'DRUEVISUAL',
	keywords: [],
	robots: {
		index: true,
		follow: true,
	},
	generator: 'Next.js',
	openGraph: {
		type: 'website',
		title: '',
		description: '',
		images: '/og-image.jpeg',
	},
	verification: {
		google: 'google',
	},
	category: '',
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
