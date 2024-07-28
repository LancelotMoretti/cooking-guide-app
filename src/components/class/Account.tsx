interface AccountProps {
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