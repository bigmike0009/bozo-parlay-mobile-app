import React, {useState} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { mockGroups } from '../mockData/mock';

export default function MyGroups() {
  const router = useRouter();
  const [myGroups, setMyGroups] = useState(mockGroups.filter(group => group.isMember));

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
          <Text variant="bodySmall">Bozo Count: {item.bozoCount || 0}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={myGroups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyLarge">You haven't joined any groups yet!</Text>
            <Button 
              mode="contained" 
              onPress={() => router.push('/(tabs)/groups/group/create')}
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
  card: {
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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