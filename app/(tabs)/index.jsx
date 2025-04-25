import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Surface, Text, Switch, Avatar, Card, useTheme, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_POSTS = [
  {
    id: '1',
    type: 'user_action',
    groupName: 'Vegas Sharks',
    userName: 'Michael',
    action: 'placed a bet for Atlanta Braves Moneyline',
    timestamp: '2 minutes ago',
    avatar: '🎲'
  },
  {
    id: '2',
    type: 'group_achievement',
    groupName: 'Glastonbury Gamblers',
    achievement: 'just cashed in 3 bozo parlays in a row!',
    timestamp: '5 minutes ago',
    avatar: '🎰'
  },
  {
    id: '3',
    type: 'user_action',
    groupName: 'Betting Bros',
    userName: 'Sarah',
    action: 'hit a 5-leg parlay on NBA games',
    timestamp: '15 minutes ago',
    avatar: '🏀'
  },
  {
    id: '4',
    type: 'group_achievement',
    groupName: 'Lucky Lions',
    achievement: 'reached 100 members!',
    timestamp: '1 hour ago',
    avatar: '🦁'
  }
];

const Post = ({ item }) => {
  const theme = useTheme();
  
  return (
    <Card style={styles.post} mode="elevated">
      <Card.Title
        title={item.groupName}
        subtitle={item.timestamp}
        left={(props) => (
          <Avatar.Text {...props} 
            label={item.avatar} 
            size={40}
            style={{ backgroundColor: theme.colors.primaryContainer }} 
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyLarge">
          {item.type === 'user_action' 
            ? `${item.userName} ${item.action}`
            : item.achievement}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default function TabOneScreen() {
  const [isPublic, setIsPublic] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const theme = useTheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetch delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const loadMore = () => {
    // Simulate loading more posts
    console.log('Loading more posts...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="titleLarge" style={styles.headerText}>
          {isPublic ? 'Public Feed' : 'Following'}
        </Text>
        <View style={styles.toggleContainer}>
          <Text>Following</Text>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            color={theme.colors.primary}
          />
          <Text>Public</Text>
        </View>
      </Surface>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    elevation: 4,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  feedContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 12,
  },
  separator: {
    height: 12,
  }
});