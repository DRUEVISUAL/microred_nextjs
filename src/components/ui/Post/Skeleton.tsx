import { Loader2 } from 'lucide-react';

////////////////////////////////////////////////////////////////////////////////

export default function Skeleton() {
	return (
		<div className="grid h-[90vh] w-full animate-pulse place-content-center rounded-lg bg-white/10 text-4xl text-white lg:max-w-screen-md">
			<Loader2 className="size-12 animate-spin" />
		</div>
	);
}
