import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK_GROUPS = [
  { 
    id: '1', 
    name: 'Weekend Warriors',
    members: 8,
    nextPick: 'Sunday',
    stake: '$20'
  },
  {
    id: '2',
    name: 'High Rollers',
    members: 5,
    nextPick: 'Saturday',
    stake: '$50'
  }
];

export default function GroupsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.groupItem}>
      <Text style={styles.groupName}>{item.name}</Text>
      <View style={styles.groupDetails}>
        <Text>Members: {item.members}</Text>
        <Text>Next Pick: {item.nextPick}</Text>
        <Text>Stake: {item.stake}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create New Group</Text>
      </TouchableOpacity>
      
      <Text style={styles.header}>My Groups</Text>
      <FlatList
        data={MOCK_GROUPS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  groupItem: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  groupDetails: {
    gap: 4,
  },
});