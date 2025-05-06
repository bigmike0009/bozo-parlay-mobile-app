import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { color: '#000' },
        tabBarStyle: { paddingBottom: 8 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lines"
        options={{
          title: 'Lines',
          tabBarIcon: ({ color }) => <FontAwesome name="line-chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'My Groups',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}