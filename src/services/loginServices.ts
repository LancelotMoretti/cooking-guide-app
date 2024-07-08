import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { directToStack } from "./navigateServices";

export const loginAndGoToHome = async (
    navigation: any,
    email: string,
    password: string
) => {

    try {
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (response.user) {
            directToStack(navigation, "(tabs)");
        }
    }
    catch (error) {
        alert(error);
    }
};