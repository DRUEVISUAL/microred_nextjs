// Types
import { ReactNode } from 'react';

// Utilities
import { cn } from '@/lib/utils';

////////////////////////////////////////////////////////////////////////////////

type WrapperProps = { children: ReactNode; sectionLabel: string; className?: string };

export default function Wrapper({ children, sectionLabel, className }: WrapperProps) {
	return (
		<section
			aria-label={sectionLabel}
			className={cn(
				'mx-auto h-full min-h-[667px] w-full max-w-(--breakpoint-2xl) p-4 lg:p-8',
				className,
			)}
		>
			{children}
		</section>
	);
}
