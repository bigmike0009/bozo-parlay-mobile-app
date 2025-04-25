import { View, Text, FlatList, StyleSheet } from 'react-native';

const MOCK_LINES = [
  { id: '1', game: 'Lakers vs Warriors', spread: 'LAL -5.5', odds: '-110' },
  { id: '2', game: 'Chiefs vs Bills', spread: 'KC +3', odds: '-110' },
  { id: '3', game: 'Yankees vs Red Sox', moneyline: 'NYY -150' },
];

export default function LinesScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.lineItem}>
      <Text style={styles.gameText}>{item.game}</Text>
      <Text style={styles.oddsText}>{item.spread || item.moneyline}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Lines</Text>
      <FlatList
        data={MOCK_LINES}
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
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  lineItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  gameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  oddsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});