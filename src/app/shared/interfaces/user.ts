import { Post } from "./post";

export interface User {
    _id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    locationCity: string | null;
    posts: Post[];
}
