'use client';

// Components
import Link from 'next/link';
import Search from './Search';
import Icon from './Icon';
import Image from 'next/image';

// Utilities
import { cn } from '@/lib/utils';
import createSearchResultObject from '@/utils/createSearchResultObject';

// Hooks
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';

// Image
import logo from '../../../public/assets/svg/logo.svg';
import { ScrollArea } from './shadcn/scroll-area';

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
			const responseJSON = await response.json();
			const searchResults = createSearchResultObject(responseJSON.data.children);
			return searchResults;
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
				'bg-card-layer/50 border-px fixed top-0 left-0 z-50 hidden h-full w-64 flex-col items-center gap-8 border-white p-2 transition-transform delay-100 duration-500 ease-in-out lg:flex',
				isHidden && '-translate-x-full',
			)}
		>
			<Link
				href={'/'}
				className="mt-6 flex items-center gap-2 text-3xl font-semibold hover:animate-pulse"
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
			<div className="flex w-full flex-col rounded-lg bg-black/20 p-2">
				{/* Search results */}

				<ScrollArea
					className={cn(
						'border-border/20 bg-muted/40 z-10 flex h-full flex-col gap-2 overflow-x-clip overflow-y-auto rounded-md border font-medium shadow-xs transition-all duration-500 ease-in-out',
						query.data?.length ? 'max-h-64 scale-100 opacity-100' : 'max-h-0 scale-95 opacity-0',
					)}
				>
					{query?.data?.map((data) => {
						return (
							<Link
								key={data?.url + '_key'}
								href={`${data?.url}`}
								className="focused hover:bg-muted m-0.5 flex items-center gap-2 py-1"
							>
								{data?.icon_img ? (
									<Image
										src={data?.icon_img}
										alt={data?.display_name + ' Subreddit Image'}
										className="size-5 rounded-full"
										width={216}
										height={216}
									/>
								) : (
									<div className="bg-primary size-5 rounded-full"></div>
								)}

								<p>{data?.display_name}</p>
							</Link>
						);
					})}
				</ScrollArea>

				{/* Predefined feeds */}
				<h3 className="text-muted-foreground my-2 ml-2 font-semibold">Feeds</h3>
				{feeds.map((feed) => {
					const lowerCaseFeed = feed.toLowerCase();
					return (
						<Link
							key={feed}
							href={`/${lowerCaseFeed}`}
							className={cn(
								'focused mb-2 flex items-center gap-2 p-2',
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
