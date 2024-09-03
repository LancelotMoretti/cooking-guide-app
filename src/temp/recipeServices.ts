import { useState, useEffect } from "react";
import { auth, db } from "@/firebaseConfig";
import { get, ref, update, remove, push, onValue, off } from "firebase/database";
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { UserComment } from '@/components/models/UserComment';
export interface Recipe {
    recipeID: string;
    userID: string;
    title: string;
    description: string;
    duration: string;
    ingredients: { amount: string, name: string }[];
    steps: string[];
    video: any;
    date: Date;
    tags:[];
    rating: Float;
    comments: UserComment[],
    meal: { breakfast: boolean, lunch: boolean, dinner: boolean };
    status: string
}

export function readRecipesListFromDatabase() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const recipesRef = ref(db, 'recipes');

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const recipesArray: Recipe[] = Object.keys(data).map(key => ({
                    recipeID: key,
                    userID: data[key].userID,
                    title: data[key].title,
                    description: data[key].description,
                    duration: data[key].timeDuration,
                    ingredients: data[key].ingredients,
                    steps: data[key].instructions,
                    video: data[key].video,
                    meal: data[key].meal,
                    tags: data[key].tags,
                    rating: data[key].rating,
                    comments: data[key].comments,
                    date: new Date(data[key].time),
                    status: data[key].status
                }));
                setRecipes(recipesArray);
            } else {
                setRecipes([]);
            }
        };

        onValue(recipesRef, handleData);

        return () => {
            off(recipesRef, 'value', handleData);
        };
    }, []);

    return recipes;

}

export function readRecipeFromDatabase(recipeId: string) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const recipeRef = ref(db, `recipes/${recipeId}`);

        const handleData = async() => {
            const snapshot = await get(recipeRef);
            const data = snapshot.val();
            
            if (data) {
                const handleRecipe: Recipe = {
                    recipeID: data.recipeID,
                    userID: data.userID,
                    title: data.title,
                    description: data.description,
                    duration: data.timeDuration,
                    ingredients: data.ingredients,
                    steps: data.instructions,
                    video: data.video,
                    meal: data.meal,
                    tags: data.tags,
                    rating: data.rating,
                    comments: data.comments,
                    date: new Date(data.time),
                    status: data.status

                };
                setRecipe(handleRecipe);
            } else {
                setRecipe(null);
            }
        };

        handleData();

    }, [recipeId]);
    
    return recipe;
}

export function saveUpdatedRecipe(recipe: Recipe): void {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not logged in');
    }
    const recipeRef = ref(db, `recipes/${recipe.recipeID}`);
    update(recipeRef, recipe);
}

export function saveNewRecipe(recipe: Recipe): void {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not logged in');
    }
    const newRecipeRef = push(ref(db, 'recipes'));
    recipe.recipeID = newRecipeRef.key as string
    recipe.userID = user.uid;
    update(newRecipeRef, recipe);
}

