'use client';

// Hooks
import { useEffect, useRef, useState } from 'react';

// Utilities
import { Player } from '@lordicon/react';
import { cn } from '@/lib/utils';

// Lottie
import browse_feed from '../../lib/lottie/browse_feed.json';
import source_code from '../../lib/lottie/source_code.json';
import portfolio from '../../lib/lottie/portfolio.json';

////////////////////////////////////////////////////////////////////////////////

const icons = {
	browse_feed,
	source_code,
	portfolio,
};

export type IconName = keyof typeof icons;

const animationTypeEnding: Record<IconName, string> = {
	browse_feed: '-view-5',
	source_code: '-build',
	portfolio: '-account',
};

type AnimatedIconWithTextProps = {
	name: keyof typeof icons;
	text: string;
	className?: string;
};

////////////////////////////////////////////////////////////////////////////////

export default function AnimatedIconWithText({ name, text, className }: AnimatedIconWithTextProps) {
	const [animationType, setIsInAnimationType] = useState<'in' | 'hover'>('in');
	const playerRef = useRef<Player>(null);

	function handleChangeToHoverType() {
		setIsInAnimationType('hover');
	}

	useEffect(() => {
		const timeoutID = setTimeout(() => playerRef.current?.playFromBeginning(), 500);

		return () => clearTimeout(timeoutID);
	}, []);

	return (
		<div
			onMouseEnter={() => playerRef.current?.playFromBeginning()}
			className={cn('flex items-center gap-2', className)}
		>
			<Player
				ref={playerRef}
				icon={icons[name]}
				renderMode="AUTOMATIC"
				state={animationType + animationTypeEnding[name]}
				onComplete={handleChangeToHoverType}
			/>
			<span className="font-medium">{text}</span>
		</div>
	);
}
