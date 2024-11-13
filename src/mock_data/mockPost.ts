import { Comment } from './mockComment';

export interface Post {
    subject: string;
    message: string;
    comments: Comment[];
    username: string;
    avatar: string;
    timestamp: string;
    attachedFiles: File | null;
}

