import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="setting-setting"
        options={{ title: 'LemmeCook', header: () => null }} 
        getId={() => 'setting-main'}
      />
      <Stack.Screen
        name="foundation"
        options={{ title: 'LemmeCook', header: () => null }}
        getId={() => 'foundation'}
      />
      <Stack.Screen
        name="log-out"
        options={{ title: 'LemmeCook', header: () => null }}
        getId={() => 'log-out'}
      />
      <Stack.Screen
        name="help"
        options={{ title: 'LemmeCook', header: () => null }} 
        getId={() => 'help'}
      />
    </Stack>
  );
}
