// Components
import Link from 'next/link';
import Image from 'next/image';

// Types
import { ConstructedRedditPost } from '@/lib/types';

// Utilities
import { calculatePostAge } from '@/utils/calculatePostAge';
import { useQuery } from '@tanstack/react-query';
import ampersandConverter from '@/utils/convertToAmpersand';

////////////////////////////////////////////////////////////////////////////////

type PostTopProps = { post: ConstructedRedditPost };

export default function PostTop({ post }: PostTopProps) {
	const { subreddit_name_prefixed, title, author, created_utc, permalink } = post?.top;
	const subredditUrl = `https://www.reddit.com/${subreddit_name_prefixed}`;
	const authorUrl = `https://www.reddit.com/user/${author}`;
	const postUrl = `https://www.reddit.com/${permalink}`;
	const age = calculatePostAge(created_utc);

	const query = useQuery({
		queryKey: ['subredditData', subreddit_name_prefixed.toLowerCase()],
		queryFn: async () => {
			const response = await fetch(`https://www.reddit.com/${subreddit_name_prefixed}/about.json`);
			const responseJSON: SubredditData = await response.json();
			return responseJSON;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: 0,
	});

	const data = query?.data?.data;
	const icon_img = ampersandConverter(data?.icon_img) ?? ampersandConverter(data?.community_icon);

	return (
		<header className="border-px bg-card-layer flex flex-col rounded-md shadow-2xs">
			<div className="flex items-center justify-between gap-8 p-2">
				<Link
					href={`/${subreddit_name_prefixed}`}
					className="focused flex items-center gap-2 text-xs sm:text-sm font-semibold"
				>
					{icon_img ? (
						<Image
							src={icon_img}
							alt={title + ' Subreddit Image'}
							className="size-5 rounded-full"
							width={216}
							height={216}
						/>
					) : (
						<div className="bg-primary size-5 rounded-full"></div>
					)}

					<p>{subreddit_name_prefixed}</p>
				</Link>
				<div className="flex items-center gap-1 text-xs text-neutral-300 sm:text-sm">
					<p>
						By:{' '}
						<Link
							href={authorUrl}
							target="_blank"
							className="focused"
						>
							{author}
						</Link>
					</p>
					{'·'}
					<p>{age}</p>
				</div>
			</div>
			<Link
				href={postUrl}
				target="_blank"
			>
				<h2 className="bg-card-layer-2 rounded-b-md p-2 text-lg font-semibold text-pretty">
					{title}
				</h2>
			</Link>
		</header>
	);
}
