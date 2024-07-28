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

    replyToComment() {
        // reply to comment
    }

    editComment(newContent: string) {
        this.content = newContent;
    }

    deleteComment() {
        this.content = '';
    }

    clickUserProfile() {
        this.user.navigateToUserProfile();
    }
}