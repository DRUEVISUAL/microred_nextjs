import createPostObject from "@/utils/createPostObject";
import { MediaMetadata, PostHint, Preview, SecureMedia } from "./redditPostTypes";

////////////////////////////////////////////////////////////////////////////////

export type Feed = 'top' | 'best' | 'new' | 'hot'

export type ConstructedRedditPost = ReturnType<typeof createPostObject>





