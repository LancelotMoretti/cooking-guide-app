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

    getRecipeID(): string;
    getUserID(): string;
}

export class Recipe implements RecipeProps {
    constructor(
        public recipeID: string,
        public userID: string,
        public title: string,
        public description: string,
        public date: Date,
        public duration: number,
        public ingredients: {name: string, amount: string}[],
        public steps: string[],
        public tags: string[],
        public rating: Float,
        public status: 'Pending' | 'Approved' | 'Declined',
        public comments: UserComment[],
        public video?: any
    ) {}

    getRecipeID(): string {
        return this.recipeID;
    }

    getUserID(): string {
        return this.userID;
    }
}