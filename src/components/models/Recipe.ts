import { UserComment } from '@/components/models/UserComment';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface RecipeProps {
    recipeID: string;
    userID: string;
    title: string;
    description: string;
    date: Date;
    duration: number;
    ingredients: { name: string, amount: string }[];
    steps: string[];
    tags: string[];
    rating: Float;
    status: 'Pending' | 'Approved' | 'Declined';
    comments: UserComment[];
    video?: any;

    getRecipeID(): string;
    getUserID(): string;
    toPlainObject(): object;
}

export class Recipe implements RecipeProps {
    constructor(
        public recipeID: string,
        public userID: string,
        public title: string,
        public description: string,
        public date: Date,
        public duration: number,
        public ingredients: { name: string, amount: string }[],
        public steps: string[],
        public tags: string[],
        public rating: Float,
        public status: 'Pending' | 'Approved' | 'Declined',
        public comments: UserComment[],
        public video?: any
    ) {}

    static fromPlainObject(plainObject: RecipeProps): Recipe {
        return new Recipe(
            plainObject.recipeID,
            plainObject.userID,
            plainObject.title,
            plainObject.description,
            plainObject.date,
            plainObject.duration,
            plainObject.ingredients,
            plainObject.steps,
            plainObject.tags,
            plainObject.rating,
            plainObject.status,
            plainObject.comments,
            plainObject.video
        );
    }

    toPlainObject(): object {
        return {
            userID: this.userID,
            title: this.title,
            description: this.description,
            date: this.date,
            duration: this.duration,
            ingredients: this.ingredients,
            steps: this.steps,
            tags: this.tags,
            rating: this.rating,
            status: this.status,
            comments: this.comments,
            video: this.video
        };
    }

    getRecipeID(): string {
        return this.recipeID;
    }

    getUserID(): string {
        return this.userID;
    }
}