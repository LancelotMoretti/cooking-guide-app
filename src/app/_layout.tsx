import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'LemmeCook', header: () => null }} 
        getID={() => 'index'}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Login', header: () => null }}
        getID={() => 'login'}
      />
      <Stack.Screen
        name="signup"
        options={{ title: 'Sign Up', header: () => null }}
        getID={() => 'signup'}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ header: () => null }}
      />
    </Stack>
  );
}
