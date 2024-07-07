import { useNavigation, CommonActions } from '@react-navigation/native';

export function navigateToStack(stackScreen: string) {
    const navigation = useNavigation();

    return () => {
        navigation.navigate(stackScreen as never);
    };
}

export function navigateToDocScreen(stackScreen: string, docHeader: string, docContent: string) {
    const navigation = useNavigation();

    return () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: stackScreen as never,
                params: {
                    header: docHeader,
                    content: docContent
                }
            })
        );
    };
}