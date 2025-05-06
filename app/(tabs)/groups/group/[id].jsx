import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Card, Text, Button, Avatar, Chip, List, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockGroups } from '../../../mockData/mock';

export default function GroupDetail() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();

  const group = mockGroups.find(group => group.id === id) || {};
  const isMember = group.isMember;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerTitle: group.name || 'Group Details',
          headerBackTitle: 'Back'
        }}
      />
      <ScrollView>
        <Surface style={{ margin: 16, padding: 16, elevation: 2, borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar.Text size={60} label={group.name?.substring(0, 2) || 'NA'} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text variant="titleLarge">{group.name}</Text>
              <Text variant="bodyMedium">{group.description}</Text>
            </View>
          </View>

          {isMember ? (
            <View style={{ marginTop: 16 }}>
              <Card style={{ marginBottom: 16 }}>
                <Card.Content>
                  <Text variant="titleMedium">Next Pick Due</Text>
                  <Text variant="bodyLarge">{group.pickDueDay}</Text>
                </Card.Content>
              </Card>

              <Button 
                mode="contained" 
                onPress={() => router.push(`/groups/group/parlay/parlay-picks?id=${id}`)} 
                style={{ marginBottom: 8 }}>
                View/Edit Parlay Picks
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => router.push(`/groups/group/make/make-pick?id=${id}`)} 
                style={{ marginBottom: 8 }}>
                Make Pick
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
              description={`$${group.betAmount}`} 
              left={props => <List.Icon {...props} icon="cash" />}
            />
            <List.Item 
              title="Frequency" 
              description={group.frequency || 'N/A'} 
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item 
              title="Lock-in Time" 
              description={group.lockInTime || 'N/A'} 
              left={props => <List.Icon {...props} icon="clock" />}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text variant="titleMedium">Members ({group.memberCount}/{group.maxMembers})</Text>
            <ScrollView style={{ maxHeight: 200 }}>
              {group.members?.map((member, index) => (
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
            </ScrollView>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}