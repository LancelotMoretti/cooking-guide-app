import { NavigationProp } from "@react-navigation/native";
import { AuthMiddleware } from "./AuthMiddleware";
import { RoleBasedAccessMiddleware } from "./RoleBasedAccessMiddleware";

export class NavigationGuards {
    static applyGuards(navigation: NavigationProp<any>, routeName: string, roleRequired?: string) {
        if (roleRequired) {
            RoleBasedAccessMiddleware.requireRole(navigation, roleRequired);
        } else {
            AuthMiddleware.requireAuth(navigation);
        }

        // After all checks, navigate to the route
        navigation.navigate(routeName);
    }
}