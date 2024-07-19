import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { get, ref, update, remove, push, onValue, off } from "firebase/database";


export interface Recipe {
    recipeID: string;
    userID: string;
    title: string;
    description: string;
    timeDuration: string;
    ingredients: { amount: string, description: string }[];
    instructions: string[];
    video: any;
    time: Date;
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
                    timeDuration: data[key].timeDuration,
                    ingredients: data[key].ingredients,
                    instructions: data[key].instructions,
                    video: data[key].video,
                    time: new Date(data[key].time),
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
                    timeDuration: data.timeDuration,
                    ingredients: data.ingredients,
                    instructions: data.instructions,
                    video: data.video,
                    time: new Date(data.time),
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

export function writeRecipeToDatabase(recipe: Recipe): void {
    const newRecipeRef = push(ref(db, 'recipes'));
    recipe.recipeID = newRecipeRef.key as string
    update(newRecipeRef, recipe);
}


export function saveNewRecipe(
    //title: string,
    description: string,
    timeDuration: string,
    ingredients: { amount: string, description: string }[],
    instructions: string[],
    userID: number = 0 // default value for testing purposes
): void {
    const [recipe, setRecipe] = useState<Recipe>({
        recipeID: "",
        userID: "",
        title: "",
        description: "",
        timeDuration: "",
        ingredients: [],
        instructions: [],
        video: "",
        time: new Date(),
        status: "",
        
    });

    const newRecipeRef = push(ref(db, `${userID}/recipes`));
    setRecipe({
        recipeID: newRecipeRef.key as string,
        userID: userID.toString(),
        title: "New Recipe",
        description: description,
        timeDuration: timeDuration,
        ingredients: ingredients,
        instructions: instructions,
        video: "",
        time: new Date(),
        status: "Pending"
    });
    push(newRecipeRef, recipe);
}

