// Components
import Image from 'next/image';

// Utilities
import { cn } from '@/lib/utils';

// Icons
import book from '../../../public/assets/svg/ui/book.svg';

////////////////////////////////////////////////////////////////////////////////

type IconProps = { name: 'book'; className?: string };

export default function Icon({ name, className }: IconProps) {
	const icons = {
		book,
	};

	return (
		<Image
			src={icons[name]}
			alt=""
			aria-hidden
			className={cn('size-5', className)}
		/>
	);
}
