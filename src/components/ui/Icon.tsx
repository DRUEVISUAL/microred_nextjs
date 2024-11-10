// Components
import Image from 'next/image';

// Utilities
import { cn } from '@/lib/utils';

// Icons
import voted from '../../../public/assets/svg/ui/voted.svg';
import not_voted from '../../../public/assets/svg/ui/not_voted.svg';
import comment from '../../../public/assets/svg/ui/comment.svg';
import search from '../../../public/assets/svg/ui/search.svg';
import close from '../../../public/assets/svg/ui/menu_close.svg';
import top_feed from '../../../public/assets/svg/ui/feed_top.svg';
import best_feed from '../../../public/assets/svg/ui/feed_best.svg';
import new_feed from '../../../public/assets/svg/ui/feed_new.svg';
import hot_feed from '../../../public/assets/svg/ui/feed_hot.svg';

////////////////////////////////////////////////////////////////////////////////

const icons = {
	voted,
	not_voted,
	comment,
	search,
	close,
	top: top_feed,
	best: best_feed,
	new: new_feed,
	hot: hot_feed,
};

export type StaticIconName = keyof typeof icons;

type IconProps = { name: StaticIconName; className?: string };

export default function Icon({ name, className }: IconProps) {
	return (
		<Image
			src={icons[name]}
			alt=""
			aria-hidden
			className={cn('noninteractive size-5', className)}
		/>
	);
}
