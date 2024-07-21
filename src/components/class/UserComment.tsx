interface UserCommentProps {
    userID: string;
    date: string;
    content: string;
    reply?: UserComment;
}

export class UserComment {
    userID: string;
    date: string;
    content: string;
    reply?: UserComment;

    constructor(props: UserCommentProps) {
        this.userID = props.userID;
        this.date = props.date;
        this.content = props.content;
        this.reply = props.reply ? props.reply : undefined;
    }

    getUserID(): string {
        return this.userID;
    }
}