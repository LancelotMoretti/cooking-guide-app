import React from "react";
import { View, Text } from "react-native";
import { AuthMiddleware } from "./AuthMiddleware";
import { NavigationProp } from "@react-navigation/native";

interface SecureRouteProps {
    navigation: NavigationProp<any>;
    component: React.ComponentType<any>;
}

export const SecureRoute: React.FC<SecureRouteProps> = ({ navigation, component: Component }) => {
    AuthMiddleware.requireAuth(navigation);

    return <Component />;
};