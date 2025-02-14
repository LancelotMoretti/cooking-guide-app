interface UserProfileLinkProps {
    accountID: string;
    username: string;

    navigateToUserProfile(): void;
}

export class UserProfileLink implements UserProfileLinkProps {
    constructor(
        public accountID: string,
        public username: string
    ) {}

    navigateToUserProfile() {
        // Implementation for navigating to user profile
    }
}