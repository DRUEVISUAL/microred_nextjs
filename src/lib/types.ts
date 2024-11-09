export type PostContentShape = {
	subReddit: {
		label: string;
		imgSrc: string;
	};
	title: string;
	creator: string;
	time: string;
	content: string;
	likeCount: number;
	commentCount: number;
};
