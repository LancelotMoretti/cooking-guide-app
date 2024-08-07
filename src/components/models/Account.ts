export interface AccountProps {
    accountID: string;
    username: string;
    email: string;
    password: string;
    type: 'User' | 'Admin' | 'Moderator';

    getAccountID(): string;
    getUsername(): string;
    getEmail(): string;
    getPassword(): string;
    getType(): 'User' | 'Admin' | 'Moderator';

    changePassword(newPassword: string): void;
    changeEmail(newEmail: string): void;
    changeUsername(newUsername: string): void;
    changeType(newType: 'User' | 'Admin' | 'Moderator'): void;
    
    deleteAccount(): void;
    createAccount(): void;
}

export class Account implements AccountProps {
    constructor(
        public accountID: string,
        public username: string,
        public email: string,
        public password: string,
        public type: 'User' | 'Admin' | 'Moderator'
    ) {}

    changeEmail(newEmail: string): void {
        this.email = newEmail;
    }

    changePassword(newPassword: string): void {
        this.password = newPassword;
    }

    changeType(newType: 'User' | 'Admin' | 'Moderator'): void {
        this.type = newType;
    }

    changeUsername(newUsername: string): void {
        this.username = newUsername;
    }

    createAccount(): void {
        // Implementation for account creation
    }

    deleteAccount(): void {
        // Implementation for account deletion
        this.accountID = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.type = 'User';
    }

    getAccountID(): string {
        return this.accountID;
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

    getUsername(): string {
        return this.username;
    }
}