// Components
import Icon from './Icon';

////////////////////////////////////////////////////////////////////////////////

type SearchProps = { value: string; handleSearchInput: (value: string) => void };

export default function Search({ value, handleSearchInput }: SearchProps) {
	return (
		<div className="focus-within:outline-primary flex rounded-lg shadow-xs focus-within:outline">
			<input
				type="text"
				placeholder="Search"
				aria-label="Search for subreddit"
				value={value}
				onInput={(e) => handleSearchInput(e.currentTarget.value)}
				className="border-px bg-input bg-search placeholder:text-muted-foreground w-full rounded-l-lg border-r-0 bg-[8px] bg-no-repeat px-2 py-1 pl-8 outline-0 focus:outline-0"
			/>
			<button
				aria-label="Clear search"
				className="border-px bg-input focus:bg-card-layer-2 focus:outline-primary h-full w-max cursor-pointer rounded-r-lg border-l-0 p-2 hover:bg-white/15 focus:outline active:scale-90"
				onClick={() => handleSearchInput('')}
			>
				<Icon name="close" />
			</button>
		</div>
	);
}
