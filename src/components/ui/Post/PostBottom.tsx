'use client';

// Types
import { PostContentSchema } from '@/lib/types';

// Components
import VoteButton from './VoteButton';
import Icon from '../Icon';

// Hooks
import { useState } from 'react';

////////////////////////////////////////////////////////////////////////////////

type PostBottomProps = { post: PostContentSchema };

export type VoteState = null | 'upVote' | 'downVote';

export default function PostBottom({ post }: PostBottomProps) {
	const { likeCount, commentCount } = post;

	const [voteState, setVoteState] = useState<VoteState>(null);

	const likeCounter =
		voteState === null
			? likeCount
			: voteState === 'upVote'
				? likeCount + 1
				: voteState === 'downVote' && likeCount - 1;

	const handleClickVote = (value: VoteState) => {
		setVoteState((prevState) => (prevState === null ? value : prevState === value ? null : value));
	};

	return (
		<footer className="flex items-center justify-between rounded-lg border-px bg-card-layer text-sm shadow-sm">
			<div className="flex items-center">
				<VoteButton
					type="upVote"
					voteState={voteState}
					handleClickVote={handleClickVote}
				/>
				<div className="h-full border-x-px border-card-layer-2 px-2 font-mono text-xs font-medium">
					{likeCounter}
				</div>
				<VoteButton
					type="downVote"
					voteState={voteState}
					handleClickVote={handleClickVote}
				/>
			</div>

			<button className="focused flex items-center gap-2 p-2">
				<Icon
					name="comment"
					className="size-3"
				/>
				{commentCount} Comment
			</button>
		</footer>
	);
}
