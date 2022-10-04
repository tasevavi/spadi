import { User } from "./user";

export interface Post {
    _id: string;
    title: string;
    category: string;
    description: string;
    count: number;
    location: string;
    itemImage: string;
    owner: User;
    claimed: boolean; 
    claimedBy: string[]; 
    createdAt: string;
    __v: number;
}
