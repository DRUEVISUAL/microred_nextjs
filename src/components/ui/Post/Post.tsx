// Components
import PostBottom from './PostBottom';
import PostContent from './PostContent';
import PostTop from './PostTop';

// Types
import { PostContentShape } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

const post: PostContentShape = {
	subReddit: {
		label: 'r/AccidentalRenaissance',
		imgSrc: 'https://styles.redditmedia.com/t5_32xq7/styles/communityIcon_w657wnclnbfb1.jpg',
	},
	title: 'Thank you for everything, coach!',
	creator: 'InspectorConfident55',
	time: '10 hours ago',
	content: 'https://i.redd.it/70lmc0gghszd1.jpeg',
	likeCount: 1928,
	commentCount: 402,
};

export default function Post() {
	return (
		<article className="flex w-full min-w-fit flex-col gap-2 rounded-lg border-px bg-card p-2 shadow-sm lg:w-[50vw] lg:min-w-fit">
			<PostTop post={post} />
			<PostContent post={post} />
			<PostBottom post={post} />
		</article>
	);
}
