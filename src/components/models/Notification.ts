interface NotificationProps {
    notificationID: string;
    recipeID: string;
    date: string;
    content: string;
    read: boolean;

    getNotificationID(): string;
    getRecipeID(): string;
    getDate(): string;
    getContent(): string;
    
    isRead(): boolean;
    markAsRead(): void;
}

export class Notification implements NotificationProps {
    constructor(
        public notificationID: string,
        public recipeID: string,
        public date: string,
        public content: string,
        public read: boolean
    ) {}

    static fromPlainObject(data: any): Notification {
        return new Notification(data.notificationID, data.recipeID, data.date, data.content, data.read);
    }

    getContent(): string {
        return this.content;
    }

    getDate(): string {
        return this.date;
    }

    getNotificationID(): string {
        return this.notificationID;
    }

    getRecipeID(): string {
        return this.recipeID;
    }

    isRead(): boolean {
        return this.read;
    }

    markAsRead(): void {
        this.read = true;
    }
}