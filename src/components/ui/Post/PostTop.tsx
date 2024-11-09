// Components
import Image from 'next/image';
import Link from 'next/link';

// Types
import { PostContentShape } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

type PostTopProps = { post: PostContentShape };

export default function PostTop({ post }: PostTopProps) {
	const { imgSrc, label } = post.subReddit;
	const { creator, time, title } = post;

	return (
		<header className="shadow-xs flex flex-col rounded-md border-px bg-card-layer text-sm">
			<div className="flex items-center justify-between gap-8 p-2">
				<Link
					href={'/r'}
					className="flex items-center gap-2"
				>
					<Image
						src={imgSrc}
						alt={label + ' Subreddit Image'}
						className="size-5 rounded-full"
						width={20}
						height={20}
					/>
					<p>{post.subReddit.label}</p>
				</Link>
				<div className="flex items-center gap-4">
					<p>
						Posted by: <Link href={'/u'}> {creator}</Link>
					</p>
					<p>{time}</p>
				</div>
			</div>
			<h2 className="bg-card-layer2 text-pretty rounded-b-md p-2 text-lg font-semibold">{title}</h2>
		</header>
	);
}
