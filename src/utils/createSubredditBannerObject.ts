// Types
import SubredditData from '@/lib/subredditType';

// Utilities
import ampersandConverter from './convertToAmpersand';
import formatNumberAffix from './formatNumberAffix';

export default function createSubredditBannerObject(data: SubredditData['data']) {
	const keyColor = data?.key_color ?? '#ffffff';
	const size = data?.banner_size ?? [2048, 512];
	const backgroundColor = data?.banner_background_color ?? '#ffffff';
	const subreddit = data?.display_name_prefixed ?? 'missing';
	const subscribers = formatNumberAffix(data?.subscribers ?? 0);

	const iconImg = ampersandConverter(data?.icon_img) ?? ampersandConverter(data?.community_icon);
	const banner =
		ampersandConverter(data?.banner_background_image) ??
		ampersandConverter(data?.mobile_banner_image) ??
		ampersandConverter(data?.banner_img);

	return { keyColor, size, backgroundColor, subreddit, subscribers, iconImg, banner };
}
