interface UserCommentProps {
    userID: string;
    date: string;
    content: string;
    reply?: UserComment;
}

export class UserComment implements UserCommentProps {
    constructor(
        public userID: string,
        public date: string,
        public content: string,
        public reply?: UserComment
    ) {}

    getUserID(): string {
        return this.userID;
    }
}