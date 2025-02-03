'use client';

// Components
import Link from 'next/link';
import Search from './Search';
import Icon from './Icon';
import Image from 'next/image';

// Utilities
import { cn } from '@/lib/utils';

// Hooks
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Image
import logo from '../../../public/assets/svg/logo.svg';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

////////////////////////////////////////////////////////////////////////////////

const feeds = ['Top', 'Best', 'New', 'Hot'];

export default function SideNav() {
	const pathname = usePathname().split('/')[1];
	const [isHidden, setIsHidden] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue);

	const query = useQuery({
		queryKey: ['search', debouncedSearchValue],
		queryFn: async () => {
			const response = await fetch(
				`https://www.reddit.com/search.json?q=${debouncedSearchValue}&type=sr`,
			);
			const responseJSON: SubredditData = await response.json();
			return responseJSON;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: 0,
	});

	function handleSearchInput(value: string) {
		setSearchValue(value);
	}

	useEffect(() => {
		pathname === '' ? setIsHidden(true) : setIsHidden(false);
	}, [pathname]);

	return (
		<nav
			className={cn(
				'fixed left-0 top-0 z-50 hidden h-full w-64 flex-col items-center gap-8 bg-card-layer/50 p-2 transition-transform delay-100 duration-500 ease-in-out lg:flex',
				isHidden && '-translate-x-full',
			)}
		>
			<Link
				href={'/'}
				className="mt-6 flex items-center gap-2 text-3xl font-semibold"
			>
				<Image
					src={logo}
					alt="microred logo"
					className="size-10"
				/>
				Microred
			</Link>
			<Search
				value={searchValue}
				handleSearchInput={handleSearchInput}
			/>
			<div className="flex w-full flex-col gap-2 rounded-lg bg-black/10 p-2">
				<div className="z-10 flex max-h-48 flex-col gap-2 overflow-y-auto overflow-x-clip rounded-md border-px border-border/20 bg-muted/30 font-medium shadow-xs">
					{/* <Link
						href={`/${subreddit_name_prefixed}`}
						className="focused flex items-center gap-2"
					>
						{query.data?.data.icon_img ? (
							<Image
								src={query.data?.data.icon_img}
								alt={title + ' Subreddit Image'}
								className="size-5 rounded-full"
								width={216}
								height={216}
							/>
						) : (
							<div className="size-5 rounded-full bg-primary"></div>
						)}

						<p>{subreddit_name_prefixed}</p>
					</Link> */}
				</div>
				<h3 className="my-2 ml-2 font-semibold text-muted-foreground">Feeds</h3>
				{feeds.map((feed) => {
					const lowerCaseFeed = feed.toLowerCase();
					return (
						<Link
							key={feed}
							href={`/${lowerCaseFeed}`}
							className={cn(
								'focused flex items-center gap-2 p-2',
								pathname === lowerCaseFeed && 'bg-black/30',
							)}
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
