import { Stack } from 'expo-router';

export default function LinesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,  // 👈 Important: show headers so back button appears
      }}
    />
  );
}
