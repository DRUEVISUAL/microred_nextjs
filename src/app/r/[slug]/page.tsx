// Pages
import FeedPage from '@/components/page/FeedPage';

////////////////////////////////////////////////////////////////////////////////

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function page({ params }: PageProps) {
	const slug = (await params).slug;
	return (
		<FeedPage
			slug={`r/${slug}`}
			isSubreddit={true}
		/>
	);
}
