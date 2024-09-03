import { UserProfileLink } from './UserProfileLink';

export class UserComment {
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

    replyToComment(replyContent: string): void {
        if (!this.reply) {
            this.reply = [];
        }
        this.reply.push(new UserComment(this.user, new Date().toISOString(), replyContent));
    }

    toPlainObject(): any {
        return {
            user: {
                accountID: this.user.accountID,
                username: this.user.username
            },
            date: this.date,
            content: this.content,
            reply: this.reply ? this.reply.map(reply => reply.toPlainObject()) : []
        };
    }
}
