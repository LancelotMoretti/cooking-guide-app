import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import { directToStack } from "./navigateServices";

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

export const signUpAndGoToLogin = async (
    navigation: any,
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
            directToStack(navigation, "log-in");
        }
    }
    catch (error) {
        return error;
    }
};