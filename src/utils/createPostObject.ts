import { FullRedditPost } from "@/lib/redditPostTypes";
import { ConstructedRedditPost } from "@/lib/types";

////////////////////////////////////////////////////////////////////////////////

export default function createPostObject(post: FullRedditPost): ConstructedRedditPost {

    // String
    const { subreddit_name_prefixed, subreddit_id, title, selftext_html, post_hint, author, permalink, is_gallery, url_overridden_by_dest, domain, id, url } = post.data

    // Number
    const { thumbnail_height, thumbnail_width, score, created_utc, num_comments } = post.data

    // Complex
    const { secure_media } = post.data
    const { media_metadata } = post.data
    const { preview } = post.data

    return {
        id,
        top: { subreddit_name_prefixed, subreddit_id, title, author, created_utc, permalink },
        content: {
            post_hint,
            image: {
                is_gallery,
                media_metadata,
                url,
                title,
                subreddit_name_prefixed
            },
            video: {
                secure_media
            },
            link: {
                url,
                domain,
                preview
            },
            text: {
                selftext_html
            }
        },
        bottom: { score, num_comments }
    }
}