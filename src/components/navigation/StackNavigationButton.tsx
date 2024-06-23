import { useNavigation } from '@react-navigation/native';

export function navigateToScreen(screen: string) {
    const navigation = useNavigation();

    return () => {
        navigation.navigate(screen as never);
    };
}