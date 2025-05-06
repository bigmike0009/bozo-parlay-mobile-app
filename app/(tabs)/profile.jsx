import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Card, Button, List, Divider, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: 'https://ui-avatars.com/api/?name=User' }}
        />
        <Text variant="headlineMedium" style={styles.name}>John Doe</Text>
        <Text variant="bodyMedium" style={styles.username}>@johndoe</Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="titleLarge">12</Text>
            <Text variant="bodySmall">Active Groups</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="titleLarge">67%</Text>
            <Text variant="bodySmall">Win Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="titleLarge">$2.4K</Text>
            <Text variant="bodySmall">Total Winnings</Text>
          </View>
        </Card.Content>
      </Card>

      <List.Section>
        <List.Subheader>Quick Actions</List.Subheader>
        <Link href="/groups" asChild>
          <List.Item
            title="My Groups"
            left={props => <List.Icon {...props} icon="account-group" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Link>
        <List.Item
          title="My Bets History"
          left={props => <List.Icon {...props} icon="history" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Venmo Integration"
          description="Connect your Venmo account"
          left={props => <List.Icon {...props} icon="cash" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="DraftKings Integration"
          description="Connect your DraftKings account"
          left={props => <List.Icon {...props} icon="trophy" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Account Settings"
          left={props => <List.Icon {...props} icon="cog" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  username: {
    opacity: 0.7,
  },
  statsCard: {
    margin: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});