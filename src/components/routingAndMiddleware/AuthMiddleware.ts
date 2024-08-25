import { auth } from "@/firebaseConfig";
import { directToStack } from "@/components/routingAndMiddleware/Navigation";
import { NavigationProp } from "@react-navigation/native";

export class AuthMiddleware {
    static async requireAuth(navigation: NavigationProp<any>) {
        const user = auth.currentUser;
        if (!user) {
            // If the user is not authenticated, redirect to login
            directToStack(navigation, "Login");
        }
    }
}