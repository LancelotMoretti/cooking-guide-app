import { db, auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import { directToStack } from "@/components/routingAndMiddleware/Navigation";

const createUser = async (
    response: any,
    fullName?: string,
    phoneNumber?: string,
    dateOfBirth?: string
) => {
    try {
        await update(ref(db, `users/${response.user.uid}`), {
            fullName: fullName,
            email: response.user.email,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth
        });
    }
    catch (error) {
        return error;
    }
};

export const signUpAccount = async (
    email: string,
    password: string,
    fullName?: string,
    phoneNumber?: string,
    dateOfBirth?: string
) => {
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (response.user) {
            await createUser(response, fullName, phoneNumber, dateOfBirth);
        }
    }
    catch (error) {
        return error;
    }
};

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