import { View } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
        <Surface style={{ padding: 20, borderRadius: 10, elevation: 4 }}>
          <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 10 }}>
            Welcome to Bozo
          </Text>
          <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.secondary }}>
            Your Social Sports Betting Community
          </Text>
        </Surface>
      </View>
    </SafeAreaView>
  );
}