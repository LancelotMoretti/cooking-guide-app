import { Account } from "./Account";
import { Notification } from "./Notification";

interface UserProps extends Account {
    userType: 'Free' | 'Premium';
    recipesID: string[];
    savedRecipesID: string[];
    notifications: Notification[];
    followers: string[];
    following: string[];

    getUserType(): 'Free' | 'Premium';
    getRecipesID(): string[];
    getSavedRecipesID(): string[];
    getNotifications(): string[];
    getFollowers(): string[];
    getFollowing(): string[];

    changeUserType(newUserType: 'Free' | 'Premium'): void;

    addRecipe(recipeID: string): void;
    removeRecipe(recipeID: string): void;

    addSavedRecipe(recipeID: string): void;
    removeSavedRecipe(recipeID: string): void;

    addNotification(notification: Notification): void;
    removeNotification(notification: Notification): void;
    
    addFollower(followerID: string): void;
    removeFollower(followerID: string): void;
    
    addFollowing(followingID: string): void;
    removeFollowing(followingID: string): void;
}

export class User extends Account implements UserProps {
    constructor(
        accountID: string,
        username: string,
        email: string,
        password: string,
        type: 'User' | 'Admin' | 'Moderator',
        public userType: 'Free' | 'Premium',
        public recipesID: string[],
        public savedRecipesID: string[],
        public notifications: Notification[],
        public followers: string[],
        public following: string[]
    ) {
        super(accountID, username, email, password, type);
    }

    getUserType(): 'Free' | 'Premium' {
        return this.userType;
    }

    getRecipesID(): string[] {
        return this.recipesID;
    }

    getSavedRecipesID(): string[] {
        return this.savedRecipesID;
    }

    getNotifications(): string[] {
        return this.notifications.map(notif => notif.getNotificationID());
    }

    getFollowers(): string[] {
        return this.followers;
    }

    getFollowing(): string[] {
        return this.following;
    }

    changeUserType(newUserType: 'Free' | 'Premium'): void {
        this.userType = newUserType;
    }

    addRecipe(recipeID: string): void {
        this.recipesID.push(recipeID);
    }

    removeRecipe(recipeID: string): void {
        this.recipesID = this.recipesID.filter(id => id !== recipeID);
    }

    addSavedRecipe(recipeID: string): void {
        this.savedRecipesID.push(recipeID);
    }

    removeSavedRecipe(recipeID: string): void {
        this.savedRecipesID = this.savedRecipesID.filter(id => id !== recipeID);
    }

    addNotification(notification: Notification): void {
        this.notifications.push(notification);
    }

    removeNotification(notification: Notification): void {
        this.notifications = this.notifications.filter(notif => notif !== notification);
    }

    addFollower(followerID: string): void {
        this.followers.push(followerID);
    }

    removeFollower(followerID: string): void {
        this.followers = this.followers.filter(id => id !== followerID);
    }

    addFollowing(followingID: string): void {
        this.following.push(followingID);
    }

    removeFollowing(followingID: string): void {
        this.following = this.following.filter(id => id !== followingID);
    }
}