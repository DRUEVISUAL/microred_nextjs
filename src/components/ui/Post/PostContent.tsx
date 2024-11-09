// Components
import Image from 'next/image';

// Types
import { PostContentShape } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

type PostContentProps = { post: PostContentShape };

export default function PostContent({ post }: PostContentProps) {
	const { content, title } = post;
	return (
		<section className="h-[75vh] min-h-[468px] rounded-lg border-px bg-card-layer p-2 shadow-sm">
			<Image
				src={content}
				alt={title}
				width={512}
				height={512}
				className="mx-auto h-full w-max rounded-md object-contain shadow-sm"
			/>
		</section>
	);
}
