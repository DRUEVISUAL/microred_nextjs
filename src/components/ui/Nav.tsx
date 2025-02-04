'use client';

// Components
import Link from 'next/link';
import Image from 'next/image';
import NavContent from './NavContent';

// Utilities
import { cn } from '@/lib/utils';
import createSearchResultObject from '@/utils/createSearchResultObject';

// Hooks
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';

// Image
import logo from '../../../public/assets/svg/logo.svg';
import { Menu, X } from 'lucide-react';

////////////////////////////////////////////////////////////////////////////////

export default function Nav() {
	const pathname = usePathname().split('/')[1];
	const [isDesktopNavHidden, setIsDesktopNavHidden] = useState(true);
	const [isPhoneNavHiddenOnScroll, setIsPhoneNavHiddenOnScroll] = useState(false);
	const [isPhoneNavHidden, setIsPhoneNavHidden] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue);
	const prevScrollY = useRef(0);

	const query = useQuery({
		queryKey: ['search', debouncedSearchValue],
		queryFn: async () => {
			const response = await fetch(
				`https://www.reddit.com/search.json?q=${debouncedSearchValue}&type=sr`,
			);
			const responseJSON = await response.json();
			const searchResults = createSearchResultObject(responseJSON.data.children);
			return searchResults;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: 0,
	});

	const handleSearchInput = (value: string) => setSearchValue(value);

	function handleClickHidePhoneMenu() {
		setIsPhoneNavHidden((prev) => !prev);
	}

	useEffect(() => {
		setIsDesktopNavHidden(pathname === '');
	}, [pathname]);

	const handleResize = useCallback(() => {
		if (window.innerWidth >= 1024) setIsPhoneNavHidden(true);
	}, []);

	const handleScroll = useCallback(() => {
		const currentScrollY = window.scrollY;
		setIsPhoneNavHiddenOnScroll(currentScrollY > prevScrollY.current);
		prevScrollY.current = currentScrollY;
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleResize, handleScroll]);

	useEffect(() => {
		const overlay = document.createElement('div');
		overlay.classList.add('bodyOverlay');
		overlay.addEventListener('click', handleClickHidePhoneMenu);

		if (!isPhoneNavHidden) {
			document.body.style.overflow = 'hidden';
			document.body.appendChild(overlay);
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			window.removeEventListener('click', handleClickHidePhoneMenu);
			if (document.body.contains(overlay)) {
				document.body.removeChild(overlay);
			}
		};
	}, [isPhoneNavHidden]);

	////////////////////////////////////////////////////////////////////////////////

	return (
		<>
			<nav
				className={cn(
					'lg:bg-card-layer/50 bg-card-layer/70 fixed top-0 left-0 z-50 flex h-max w-screen flex-col items-center gap-8 p-4 backdrop-blur-lg transition-transform delay-100 duration-500 ease-in-out lg:h-full lg:w-64 lg:p-2',
					isDesktopNavHidden && '-translate-x-full',
					isPhoneNavHiddenOnScroll && '-translate-y-full lg:translate-y-0',
				)}
				aria-label="Sidebar navigation"
			>
				<Link
					href={'/'}
					className="flex items-center gap-2 text-2xl font-semibold hover:animate-pulse lg:mt-6 lg:text-3xl"
					aria-label="Microred homepage"
				>
					<Image
						src={logo}
						alt="Microred logo"
						className="size-7 lg:size-10"
					/>
					Microred
				</Link>

				<div className="hidden lg:block">
					<NavContent
						searchValue={searchValue}
						handleSearchInput={handleSearchInput}
						query={query}
						pathname={pathname}
					/>
				</div>
			</nav>

			{/* Phone menu */}
			<menu
				className={cn(
					'border-border fixed bottom-0 left-0 z-50 w-screen border-t-[1px] transition-transform duration-500 ease-in-out will-change-transform lg:hidden',
					isPhoneNavHidden ? 'translate-y-[100%-64px]' : 'translate-y-[0px]',
				)}
				aria-label="Mobile navigation"
			>
				<button
					className="bg-primary absolute -top-12 right-2 z-[60] grid w-max place-content-center rounded-full focus:ring-2 focus:ring-white focus:outline-none"
					onClick={handleClickHidePhoneMenu}
					aria-label={isPhoneNavHidden ? 'Open menu' : 'Close menu'}
				>
					{isPhoneNavHidden ? <Menu className="size-9 p-1.5" /> : <X className="size-9 p-1.5" />}
				</button>

				<div
					className="bg-card-layer/90 flex h-full w-full flex-col gap-4 p-2 backdrop-blur-xl"
					aria-hidden={isPhoneNavHidden}
				>
					<NavContent
						searchValue={searchValue}
						handleSearchInput={handleSearchInput}
						query={query}
						pathname={pathname}
						handleClickHidePhoneMenu={handleClickHidePhoneMenu}
					/>
				</div>
			</menu>
		</>
	);
}
