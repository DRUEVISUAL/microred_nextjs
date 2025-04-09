// Components
import PostTop from './PostTop';
import PostContent from './PostContent';
import PostBottom from './PostBottom';

// Types
import { ConstructedRedditPost } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

type PostProps = { post: ConstructedRedditPost };

export default function Post({ post }: PostProps) {
	return (
		<article className="border-px border-border/75 bg-card relative z-20 flex w-full flex-col gap-2 rounded-lg p-2 shadow-xs lg:max-w-(--breakpoint-md)">
			<PostTop post={post} />
			<PostContent post={post} />
			<PostBottom post={post} />
		</article>
	);
}
