import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { mockGroups } from '../mockData/mock';

export default function FindGroups() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [availableGroups, setAvailableGroups] = useState(mockGroups.filter(group => !group.isMember));

  const renderGroup = ({ item }) => (
    <Card style={styles.card} onPress={() => router.push(`/groups/group/${item.id}`)}>
      <Card.Content>
        <Text variant="titleLarge">{item.name}</Text>
        <Text variant="bodyMedium">Members: {item.memberCount}/{item.maxMembers}</Text>
        <Text variant="bodyMedium">Pick Due: {item.pickDueDay}</Text>
        <Text variant="bodyMedium">Bet Amount: ${item.betAmount}</Text>
        <View style={styles.stats}>
          <Text variant="bodySmall">Wins: {item.wins}</Text>
          <Text variant="bodySmall">Losses: {item.losses}</Text>
        </View>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/groups/group/${item.id}`)}
          style={styles.viewButton}
        >
          View Group
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search groups"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={availableGroups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyLarge">No groups found</Text>
            <Button 
              mode="contained" 
              onPress={() => router.push('/create-group')}
              style={styles.createButton}
            >
              Create a Group
            </Button>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  joinButton: {
    marginTop: 16,
  },
  viewButton: {
    marginTop: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  createButton: {
    marginTop: 16,
  },
});