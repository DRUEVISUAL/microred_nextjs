// Types
import { PostContentShape } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

type PostBottomProps = { post: PostContentShape };

export default function PostBottom({ post }: PostBottomProps) {
	const { likeCount, commentCount } = post;
	return (
		<footer className="bg-card-layer2 flex items-center justify-between rounded-lg border-px p-2 text-sm shadow-sm">
			<div className="flex items-center gap-2">
				<div>{'<'}</div>
				<div>{likeCount}</div>
				<div>{'>'}</div>
			</div>

			<div>
				<div>{commentCount} Comment</div>
			</div>
		</footer>
	);
}
