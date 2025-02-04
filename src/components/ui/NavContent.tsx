import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import Search from './Search';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Icon from './Icon';
import { SearchQueryResult } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

type NavContentProps = {
	searchValue: string;
	handleSearchInput: (value: string) => void;
	query: SearchQueryResult;
	pathname: string;
	handleClickHidePhoneMenu?: () => void;
};

const feeds = ['Top', 'Best', 'New', 'Hot'];

export default function NavContent({
	searchValue,
	handleSearchInput,
	query,
	pathname,
	handleClickHidePhoneMenu,
}: NavContentProps) {
	return (
		<>
			<Search
				value={searchValue}
				handleSearchInput={handleSearchInput}
			/>
			<div className="mt-8 flex w-full flex-col rounded-lg bg-black/20 p-2">
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
								onClick={handleClickHidePhoneMenu}
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
								'focused hover:bg-muted mb-2 flex items-center gap-2 p-2',
								pathname === lowerCaseFeed && 'bg-black/30 hover:bg-black/30',
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
		</>
	);
}
