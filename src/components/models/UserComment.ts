import { UserProfileLink } from './UserProfileLink';

interface UserCommentProps {
    user: UserProfileLink;
    date: string;
    content: string;
    reply?: UserComment[];
}

export class UserComment implements UserCommentProps {
    constructor(
        public user: UserProfileLink,
        public date: string,
        public content: string,
        public reply?: UserComment[]
    ) {}

    clickUserProfile() {
        this.user.navigateToUserProfile();
    }

    deleteComment() {
        this.content = '';
    }

    editComment(newContent: string) {
        this.content = newContent;
    }

    replyToComment(replyContent: string) {
        this.reply?.push(new UserComment(this.user, new Date().toISOString(), replyContent));
    }
}