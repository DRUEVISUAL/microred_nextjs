// Style
import localFont from 'next/font/local';
import './globals.css';

// Types
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

////////////////////////////////////////////////////////////////////////////////

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '500 600',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '',
	colorScheme: 'light',
};

export const metadata: Metadata = {
	// metadataBase: new URL(''),
	// alternates: {
	//   canonical: '/',
	//   languages: {
	//     'sk-SK': '/sk',
	//     'hu-HU': '/hu',
	//     'en-US': '/en',
	//   },
	// },
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
	// formatDetection: {
	//   email: true,
	//   address: true,
	//   telephone: true,
	// },

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

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} dark bg-background text-foreground antialiased selection:bg-primary selection:text-white`}
			>
				{children}
			</body>
		</html>
	);
}
