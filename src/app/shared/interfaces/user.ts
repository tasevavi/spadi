import { Post } from "./post";

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    locationCity: string;
    posts: Post[];
}
