import { useState } from "react";
import { db } from "@/firebaseConfig";
import { ref, update, remove, push, onValue, off } from "firebase/database";


export interface Recipe {
    description: string;
    timeRecipe: string;
    ingredients: { amount: string, description: string }[];
    instructions: string[];
}

export function saveNewRecipe(
    description: string,
    timeRecipe: string,
    ingredients: { amount: string, description: string }[],
    instructions: string[],
    userID: number = 0 // default value for testing purposes
): void {
    const [recipe, setRecipe] = useState<Recipe>({
        description: "",
        timeRecipe: "",
        ingredients: [],
        instructions: []
    });

    const newRecipeRef = push(ref(db, `${userID}/recipes`));
    setRecipe({
        description: description,
        timeRecipe: timeRecipe,
        ingredients: ingredients,
        instructions: instructions
    });
    push(newRecipeRef, recipe);
}