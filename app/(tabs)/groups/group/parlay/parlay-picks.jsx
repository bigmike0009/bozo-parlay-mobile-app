import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Button, List, Avatar, Chip } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

const mockPicks = [
  { member: 'John Doe', pick: 'Vikings Moneyline +110', odds: '+110', status: 'active' },
  { member: 'Jane Smith', pick: 'Packers Spread -3.5', odds: '-120', status: 'active' },
  { member: 'Bob Wilson', pick: null, odds: null, status: 'pending' },
  { member: 'Bozo of the Week', pick: 'Jets Moneyline +200', odds: '+200', status: 'bozo' },
];

export default function ParlayPicksScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.rulesCard}>
        <Text variant="titleMedium">Group Rules</Text>
        <Text>Pick Due: 7:00 PM EST</Text>
        <Text>Minimum Odds: +100</Text>
        <Text>Filter: NFL Bets Only</Text>
      </Surface>

      <Surface style={styles.picksCard}>
        <Text variant="titleMedium">Parlay Picks</Text>
        {mockPicks.map((pick, index) => (
          <List.Item
            key={index}
            title={pick.member}
            description={pick.pick ? `${pick.pick} (Odds: ${pick.odds})` : 'No pick made'}
            left={() => (
              pick.status === 'bozo' ? (
                <Avatar.Icon size={40} icon="emoticon-clown" style={styles.bozoIcon} />
              ) : (
                <Avatar.Text size={40} label={pick.member.substring(0, 2)} />
              )
            )}
            right={() => (
              pick.status === 'pending' && <Chip mode="outlined">Pending</Chip>
            )}
          />
        ))}
      </Surface>

      <Button mode="contained" onPress={() => {}} style={styles.editButton}>
        Make/Edit Your Pick
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rulesCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  picksCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  bozoIcon: {
    backgroundColor: 'red',
  },
  editButton: {
    marginTop: 16,
  },
});