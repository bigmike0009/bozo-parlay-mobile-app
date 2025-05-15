import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import { Text, Card, Button, Searchbar, Checkbox, Switch, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { mockGroups } from '../mockData/mock';
import { ScrollView as HorizontalScrollView } from 'react-native';

export default function FindGroups() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [availableGroups, setAvailableGroups] = useState(mockGroups.filter(group => !group.isMember));
  const [filters, setFilters] = useState({
    isPrivate: false,
    bozoFrequency: {
      daily: false,
      weekly: true, // Default to weekly
      custom: false,
    },
    betDay: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: true, // Default to friday
      saturday: false,
      sunday: false,
    },
    sportsMarkets: {
      all: true, // Default to ALL
      nfl: false,
      nba: false,
      mlb: false,
      nhl: false,
      soccer: false,
    },
    minBetAmount: 0,
    maxBetAmount: 100,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme();

  const applyFilters = () => {
    const filteredGroups = mockGroups.filter(group => {
      const matchesName = group.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrivacy = filters.isPrivate ? group.isPrivate : true;
      const matchesBozoFrequency = Object.keys(filters.bozoFrequency).some(
        key => filters.bozoFrequency[key] && group.bozoFrequency === key
      );
      const matchesBetDay = Object.keys(filters.betDay).some(
        key => filters.betDay[key] && group.pickDueDay.toLowerCase() === key
      );
      const matchesSportsMarkets = Object.keys(filters.sportsMarkets).some(
        key => filters.sportsMarkets[key] && group.sportsMarkets?.includes(key)
      );
      const matchesBetAmount =
        group.betAmount >= filters.minBetAmount &&
        group.betAmount <= filters.maxBetAmount;

      return (
        matchesName &&
        matchesPrivacy &&
        matchesBozoFrequency &&
        matchesBetDay &&
        matchesSportsMarkets &&
        matchesBetAmount
      );
    });
    setAvailableGroups(filteredGroups);
  };

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
        </View>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/groups/group/${item.id}`)}
          style={styles.viewButton}
        >
          View Group
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search groups"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        onFocus={() => setModalVisible(true)}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}> {/* Close modal when clicking outside */}
          <View style={styles.filtersContainer} onStartShouldSetResponder={() => true}> {/* Prevent closing when clicking inside */}
            <Searchbar
              placeholder="Search by name"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
            <View style={styles.filterItem}>
              <Text>Private Groups Only</Text>
              <Switch
                value={filters.isPrivate}
                onValueChange={() => setFilters({ ...filters, isPrivate: !filters.isPrivate })}
              />
            </View>
            <Text>Bozo Frequency</Text>
            <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
              {Object.keys(filters.bozoFrequency).map(key => (
                <Checkbox.Item
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  status={filters.bozoFrequency[key] ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      bozoFrequency: Object.keys(filters.bozoFrequency).reduce((acc, k) => {
                        acc[k] = k === key;
                        return acc;
                      }, {}),
                    })
                  }
                  style={styles.horizontalCheckbox}
                />
              ))}
            </HorizontalScrollView>
            <Text>Bet Day</Text>
            <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
              {Object.keys(filters.betDay).map(key => (
                <Checkbox.Item
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  status={filters.betDay[key] ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      betDay: Object.keys(filters.betDay).reduce((acc, k) => {
                        acc[k] = k === key;
                        return acc;
                      }, {}),
                    })
                  }
                  style={styles.horizontalCheckbox}
                />
              ))}
            </HorizontalScrollView>
            <Text>Sports Markets</Text>
            <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
              {Object.keys(filters.sportsMarkets).map(key => (
                <Checkbox.Item
                  key={key}
                  label={key.toUpperCase()}
                  status={filters.sportsMarkets[key] ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      sportsMarkets: {
                        ...Object.keys(filters.sportsMarkets).reduce((acc, k) => {
                          acc[k] = k === key ? true : false;
                          return acc;
                        }, {}),
                      },
                    })
                  }
                  style={styles.horizontalCheckbox}
                />
              ))}
            </HorizontalScrollView>
            <Text>Bet Amount Range</Text>
            <View style={styles.sliderContainer}>
              <Text>Min: ${filters.minBetAmount}</Text>
              <Slider
                value={filters.minBetAmount}
                onValueChange={(value) => setFilters({ ...filters, minBetAmount: value })}
                minimumValue={0}
                maximumValue={100}
                step={1}
                style={styles.slider}
              />
              <Text>Max: {filters.maxBetAmount === 100 ? '100+' : `$${filters.maxBetAmount}`}</Text>
              <Slider
                value={filters.maxBetAmount}
                onValueChange={(value) => setFilters({ ...filters, maxBetAmount: value })}
                minimumValue={0}
                maximumValue={100}
                step={1}
                style={styles.slider}
              />
            </View>
            <Button
              mode="contained"
              onPress={() => {
                applyFilters();
                setModalVisible(false); // Close modal after applying filters
              }}
              style={styles.filterButton}
            >
              Apply Filters
            </Button>
          </View>
        </Pressable>
      </Modal>
      <FlatList
        data={availableGroups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyLarge">No groups found</Text>
            <Button 
              mode="contained" 
              onPress={() => router.push('/create-group')}
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
  searchBar: {
    marginBottom: 16,
  },
  filtersContainer: {
    maxHeight: '80%',
    marginBottom: 16,
    borderWidth: 1,
    //borderColor: theme.colors.primary,
    backgroundColor: 'gray',
    borderRadius: 8,
    padding: 8,
    width: '90%',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  filterButton: {
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  joinButton: {
    marginTop: 16,
  },
  viewButton: {
    marginTop: 16,
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
  horizontalScrollContainer: {
    marginBottom: 16,
  },
  horizontalCheckbox: {
    marginHorizontal: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});