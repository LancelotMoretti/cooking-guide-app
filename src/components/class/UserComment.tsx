import { UserProfileLink } from "./UserProfileLink";

interface UserCommentProps {
    user: UserProfileLink;
    date: string;
    content: string;
    reply?: UserComment;
}

export class UserComment implements UserCommentProps {
    constructor(
        public user: UserProfileLink,
        public date: string,
        public content: string,
        public reply?: UserComment
    ) {}

    private clickUserProfile() {
        this.user.navigateToUserProfile();
    }

    private deleteComment() {
        this.content = '';
    }

    private editComment(newContent: string) {
        this.content = newContent;
    }

    private replyToComment() {
        // reply to comment
    }
}