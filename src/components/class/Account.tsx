export interface AccountProps {
    accountID: string;
    username: string;
    email: string;
    password: string;
    type: 'User' | 'Admin' | 'Moderator';
}

export class Account {
    accountID: string;
    username: string;
    email: string;
    password: string;
    type: 'User' | 'Admin' | 'Moderator';

    constructor(props: AccountProps) {
        this.accountID = props.accountID;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.type = props.type;
    }

    getAccountID(): string {
        return this.accountID;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getType(): 'User' | 'Admin' | 'Moderator' {
        return this.type;
    }

    changePassword(newPassword: string): void {
        this.password = newPassword;
    }

    changeEmail(newEmail: string): void {
        this.email = newEmail;
    }

    changeUsername(newUsername: string): void {
        this.username = newUsername;
    }

    changeType(newType: 'User' | 'Admin' | 'Moderator'): void {
        this.type = newType;
    }

    deleteAccount(): void {
        this.accountID = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.type = 'User';
    }

    createAccount(): void {
        // Create account
    }
}