import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router'; 
import { useState } from 'react';
import { Surface, useTheme } from 'react-native-paper';

const BET_CATEGORIES = [
  { id: 'popular', name: 'Popular' },
  { id: 'game_lines', name: 'Game Lines' },
  { id: 'player_points', name: 'Player Points' },
  { id: 'player_rebounds', name: 'Player Rebounds' },
  { id: 'player_assists', name: 'Player Assists' },
  { id: 'team_props', name: 'Team Props' },
];

const MOCK_BETS = {
  popular: [
    { id: '1', name: 'Stephen Curry', prop: 'Over 28.5 Points', odds: -110 },
    { id: '2', name: 'LeBron James', prop: 'Triple Double', odds: +450 },
  ],
  player_points: [
    { id: '3', name: 'Klay Thompson', prop: 'Over 22.5 Points', odds: -115 },
    { id: '4', name: 'Anthony Davis', prop: 'Under 26.5 Points', odds: -105 },
  ]
};

export default function EventScreen() {
  const { event } = useLocalSearchParams();
  const { id } = useLocalSearchParams();

  //const parsedEvent = JSON.parse(event); // Parse the passed event
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Lakers @ Heat: ${id}` }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
        {BET_CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && { color: 'white' }
            ]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.betList}>
        {MOCK_BETS[selectedCategory]?.map(bet => (
          <Surface key={bet.id} style={styles.betCard} elevation={1}>
            <View style={styles.betInfo}>
              <Text style={styles.betName}>{bet.name}</Text>
              <Text style={styles.betProp}>{bet.prop}</Text>
            </View>
            <View style={styles.oddsButton}>
              <Text style={styles.oddsText}>{bet.odds > 0 ? '+' : ''}{bet.odds}</Text>
            </View>
          </Surface>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  categorySelector: { backgroundColor: 'white', paddingVertical: 10 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 5, borderRadius: 16, backgroundColor: '#f0f0f0' },
  categoryText: { fontSize: 14, fontWeight: '500' },
  betList: { flex: 1, padding: 10 },
  betCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, marginBottom: 8, backgroundColor: 'white', borderRadius: 8 },
  betInfo: {},
  betName: { fontSize: 16, fontWeight: '600' },
  betProp: { fontSize: 14, color: '#666' },
  oddsButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 6 },
  oddsText: { fontWeight: 'bold' }
});
