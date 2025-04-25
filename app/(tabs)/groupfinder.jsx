import { View } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function GroupFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const mockGroups = [
    {
      name: 'Casual Raiders',
      description: 'Looking for laid-back players for weekly raids',
      vacancies: 2,
      rules: ['18+', 'Mic Required', 'Casual'],
    },
    {
      name: 'Competitive Team',
      description: 'Seeking serious players for high-end content',
      vacancies: 1,
      rules: ['21+', 'Experience Required', 'Hardcore'],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Searchbar
        placeholder="Search groups..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 16 }}
      />
      <ScrollView style={{ padding: 16 }}>
        {mockGroups.map((group, index) => (
          <Card key={index} style={{ marginBottom: 16 }}>
            <Card.Content>
              <Title>{group.name}</Title>
              <Paragraph>{group.description}</Paragraph>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                <Chip icon="account-multiple">{group.vacancies} spots</Chip>
                {group.rules.map((rule, i) => (
                  <Chip key={i}>{rule}</Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}