'use client';

// Components
import Link from 'next/link';
import AnimatedIconWithText from '../ui/AnimatedIcon';
import Wrapper from '../ui/Wrapper';

// Types
import { AnimatedIconName } from '../ui/AnimatedIcon';
import { BackgroundGradientAnimation } from '../ui/BackgroundGradientAnimation';

// Images
import logo from '../../../public/assets/svg/logo.svg';
import Image from 'next/image';

////////////////////////////////////////////////////////////////////////////////

type Links = {
	label: string;
	url: string;
	name: AnimatedIconName;
	target: '_blank' | '_self';
}[];

const links: Links = [
	{ label: 'Browse', url: '/hot', name: 'browse_feed', target: '_self' },
	{
		label: 'Source',
		url: 'https://www.github.com/DRUEVISUAL',
		name: 'source_code',
		target: '_blank',
	},
	{
		label: 'Portfolio',
		url: 'https://www.druevisual.net',
		name: 'portfolio',
		target: '_blank',
	},
];

export default function LandingPage() {
	return (
		<Wrapper
			sectionLabel="Landing Section"
			className="grid h-screen place-content-center gap-16"
		>
			<div className="flex flex-col items-center justify-center gap-4">
				<Image
					src={logo}
					alt="microred logo"
					className="size-10"
				/>
				<h1 className="text-5xl font-semibold lg:text-7xl">Microred</h1>
				<p>Alternative for browsing reddit.</p>
			</div>

			<div className="relative z-10 flex gap-4">
				{links.map((link, index) => {
					const isNotLastItem = index !== links.length - 1;
					return (
						<div
							key={link.name}
							className="flex items-center gap-8"
						>
							<Link
								href={link.url}
								target={link.target}
							>
								<AnimatedIconWithText
									name={link.name}
									text={link.label}
								/>
							</Link>

							{isNotLastItem && <div className="h-full w-px rounded-full bg-white/50"></div>}
						</div>
					);
				})}
			</div>
			<BackgroundGradientAnimation />
		</Wrapper>
	);
}
