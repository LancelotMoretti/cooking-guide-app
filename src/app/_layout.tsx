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
        name="log-in"
        options={{ title: 'Login', header: () => null }}
        getID={() => 'log-in'}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: 'Sign Up', header: () => null }}
        getID={() => 'sign-up'}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ header: () => null }}
      />
    </Stack>
  );
}
