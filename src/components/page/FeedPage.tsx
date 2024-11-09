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
			className="grid place-content-center"
		>
			<Post />
		</Wrapper>
	);
}
