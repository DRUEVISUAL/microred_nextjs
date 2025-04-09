export function calculatePostAge(epoch: number): string {
	const age = new Date(epoch * 1000);
	const now = new Date();

	const diffInSeconds = Math.floor((now.getTime() - age.getTime()) / 1000);
	const minutes = Math.floor(diffInSeconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = (now.getFullYear() - age.getFullYear()) * 12 + now.getMonth() - age.getMonth();
	const years = now.getFullYear() - age.getFullYear();

	if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
	if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
	if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
	if (years === 0) return `${months} mo${months === 1 ? '' : 's'} ago`;
	return `'${String(age.getFullYear()).slice(-2)}`;
}
