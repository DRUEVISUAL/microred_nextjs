import SubredditData from '@/lib/subredditType';

export default function createSubredditObject(subreddit: SubredditData) {
	// String
	const { icon_img, description_html, title, banner_img } = subreddit.data;

	// Number
	const { subscribers, banner_size } = subreddit.data;

	return {
		string: { icon_img, description_html, title, banner_img },
		number: { subscribers, banner_size },
	};
}
