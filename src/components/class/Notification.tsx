interface NotificationProps {
    notificationID: string;
    recipeID: string;
    date: string;
    content: string;
    read: boolean;
}

export class Notification {
    notificationID: string;
    recipeID: string;
    date: string;
    content: string;
    read: boolean;

    constructor(props: NotificationProps) {
        this.notificationID = props.notificationID;
        this.recipeID = props.recipeID;
        this.date = props.date;
        this.content = props.content;
        this.read = props.read;
    }

    getNotificationID(): string {
        return this.notificationID;
    }

    getRecipeID(): string {
        return this.recipeID;
    }

    getDate(): string {
        return this.date;
    }

    getContent(): string {
        return this.content;
    }

    isRead(): boolean {
        return this.read;
    }

    markAsRead(): void {
        this.read = true;
    }
}