// Types
import SubredditData from '@/lib/subredditType';

// Utilities
import ampersandConverter from './convertToAmpersand';

////////////////////////////////////////////////////////////////////////////////

export default function createSearchResultObject(data: SubredditData[]) {
	const searchResults = data.map((res) => {
		const { display_name, url } = res.data;
		const icon_img =
			ampersandConverter(res?.data?.icon_img) ?? ampersandConverter(res?.data?.community_icon);
		return { display_name, url, icon_img };
	});
	return searchResults;
}
