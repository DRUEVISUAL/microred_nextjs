// Components
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/shadcn/carousel';

import ReactPlayer from 'react-player';
import Link from 'next/link';
import Image from 'next/image';

// Types
import { ConstructedRedditPost } from '@/lib/types';

// Hooks
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Images
import { ExternalLink } from 'lucide-react';

// Utilities
import { cn } from '@/lib/utils';
import { decode } from 'html-entities';
import { parseDocument } from 'htmlparser2';

////////////////////////////////////////////////////////////////////////////////

type PostContentProps = { post: ConstructedRedditPost };

export default function PostContent({ post }: PostContentProps) {
	const { ref, inView } = useInView({ rootMargin: '-256px 0px -256px 0px' });
	const postHint = post.content.post_hint;
	const isGallery = post.content.image.is_gallery;
	let content;

	if (isGallery === true) {
		const [api, setApi] = useState<CarouselApi>();
		const [current, setCurrent] = useState(0);
		const [count, setCount] = useState(0);

		content = post.content?.image;
		const alt = content.subreddit_name_prefixed + ' ' + content.title;
		const media_metadata = content.media_metadata && Object.values(content.media_metadata);
		if (!media_metadata) return;
		const imageIndexArray = Array.from(Array(count).keys());

		let imgSrcs;

		if (media_metadata) {
			imgSrcs = media_metadata
				.map((media) => {
					if (!media.p) return;
					const i = Math.ceil(media.p.length / 2);
					return media?.p[i]?.u?.split('&amp;').join('&');
				})
				.filter((imgSrc) => imgSrc !== undefined);
		}
		if (!imgSrcs) return;

		useEffect(() => {
			if (!api) {
				return;
			}

			setCount(api.scrollSnapList().length);
			setCurrent(api.selectedScrollSnap() + 1);

			api.on('select', () => {
				setCurrent(api.selectedScrollSnap() + 1);
			});
		}, [api]);

		return (
			<section className="relative h-[75vh] max-h-[768px] min-h-[468px] rounded-lg border-px bg-card-layer/25 p-2 shadow-xs">
				<Carousel setApi={setApi}>
					<CarouselContent>
						{imgSrcs?.map((imgSrc, index) => {
							const key = alt + index + 'carousel_item';
							return (
								<CarouselItem key={key}>
									<img
										src={imgSrc}
										alt={alt}
										className="mx-auto h-[calc(75vh-18px)] max-h-[768px] min-h-[468px] w-full overflow-hidden rounded-md object-contain shadow-xs"
									/>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselPrevious className="translate-x-14" />
					<CarouselNext className="-translate-x-14" />
					<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-3">
						{imageIndexArray.map((imgIndex) => {
							const key = alt + imgIndex + 'dot';
							const isCurrent = imgIndex + 1 === current;
							return (
								<div
									key={key}
									onClick={() => api?.scrollTo(imgIndex)}
									className={cn(
										'size-2 cursor-pointer rounded-full ring-2 ring-black/50',
										isCurrent ? 'bg-white/80' : 'bg-black/50',
									)}
								></div>
							);
						})}
					</div>
				</Carousel>
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (postHint === 'image') {
		content = post.content.image;
		const alt = content.subreddit_name_prefixed + ' ' + content.title;

		return (
			<section className="relative h-[75vh] min-h-[468px] overflow-hidden rounded-lg border-px bg-card-layer/25 p-2 shadow-xs">
				<Image
					src={content.url}
					alt={alt}
					width={512}
					height={512}
					className="relative z-10 mx-auto h-full w-max rounded-md object-contain shadow-xs"
				/>
				<Image
					src={content.url}
					alt={alt}
					width={512}
					height={512}
					className="absolute left-0 top-0 h-full w-full object-cover opacity-20 blur-xl"
				/>
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (postHint === 'hosted:video') {
		content = post.content.video;
		const video = content.secure_media?.reddit_video;

		return (
			<section
				ref={ref}
				className="flex h-[75vh] min-h-[468px] items-center justify-center rounded-lg border-px bg-card-layer/25 p-2 shadow-xs"
			>
				<ReactPlayer
					url={video?.hls_url}
					controls
					width={'auto'}
					height={'100%'}
					style={{ borderRadius: 4, overflow: 'clip' }}
					playing={inView ? true : false}
					muted
				/>
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (post.content.text.selftext_html) {
		content = post.content.text.selftext_html;

		const decodedHtml = decode(content);

		return (
			<section className="flex max-h-[360px] markdown_style items-start justify-start overflow-y-scroll rounded-lg border-px bg-card-layer/25 p-2 shadow-xs">
				<div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (postHint === 'rich:video') {
		content = post.content.video;
		const encodedHtml = content.secure_media?.oembed?.html;

		if (!encodedHtml) return;

		const decodedHtml = decode(encodedHtml);
		const parsedDocument = parseDocument(decodedHtml);
		//@ts-ignore
		const { src, allow, referrerpolicy, title } = parsedDocument.children[0].attribs;

		return (
			<section className="flex h-[75vh] min-h-[468px] items-center justify-center rounded-lg border-px bg-card-layer/25 p-2 shadow-xs">
				<iframe
					className="h-full w-full rounded-md object-contain"
					width={320}
					height="468"
					src={src}
					allow={allow}
					referrerPolicy={referrerpolicy}
					allowFullScreen
					title={title}
				></iframe>
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (postHint === 'link') {
		content = post.content.link;

		const source = content.preview?.images[0].source;
		const imgSrc = source?.url.split('&amp;').join('&');
		const width = source?.width;
		const height = source?.height;

		return (
			<section className="h-max rounded-lg border-px bg-card-layer/25 p-2 shadow-xs grid place-content-center">
				<Link
					href={content.url}
					target="_blank"
					className="relative h-64 max-w-max rounded-md overflow-hidden hover:brightness-110 "
				>
					{imgSrc && (
						<Image
							src={imgSrc}
							alt={''}
							aria-hidden
							width={width}
							height={height}
							className="pointer-events-none mx-auto h-64 w-full object-cover rounded-md shadow-xs"
						/>
					)}

					<p className="absolute bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md border-px bg-black/30 p-1 text-lg font-semibold backdrop-blur-md">
						{content.domain} <ExternalLink className="size-4" />
					</p>
					{/* <div className="absolute bottom-0 left-0 z-50 h-16 w-full bg-black"></div> */}
				</Link>
			</section>
		);
	}

	////////////////////////////////////////////////////////////////////////////////

	if (!postHint && post.content.link.url) {
		content = post.content.link;

		return (
			<section className="h-max rounded-lg border-px bg-card-layer/25 p-2 shadow-xs">
				<Link
					href={content.url}
					target="_blank"
					className="relative z-50 mx-auto flex w-max items-center gap-2 rounded-md border-px bg-black/30 p-2 text-lg font-semibold backdrop-blur-md"
				>
					{content.domain} <ExternalLink className="size-4" />
				</Link>
			</section>
		);
	}
}
