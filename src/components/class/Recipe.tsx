import { UserComment } from '@/components/class/UserComment';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface RecipeProps {
    recipeID: string;
    userID: string;
    title: string;
    description: string;
    date: Date;
    duration: number;
    ingredients: {name: string, amount: string}[];
    steps: string[];
    tags: string[];
    rating: Float;
    status: 'Pending' | 'Approved' | 'Declined';
    comments: UserComment[];
    video?: any;
}

export class Recipe {
    recipeID: string;
    userID: string;
    title: string;
    description: string;
    date: Date;
    duration: number;
    ingredients: {name: string, amount: string}[];
    steps: string[];
    tags: string[];
    rating: Float;
    status: 'Pending' | 'Approved' | 'Declined';
    comments: UserComment[];
    video?: any;

    constructor(props: RecipeProps) {
        this.recipeID = props.recipeID;
        this.userID = props.userID;
        this.title = props.title;
        this.description = props.description;
        this.date = props.date;
        this.duration = props.duration;
        this.ingredients = props.ingredients;
        this.steps = props.steps;
        this.tags = props.tags;
        this.rating = props.rating;
        this.status = props.status;
        this.comments = props.comments;
        this.video = props.video;
    }

    getRecipeID(): string {
        return this.recipeID;
    }

    getUserID(): string {
        return this.userID;
    }
}