import { MediaMetadata, PostHint, Preview, SecureMedia } from "./redditPostTypes";

////////////////////////////////////////////////////////////////////////////////

export type Feed = 'top' | 'best' | 'new' | 'hot'

export interface ConstructedRedditPost {
	id: string
	top: {
		subreddit_name_prefixed: string,
		subreddit_id: string, title: string,
		author: string, created_utc: number,
		permalink: string
	},
	content: {
		post_hint: PostHint,
		image: {
			is_gallery: boolean | undefined
			media_metadata: MediaMetadata
			url: string
			title: string
			subreddit_name_prefixed: string
		},
		link: {
			url: string,
			domain: string,
			preview: Preview
		},
		text: { selftext_html: string | undefined }
		video: { secure_media: SecureMedia },
	},
	bottom: { score: number, num_comments: number }
}





