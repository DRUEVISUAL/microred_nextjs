// Types
import { RedditResponse } from '@/lib/redditPostTypes';
import { Feed } from '@/lib/types';

////////////////////////////////////////////////////////////////////////////////

export default async function getFeed(
	slug: string | Feed,
	pageParam?: string,
	isSubreddit?: boolean,
): Promise<RedditResponse | undefined> {
	const postPerFetch = 5;
	const mixedFeed = !isSubreddit ? 'r/all/' : '';
	const initialUrl = `https://www.reddit.com/${mixedFeed}${slug}.json?limit=${postPerFetch}`; // First 5 posts
	const afterUrl = `https://www.reddit.com/${mixedFeed}${slug}.json?limit=${postPerFetch}&after=${pageParam}`; // Next 5 posts

	const url = pageParam ? afterUrl : initialUrl;

	try {
		const response = await fetch(url);

		if (response.ok) {
			const data: RedditResponse = await response.json();
			return data;
		}
	} catch (error) {
		console.error(error);
		throw new Error('Error while fetching feed data');
	}
}
