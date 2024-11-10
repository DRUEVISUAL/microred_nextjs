// Components
import Post from '../ui/Post/Post';
import Wrapper from '../ui/Wrapper';

////////////////////////////////////////////////////////////////////////////////

type FeedPageProps = {
	slug: string;
};

export default function FeedPage({ slug }: FeedPageProps) {
	return (
		<Wrapper
			sectionLabel={slug + ' feed'}
			className="flex w-auto basis-full flex-col items-center justify-center gap-12 lg:ml-[272px] lg:!pl-4"
		>
			<Post />
			<Post />
			<Post />
			<Post />
		</Wrapper>
	);
}
