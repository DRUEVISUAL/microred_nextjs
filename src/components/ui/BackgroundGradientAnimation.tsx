/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Utilities
import { cn } from '@/lib/utils';

// Hooks
import { useEffect, useState } from 'react';

// Types
import { ReactNode } from 'react';

////////////////////////////////////////////////////////////////////////////////

export const BackgroundGradientAnimation = ({
	gradientBackgroundStart = 'rgba(255, 255, 255, 0)',
	gradientBackgroundEnd = 'rgba(255, 255, 255, 0)',
	firstColor = 'screen',
	secondColor = '240, 66, 66',
	thirdColor = '240, 66, 66',
	fourthColor = '240, 66, 66',
	fifthColor = '240, 66, 66',
	pointerColor = '240, 66, 66',
	size = '80%',
	blendingValue = 'soft-light',
	children,
	className,
	containerClassName,
}: {
	gradientBackgroundStart?: string;
	gradientBackgroundEnd?: string;
	firstColor?: string;
	secondColor?: string;
	thirdColor?: string;
	fourthColor?: string;
	fifthColor?: string;
	pointerColor?: string;
	size?: string;
	blendingValue?: string;
	children?: ReactNode;
	className?: string;
	interactive?: boolean;
	containerClassName?: string;
}) => {
	useEffect(() => {
		document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart);
		document.body.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
		document.body.style.setProperty('--first-color', firstColor);
		document.body.style.setProperty('--second-color', secondColor);
		document.body.style.setProperty('--third-color', thirdColor);
		document.body.style.setProperty('--fourth-color', fourthColor);
		document.body.style.setProperty('--fifth-color', fifthColor);
		document.body.style.setProperty('--pointer-color', pointerColor);
		document.body.style.setProperty('--size', size);
		document.body.style.setProperty('--blending-value', blendingValue);
	}, []);

	const [isSafari, setIsSafari] = useState(false);
	useEffect(() => {
		setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
	}, []);

	return (
		<div className={cn('fixed inset-0 top-0 h-full w-screen overflow-hidden', containerClassName)}>
			<svg className="hidden">
				<defs>
					<filter id="blurMe">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
							result="blur-sm"
						/>
						<feColorMatrix
							in="blur-sm"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
							result="goo"
						/>
						<feBlend
							in="SourceGraphic"
							in2="goo"
						/>
					</filter>
				</defs>
			</svg>
			<div className={cn('', className)}>{children}</div>
			<div
				className={cn(
					'gradients-container relative -z-10 h-full w-full opacity-15 blur-lg',
					isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
				)}
			>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
						`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
						`[transform-origin:center_center]`,
						`animate-first`,
						`opacity-100`,
					)}
				></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
						`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
						`[transform-origin:calc(50%-400px)]`,
						`animate-second`,
						`opacity-100`,
					)}
				></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
						`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
						`[transform-origin:calc(50%+400px)]`,
						`animate-third`,
						`opacity-100`,
					)}
				></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
						`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
						`[transform-origin:calc(50%-200px)]`,
						`animate-fourth`,
						`opacity-70`,
					)}
				></div>
				<div
					className={cn(
						`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
						`left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]`,
						`[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
						`animate-fifth`,
						`opacity-100`,
					)}
				></div>
			</div>
		</div>
	);
};
