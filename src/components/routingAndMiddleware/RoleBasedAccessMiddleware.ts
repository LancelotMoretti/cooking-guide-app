import { auth, db } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { directToStack } from "@/components/routingAndMiddleware/Navigation";
import { NavigationProp } from "@react-navigation/native";

export class RoleBasedAccessMiddleware {
    static async requireRole(navigation: NavigationProp<any>, requiredRole: string) {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(db, `users/${user.uid}/role`);
            const snapshot = await get(userRef);
            const role = snapshot.val();

            if (role !== requiredRole) {
                // If the user does not have the required role, redirect to an unauthorized page
                directToStack(navigation, "Unauthorized");
            }
        } else {
            directToStack(navigation, "Login");
        }
    }
}