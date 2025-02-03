'use client';

// Types
import { ConstructedRedditPost } from '@/lib/types';

// Components
import VoteButton from './VoteButton';
import Icon from '../Icon';

// Hooks
import { useState } from 'react';

////////////////////////////////////////////////////////////////////////////////

type PostBottomProps = { post: ConstructedRedditPost };

export type VoteState = null | 'upVote' | 'downVote';

export default function PostBottom({ post }: PostBottomProps) {
	const { score, num_comments } = post.bottom;

	const [voteState, setVoteState] = useState<VoteState>(null);

	const scoreCounter =
		voteState === null
			? score
			: voteState === 'upVote'
				? score + 1
				: voteState === 'downVote' && score - 1;

	const handleClickVote = (value: VoteState) => {
		setVoteState((prevState) => (prevState === null ? value : prevState === value ? null : value));
	};

	return (
		<footer className="flex items-center justify-between rounded-lg border-px bg-card-layer text-sm shadow-xs">
			<div className="flex items-center">
				<VoteButton
					type="upVote"
					voteState={voteState}
					handleClickVote={handleClickVote}
				/>
				<div className="h-full border-x-px border-card-layer-2 px-2 font-mono text-xs font-medium">
					{scoreCounter}
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
				{num_comments} Comment
			</button>
		</footer>
	);
}
