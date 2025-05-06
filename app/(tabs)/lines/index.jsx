import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useTheme, Surface } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';

const SPORTS = [
  { id: 'nba', name: 'NBA', icon: '🏀' },
  { id: 'nfl', name: 'NFL', icon: '🏈' },
  { id: 'mlb', name: 'MLB', icon: '⚾' },
  { id: 'nhl', name: 'NHL', icon: '🏒' },
  { id: 'soccer', name: 'Soccer', icon: '⚽' },
];

const MOCK_EVENTS = {
  nba: [
    {
      id: '1',
      teams: { away: 'Lakers', home: 'Warriors' },
      time: '7:30 PM ET',
      lines: {
        spread: { away: -5.5, home: +5.5, odds: -110 },
        total: { over: 224.5, under: 224.5, odds: -110 },
        moneyline: { away: -180, home: +160 }
      }
    },
    {
      id: '2',
      teams: { away: 'Celtics', home: 'Nets' },
      time: '8:00 PM ET',
      lines: {
        spread: { away: -8.5, home: +8.5, odds: -110 },
        total: { over: 219.5, under: 219.5, odds: -110 },
        moneyline: { away: -320, home: +260 }
      }
    }
  ]
};

const BET_CATEGORIES = [
  { id: 'popular', name: 'Popular' },
  { id: 'game_lines', name: 'Game Lines' },
  { id: 'player_points', name: 'Player Points' },
  { id: 'player_rebounds', name: 'Player Rebounds' },
  { id: 'player_assists', name: 'Player Assists' },
  { id: 'team_props', name: 'Team Props' },
];

const MOCK_BETS = {
  popular: [
    { id: '1', name: 'Stephen Curry', prop: 'Over 28.5 Points', odds: -110 },
    { id: '2', name: 'LeBron James', prop: 'Triple Double', odds: +450 },
  ],
  player_points: [
    { id: '3', name: 'Klay Thompson', prop: 'Over 22.5 Points', odds: -115 },
    { id: '4', name: 'Anthony Davis', prop: 'Under 26.5 Points', odds: -105 },
  ]
};

export default function LinesScreen() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const theme = useTheme();
  const router = useRouter();


  const renderSportSelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportSelector}>
      {SPORTS.map(sport => (
        <TouchableOpacity
          key={sport.id}
          style={[
            styles.sportButton,
            selectedSport === sport.id && { backgroundColor: theme.colors.primary }
          ]}
          onPress={() => setSelectedSport(sport.id)}
        >
          <Text style={styles.sportIcon}>{sport.icon}</Text>
          <Text style={[
            styles.sportText,
            selectedSport === sport.id && { color: 'white' }
          ]}>{sport.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderEventCard = (event) => (
    <Surface style={styles.eventCard} elevation={2}>
      <Pressable onPress={() => router.push('/(tabs)/lines/event/1')}>
        {/* 👆 push to /event screen and pass event as a param */}
        <View style={styles.eventHeader}>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventTeams}>{event.teams.away} @ {event.teams.home}</Text>
        </View>
        <View style={styles.linesContainer}>
          <View style={styles.lineColumn}>
            <Text style={styles.lineHeader}>Spread</Text>
            <Text style={styles.lineOdds}>{event.lines.spread.away > 0 ? '+' : ''}{event.lines.spread.away}</Text>
            <Text style={styles.lineOdds}>{event.lines.spread.odds}</Text>
          </View>
          <View style={styles.lineColumn}>
            <Text style={styles.lineHeader}>Total</Text>
            <Text style={styles.lineOdds}>O {event.lines.total.over}</Text>
            <Text style={styles.lineOdds}>{event.lines.total.odds}</Text>
          </View>
          <View style={styles.lineColumn}>
            <Text style={styles.lineHeader}>Moneyline</Text>
            <Text style={styles.lineOdds}>{event.lines.moneyline.away > 0 ? '+' : ''}{event.lines.moneyline.away}</Text>
          </View>
        </View>
      </Pressable>
    </Surface>
  );


  const renderEventDetails = () => (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
        {BET_CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && { color: 'white' }
            ]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.betList}>
        {MOCK_BETS[selectedCategory]?.map(bet => (
          <Surface key={bet.id} style={styles.betCard} elevation={1}>
            <View style={styles.betInfo}>
              <Text style={styles.betName}>{bet.name}</Text>
              <Text style={styles.betProp}>{bet.prop}</Text>
            </View>
            <View style={styles.oddsButton}>
              <Text style={styles.oddsText}>{bet.odds > 0 ? '+' : ''}{bet.odds}</Text>
            </View>
          </Surface>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: selectedEvent ? 'Event Details' : (selectedSport ? SPORTS.find(s => s.id === selectedSport).name : 'Lines'),
          headerBackTitle: 'Back'
        }}
      />
      {!selectedEvent ? (
        <>
          {renderSportSelector()}
          <ScrollView style={styles.eventList}>
            {selectedSport && MOCK_EVENTS[selectedSport]?.map(event => renderEventCard(event))}
          </ScrollView>
        </>
      ) : renderEventDetails()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sportSelector: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  sportButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  sportIcon: {
    marginRight: 5,
    fontSize: 16,
  },
  sportText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventList: {
    flex: 1,
    padding: 10,
  },
  eventCard: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  eventHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
  },
  eventTeams: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  linesContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  lineColumn: {
    flex: 1,
    alignItems: 'center',
  },
  lineHeader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  lineOdds: {
    fontSize: 14,
    fontWeight: '500',
  },
  categorySelector: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  betList: {
    flex: 1,
    padding: 10,
  },
  betCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  betInfo: {
    flex: 1,
  },
  betName: {
    fontSize: 16,
    fontWeight: '600',
  },
  betProp: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  oddsButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  oddsText: {
    fontSize: 14,
    fontWeight: '500',
  },
});