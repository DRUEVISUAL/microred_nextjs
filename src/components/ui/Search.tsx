// Components
import Icon from './Icon';

////////////////////////////////////////////////////////////////////////////////

export default function Search() {
	return (
		<div className="flex rounded-lg focus-within:outline focus-within:outline-1 focus-within:outline-primary shadow-sm">
			<input
				type="text"
				placeholder="Search"
				aria-label="Search for subreddit"
				className="bg-search w-full rounded-l-lg border-px border-r-0 bg-input bg-[8px] bg-no-repeat px-2 py-1 pl-8 outline-0 placeholder:text-muted-foreground focus:outline-0"
			/>
			<button
				aria-label="Clear search"
				className="h-full w-max rounded-r-lg border-px border-l-0 bg-input p-2 focus:outline focus:outline-1 focus:bg-card-layer-2 focus:outline-primary"
			>
				<Icon name="close" />
			</button>
		</div>
	);
}
