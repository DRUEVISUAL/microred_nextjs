// Components
import Icon from '../Icon';
import { VoteState } from './PostBottom';

// Utilities
import { cn } from '@/lib/utils';

////////////////////////////////////////////////////////////////////////////////

type VoteButtonProps = {
	type: 'upVote' | 'downVote';
	voteState: VoteState;
	handleClickVote: (value: VoteState) => void;
	className?: string;
};

export default function VoteButton({
	type,
	voteState,
	handleClickVote,
	className,
}: VoteButtonProps) {
	return (
		<button
			onClick={() => handleClickVote(type)}
			className={cn(
				'focused z-10 cursor-pointer rounded p-2',
				voteState === type && 'bg-black/10',
				className,
			)}
		>
			<Icon
				name={voteState === type ? 'voted' : 'not_voted'}
				className={cn('noninteractive scale-[2.25]', type === 'downVote' && 'rotate-180')}
			/>
		</button>
	);
}
