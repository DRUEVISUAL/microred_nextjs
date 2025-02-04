import createPostObject from "@/utils/createPostObject";
import { MediaMetadata, PostHint, Preview, SecureMedia } from "./redditPostTypes";
import { UseQueryResult } from "@tanstack/react-query";

////////////////////////////////////////////////////////////////////////////////

export type Feed = 'top' | 'best' | 'new' | 'hot'

export type ConstructedRedditPost = ReturnType<typeof createPostObject>

export type SearchResultObject = {
    display_name: string;
    url: string;
    icon_img: string | undefined;
}

export type SearchQueryResult = UseQueryResult<SearchResultObject[], Error>





