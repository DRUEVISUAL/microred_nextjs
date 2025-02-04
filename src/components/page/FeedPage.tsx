'use client';

// Hooks
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// Components
import Post from '../ui/Post/Post';
import Wrapper from '../ui/Wrapper';
import getFeed from '@/utils/getFeed';
import Skeleton from '../ui/Post/Skeleton';
import { BackgroundGradientAnimation } from '../ui/BackgroundGradientAnimation';
import SubredditBanner from '../ui/SubredditBanner';

// Types
import { Feed } from '@/lib/types';

// Utilities
import createPostObject from '@/utils/createPostObject';

// Images
import { AlertTriangle } from 'lucide-react';

////////////////////////////////////////////////////////////////////////////////

type FeedPageProps = {
	slug: string | Feed;
	isSubreddit?: boolean;
};

export default function FeedPage({ slug, isSubreddit }: FeedPageProps) {
	const { ref, inView } = useInView({ rootMargin: '0px 0px 512px 0px' });

	const query = useInfiniteQuery({
		queryKey: ['getFeedData', slug],
		queryFn: async ({ pageParam = undefined }: { pageParam: string | undefined }) => {
			const response = await getFeed(slug, pageParam, isSubreddit);
			const posts = response?.data.children.map(createPostObject);
			const after = response?.data.after;
			return { after, posts };
		},
		getNextPageParam: (lastPage) => lastPage.after,
		initialPageParam: undefined,
		refetchOnWindowFocus: false,
	});

	const posts = query.data?.pages.flatMap((page) => page.posts) || [];

	useEffect(() => {
		if (inView) query.fetchNextPage();
	}, [inView]);

	return (
		<Wrapper
			sectionLabel={slug + ' feed'}
			className="flex w-auto max-w-[1740px] pt-20 basis-full flex-col items-center justify-center gap-12 lg:ml-[272px] lg:pl-4!"
		>
			{isSubreddit && <SubredditBanner slug={slug} />}

			{query.isPending && <Skeleton />}

			{posts.map((post) => {
				return (
					post && (
						<Post
							key={post.top.permalink}
							post={post}
						/>
					)
				);
			})}

			<div ref={ref}></div>

			{query.error && (
				<div
					className="flex h-full flex-col items-center justify-center gap-2 text-lg font-medium"
					onClick={() => console.log(query.error)}
				>
					<AlertTriangle className="text-yellow-400" />
					{query.error.message}
				</div>
			)}

			{query.isFetchingNextPage && (
				<div className="animate-pulse text-lg font-medium">Loading more posts...</div>
			)}
			<BackgroundGradientAnimation />
		</Wrapper>
	);
}
