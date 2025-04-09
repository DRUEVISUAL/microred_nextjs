import createPostObject from '@/utils/createPostObject';
import { UseQueryResult } from '@tanstack/react-query';
import createSubredditBannerObject from '@/utils/createSubredditBannerObject';

////////////////////////////////////////////////////////////////////////////////

export type Feed = 'top' | 'best' | 'new' | 'hot';

export type ConstructedRedditPost = ReturnType<typeof createPostObject>;

export type ConstructedSubredditBannerObject = ReturnType<typeof createSubredditBannerObject>;

export type SearchResultObject = {
	display_name: string;
	url: string;
	icon_img: string | undefined;
};

export type SearchQueryResult = UseQueryResult<SearchResultObject[], Error>;
