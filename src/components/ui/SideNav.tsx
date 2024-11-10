// Components
import Link from 'next/link';
import Search from './Search';
import Icon from './Icon';

// Utilities
import { cn } from '@/lib/utils';

////////////////////////////////////////////////////////////////////////////////

const feeds = ['Top', 'Best', 'New', 'Hot'];

export default function SideNav() {
	return (
		<nav className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col items-center gap-8 bg-card-layer/50 p-2 lg:flex">
			<div className="mt-6 text-3xl font-semibold">Microred</div>
			<Search />
			<div className="flex w-full flex-col gap-2 rounded-lg bg-black/10 p-2">
				<h3 className="my-2 ml-2 font-semibold text-muted-foreground">Feeds</h3>
				{feeds.map((feed) => {
					const lowerCaseFeed = feed.toLowerCase();
					return (
						<Link
							key={feed}
							href={`/${lowerCaseFeed}`}
							className={cn('focused flex items-center gap-2 p-2')}
						>
							<Icon
								name={lowerCaseFeed as 'top' | 'best' | 'new' | 'hot'}
								className="size-4"
							/>
							<span className="font-semibold">{feed}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
