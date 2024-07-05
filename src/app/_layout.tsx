import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'LemmeCook', header: () => null }} 
        getId={() => 'index'}
      />
      <Stack.Screen
        name="log-in"
        options={{ title: 'Login', header: () => null }}
        getId={() => 'log-in'}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: 'Sign Up', header: () => null }}
        getId={() => 'sign-up'}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Forgot Password', header: () => null }}
        getId={() => 'forgot-password'}
      />
      <Stack.Screen
        name="doc"
        options={{ title: 'Documentation', header: () => null }}
        getId={() => 'doc'}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ header: () => null }}
      />
    </Stack>
  );
}
