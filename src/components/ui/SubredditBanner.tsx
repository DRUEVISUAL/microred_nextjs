import { cn } from '@/lib/utils';
import ampersandConverter from '@/utils/convertToAmpersand';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

type SubredditBannerProps = {
	slug: string;
};

export default function SubredditBanner({ slug }: SubredditBannerProps) {
	const query = useQuery({
		queryKey: ['subredditData', slug],
		queryFn: async () => {
			const response = await fetch(`https://www.reddit.com/${slug}/about.json`);
			const responseJSON: SubredditData = await response.json();
			return responseJSON;
		},
	});

	const data = query?.data?.data;

	const icon_img = ampersandConverter(data?.icon_img) ?? ampersandConverter(data?.community_icon);
	const keyColor = data?.key_color || '#ffffff';

	const banner =
		ampersandConverter(data?.banner_background_image) ??
		ampersandConverter(data?.mobile_banner_image) ??
		ampersandConverter(data?.banner_img);
	const size = data?.banner_size || [2048, 512];
	const backgroundColor = data?.banner_background_color;

	const subreddit = data?.display_name_prefixed;
	const subscribers = data?.subscribers;

	return (
		<div className="relative flex h-64 w-full items-center gap-8 overflow-hidden rounded-lg border-px border-border/20 p-4 shadow-lg group">
			<div className="flex items-center gap-4 z-20 group-hover:opacity-0">
				{icon_img ? (
					<Image
						src={icon_img!}
						width={128}
						height={128}
						alt={slug + ' subreddit image'}
						className="size-36 rounded-full border-px border-border/20 shadow-md"
						style={{ backgroundColor: keyColor }}
					/>
				) : (
					<div className="size-36 rounded-full border-px border-border/20 bg-primary shadow-md"></div>
				)}
				<div className="flex flex-col gap-2 rounded-lg border-border bg-black/30 p-2 shadow-md backdrop-blur-md">
					<h2 className="text-2xl font-semibold">{subreddit}</h2>
					<p>{subscribers} members</p>
				</div>
			</div>

			{banner ? (
				<Image
					src={banner!}
					width={size[0]}
					height={size[1]}
					quality={60}
					alt={slug + ' subreddit image'}
					className="absolute left-0 top-0 h-full w-full z-10 rounded-lg object-cover blur-md group-hover:blur-none transition-all duration-300"
				/>
			) : (
				<div
					className="absolute left-0 top-0 z-10 h-full w-full rounded-lg"
					style={{ backgroundColor }}
				></div>
			)}
		</div>
	);
}
