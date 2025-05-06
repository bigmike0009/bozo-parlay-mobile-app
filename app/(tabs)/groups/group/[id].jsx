import { useLocalSearchParams, Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Card, Text, Button, Avatar, Chip, List, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockGroup = {
  id: '1',
  name: 'The Parlay Kings',
  description: 'Daily parlays with strict rules and high rewards',
  maxMembers: 20,
  currentMembers: 15,
  isPrivate: true,
  betSize: 50,
  frequency: 'daily',
  lockInTime: '7:00 PM EST',
  betWindow: '24h',
  minOdds: 1.5,
  maxOdds: 10,
  chatType: 'discord',
  leader: 'John Doe',
  admins: ['Jane Smith', 'Bob Wilson'],
  members: Array(15).fill().map((_, i) => ({
    name: `Member ${i + 1}`,
    role: i < 3 ? 'admin' : 'member',
    wins: Math.floor(Math.random() * 50),
    losses: Math.floor(Math.random() * 20)
  })),
  nextPick: {
    due: '2024-01-20T19:00:00',
    picker: 'Jane Smith'
  }
};

export default function GroupDetail() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const isMember = true; // This would come from your auth context

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerTitle: mockGroup.name,
          headerBackTitle: 'Back'
        }}
      />
      <ScrollView>
        <Surface style={{ margin: 16, padding: 16, elevation: 2, borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar.Text size={60} label={mockGroup.name.substring(0, 2)} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text variant="titleLarge">{mockGroup.name}</Text>
              <Text variant="bodyMedium">{mockGroup.description}</Text>
            </View>
          </View>

          {isMember ? (
            <View style={{ marginTop: 16 }}>
              <Card style={{ marginBottom: 16 }}>
                <Card.Content>
                  <Text variant="titleMedium">Next Pick Due</Text>
                  <Text variant="bodyLarge">{new Date(mockGroup.nextPick.due).toLocaleString()}</Text>
                  <Text>Picker: {mockGroup.nextPick.picker}</Text>
                </Card.Content>
              </Card>

              <Button 
                mode="contained" 
                onPress={() => {}} 
                style={{ marginBottom: 8 }}>
                Make Pick
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => {}} 
                style={{ marginBottom: 8 }}>
                Open Chat
              </Button>
            </View>
          ) : (
            <Button 
              mode="contained" 
              onPress={() => {}} 
              style={{ marginTop: 16 }}>
              Request to Join
            </Button>
          )}

          <View style={{ marginTop: 16 }}>
            <Text variant="titleMedium">Group Details</Text>
            <List.Item 
              title="Bet Size" 
              description={`$${mockGroup.betSize}`} 
              left={props => <List.Icon {...props} icon="cash" />}
            />
            <List.Item 
              title="Frequency" 
              description={mockGroup.frequency} 
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item 
              title="Lock-in Time" 
              description={mockGroup.lockInTime} 
              left={props => <List.Icon {...props} icon="clock" />}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text variant="titleMedium">Members ({mockGroup.currentMembers}/{mockGroup.maxMembers})</Text>
            {mockGroup.members.map((member, index) => (
              <List.Item
                key={index}
                title={member.name}
                description={`${member.wins}W - ${member.losses}L`}
                left={props => <List.Icon {...props} icon="account" />}
                right={() => member.role === 'admin' && (
                  <Chip mode="outlined">Admin</Chip>
                )}
              />
            ))}
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}