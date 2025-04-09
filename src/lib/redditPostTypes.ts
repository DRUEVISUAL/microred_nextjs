export interface RedditResponse {
	kind: string;
	data: {
		after: string;
		dist: number;
		modhash: string;
		geo_filter: any;
		children: FullRedditPost[];
		before?: string;
	};
}

export interface FullRedditPost {
	kind: string;
	data: {
		approved_at_utc: any;
		subreddit: string;
		selftext: string;
		author_fullname: string;
		saved: boolean;
		mod_reason_title: any;
		gilded: number;
		clicked: boolean;
		title: string;
		link_flair_richtext: LinkFlairRichtext[];
		subreddit_name_prefixed: string;
		hidden: boolean;
		pwls?: number;
		link_flair_css_class?: string;
		downs: number;
		thumbnail_height: number;
		top_awarded_type: any;
		hide_score: boolean;
		name: string;
		quarantine: boolean;
		link_flair_text_color?: string;
		upvote_ratio: number;
		author_flair_background_color?: string;
		subreddit_type: string;
		ups: number;
		total_awards_received: number;
		media_embed: MediaEmbed;
		thumbnail_width: number;
		author_flair_template_id?: string;
		is_original_content: boolean;
		user_reports: any[];
		secure_media?: SecureMedia;
		is_reddit_media_domain: boolean;
		is_meta: boolean;
		category: any;
		secure_media_embed: SecureMediaEmbed;
		link_flair_text?: string;
		can_mod_post: boolean;
		score: number;
		approved_by: any;
		is_created_from_ads_ui: boolean;
		author_premium: boolean;
		thumbnail: string;
		edited: boolean;
		author_flair_css_class?: string;
		author_flair_richtext: AuthorFlairRichtext[];
		gildings: unknown;
		post_hint: PostHint;
		content_categories?: string[];
		is_self: boolean;
		mod_note: any;
		created: number;
		link_flair_type: string;
		wls?: number;
		removed_by_category: any;
		banned_by: any;
		author_flair_type: string;
		domain: string;
		allow_live_comments: boolean;
		selftext_html?: string;
		likes: any;
		suggested_sort?: string;
		banned_at_utc: any;
		url_overridden_by_dest: string;
		view_count: any;
		archived: boolean;
		no_follow: boolean;
		is_crosspostable: boolean;
		pinned: boolean;
		over_18: boolean;
		preview?: Preview;
		all_awardings: any[];
		awarders: any[];
		media_only: boolean;
		can_gild: boolean;
		spoiler: boolean;
		locked: boolean;
		author_flair_text?: string;
		treatment_tags: any[];
		visited: boolean;
		removed_by: any;
		num_reports: any;
		distinguished: any;
		subreddit_id: string;
		author_is_blocked: boolean;
		mod_reason_by: any;
		removal_reason: any;
		link_flair_background_color?: string;
		id: string;
		is_robot_indexable: boolean;
		report_reasons: any;
		author: string;
		discussion_type: any;
		num_comments: number;
		send_replies: boolean;
		contest_mode: boolean;
		mod_reports: any[];
		author_patreon_flair: boolean;
		author_flair_text_color?: string;
		permalink: string;
		stickied: boolean;
		url: string;
		subreddit_subscribers: number;
		created_utc: number;
		num_crossposts: number;
		media?: Media;
		is_video: boolean;
		link_flair_template_id?: string;
		is_gallery?: boolean;
		media_metadata?: MediaMetadata;
		gallery_data?: GalleryData;
	};
}

export type MediaMetadata =
	| {
			[key: string]: {
				status: string;
				e: string;
				m: string;
				p: Array<{
					y: number;
					x: number;
					u: string;
				}>;
				s: {
					y: number;
					x: number;
					u: string;
				};
				id: string;
			};
	  }
	| undefined;

export type PostHint = 'image' | 'hosted:video' | 'rich:video' | 'link';

interface LinkFlairRichtext {
	e: string;
	t?: string;
	a?: string;
	u?: string;
}

interface MediaEmbed {
	content?: string;
	width?: number;
	scrolling?: boolean;
	height?: number;
}

export type SecureMedia =
	| {
			reddit_video?: RedditVideo;
			type?: string;
			oembed?: Oembed;
	  }
	| undefined;

interface RedditVideo {
	bitrate_kbps: number;
	fallback_url: string;
	has_audio: boolean;
	height: number;
	width: number;
	scrubber_media_url: string;
	dash_url: string;
	duration: number;
	hls_url: string;
	is_gif: boolean;
	transcoding_status: string;
}

interface Oembed {
	provider_url: string;
	description: string;
	title: string;
	type: string;
	thumbnail_width: number;
	height: number;
	width: number;
	html: string;
	version: string;
	provider_name: string;
	thumbnail_url: string;
	thumbnail_height: number;
}

interface SecureMediaEmbed {
	content?: string;
	width?: number;
	scrolling?: boolean;
	media_domain_url?: string;
	height?: number;
}

interface AuthorFlairRichtext {
	a?: string;
	e: string;
	u?: string;
	t?: string;
}

export type Preview =
	| {
			images: Image[];
			enabled: boolean;
	  }
	| undefined;

interface Image {
	source: Source;
	resolutions: Resolution[];
	variants: unknown;
	id: string;
}

interface Source {
	url: string;
	width: number;
	height: number;
}

interface Resolution {
	url: string;
	width: number;
	height: number;
}

interface Media {
	reddit_video?: RedditVideo2;
	type?: string;
	oembed?: Oembed2;
}

interface RedditVideo2 {
	bitrate_kbps: number;
	fallback_url: string;
	has_audio: boolean;
	height: number;
	width: number;
	scrubber_media_url: string;
	dash_url: string;
	duration: number;
	hls_url: string;
	is_gif: boolean;
	transcoding_status: string;
}

interface Oembed2 {
	provider_url: string;
	description: string;
	title: string;
	type: string;
	thumbnail_width: number;
	height: number;
	width: number;
	html: string;
	version: string;
	provider_name: string;
	thumbnail_url: string;
	thumbnail_height: number;
}

export type GalleryData =
	| {
			items: Item[];
	  }
	| undefined;

interface Item {
	caption?: string;
	media_id: string;
	id: number;
}
