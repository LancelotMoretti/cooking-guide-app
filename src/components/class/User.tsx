import { Account, AccountProps } from "./Account";

interface UserProps extends AccountProps {
    userType: 'Free' | 'Premium';
    recipesID: string[];
    savedRecipesID: string[];
    notifications: string[];
    followers: string[];
    following: string[];
}

export class User extends Account {
    userType: 'Free' | 'Premium';
    recipesID: string[];
    savedRecipesID: string[];
    notifications: string[];
    followers: string[];
    following: string[];

    constructor(props: UserProps) {
        super(props);
        this.userType = props.userType;
        this.recipesID = props.recipesID;
        this.savedRecipesID = props.savedRecipesID;
        this.notifications = props.notifications;
        this.followers = props.followers;
        this.following = props.following;
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
        return this.notifications;
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

    addNotification(notification: string): void {
        this.notifications.push(notification);
    }

    removeNotification(notification: string): void {
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