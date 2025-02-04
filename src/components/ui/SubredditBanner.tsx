// Utilities
import createSubredditBannerObject from '@/utils/createSubredditBannerObject';

// Hooks
import { useQuery } from '@tanstack/react-query';

// Components
import Image from 'next/image';

////////////////////////////////////////////////////////////////////////////////

type SubredditBannerProps = {
	slug: string;
};

export default function SubredditBanner({ slug }: SubredditBannerProps) {
	const query = useQuery({
		queryKey: ['subredditData', slug],
		queryFn: async () => {
			const response = await fetch(`https://www.reddit.com/${slug}/about.json`);
			const responseJSON: SubredditData = await response.json();
			const subredditBannerObject = createSubredditBannerObject(responseJSON.data);
			return subredditBannerObject;
		},
	});

	const data = query?.data;

	return (
		<div className="border-px border-border/20 group relative flex h-64 w-full items-center gap-8 overflow-hidden rounded-lg p-4 shadow-lg">
			<div className="z-20 flex items-center gap-4 group-hover:opacity-0">
				{data?.iconImg ? (
					<Image
						src={data?.iconImg!}
						width={128}
						height={128}
						alt={slug + ' subreddit image'}
						className="border-px border-border/20 size-20 rounded-full shadow-md md:size-36"
						style={{ backgroundColor: data?.keyColor }}
					/>
				) : (
					<div className="border-px border-border/20 bg-primary size-36 rounded-full shadow-md"></div>
				)}
				<div className="border-border flex flex-col gap-2 rounded-lg bg-black/30 p-2 shadow-md backdrop-blur-md">
					<h2 className="text-xl font-semibold md:text-2xl">{data?.subreddit}</h2>
					<p className="text-sm text-neutral-300">{data?.subscribers} members</p>
				</div>
			</div>

			{data?.banner ? (
				<Image
					src={data?.banner}
					width={data?.size[0]}
					height={data?.size[1]}
					quality={60}
					alt={slug + ' subreddit image'}
					className="absolute top-0 left-0 z-10 h-full w-full rounded-lg object-cover blur-md transition-all duration-300 group-hover:blur-none"
				/>
			) : (
				<div
					className="absolute top-0 left-0 z-10 h-full w-full rounded-lg"
					style={{ backgroundColor: data?.backgroundColor }}
				></div>
			)}
		</div>
	);
}
