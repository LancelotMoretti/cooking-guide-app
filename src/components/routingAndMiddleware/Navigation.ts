import { CommonActions } from "@react-navigation/native";

export const navigateToStack = (
    navigation: any,
    stackScreen: string,
    header?: string,
    content?: string
) => {
    return () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: stackScreen,
                params: {
                    header: header,
                    content: content
                }
            })
        );
    };
};

export const directToStack = (
    navigation: any,
    stackScreen: string,
    header?: string,
    content?: string
) => {
    return navigation.dispatch(CommonActions.navigate({
        name: stackScreen,
        params: {
            header: header,
            content: content
        }
    }));
};