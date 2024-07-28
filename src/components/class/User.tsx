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

    addFollower(followerID: string): void {
        this.followers.push(followerID);
    }

    addFollowing(followingID: string): void {
        this.following.push(followingID);
    }

    addNotification(notification: Notification): void {
        this.notifications.push(notification);
    }

    addRecipe(recipeID: string): void {
        this.recipesID.push(recipeID);
    }

    addSavedRecipe(recipeID: string): void {
        this.savedRecipesID.push(recipeID);
    }

    changeUserType(newUserType: 'Free' | 'Premium'): void {
        this.userType = newUserType;
    }

    getFollowers(): string[] {
        return this.followers;
    }

    getFollowing(): string[] {
        return this.following;
    }

    getNotifications(): string[] {
        return this.notifications.map(notif => notif.getNotificationID());
    }

    getRecipesID(): string[] {
        return this.recipesID;
    }

    getSavedRecipesID(): string[] {
        return this.savedRecipesID;
    }

    getUserType(): 'Free' | 'Premium' {
        return this.userType;
    }

    removeFollower(followerID: string): void {
        this.followers = this.followers.filter(id => id !== followerID);
    }

    removeFollowing(followingID: string): void {
        this.following = this.following.filter(id => id !== followingID);
    }

    removeNotification(notification: Notification): void {
        this.notifications = this.notifications.filter(notif => notif !== notification);
    }

    removeRecipe(recipeID: string): void {
        this.recipesID = this.recipesID.filter(id => id !== recipeID);
    }

    removeSavedRecipe(recipeID: string): void {
        this.savedRecipesID = this.savedRecipesID.filter(id => id !== recipeID);
    }
}