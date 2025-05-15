import { Stack } from 'expo-router';

export default function GroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Ensure headers are shown for navigation
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Group Details' }} />
      <Stack.Screen name="create" options={{ title: 'Create Group' }} />
      <Stack.Screen name="parlay/parlay-picks" options={{ title: 'Parlay Picks', headerBackTitle: 'Back to Group' }} />
      <Stack.Screen name="make/make-pick" options={{ title: 'Make Pick', headerBackTitle: 'Back to Group' }} />
      <Stack.Screen name="chat" options={{ title: 'Group Chat' }} />
    </Stack>
  );
}
