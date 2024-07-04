import { useNavigation } from '@react-navigation/native';

export function navigateToStack(stackScreen: string) {
    const navigation = useNavigation();

    return () => {
        navigation.navigate(stackScreen as never);
    };
}