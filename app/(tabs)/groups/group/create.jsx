import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function CreateGroup() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [pickDueDay, setPickDueDay] = useState('thursday');

  const handleCreateGroup = async () => {
    // Handle group creation logic
    console.log('Creating group:', {
      groupName,
      betAmount,
      isPrivate,
      pickDueDay,
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Group Name"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.input}
      />
      
      <TextInput
        label="Bet Amount ($)"
        value={betAmount}
        onChangeText={setBetAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text>Private Group</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>

      <Text style={styles.label}>Pick Due Day</Text>
      <SegmentedButtons
        value={pickDueDay}
        onValueChange={setPickDueDay}
        buttons={[
          { value: 'thursday', label: 'Thursday' },
          { value: 'friday', label: 'Friday' },
          { value: 'saturday', label: 'Saturday' },
        ]}
        style={styles.segments}
      />

      <Button
        mode="contained"
        onPress={handleCreateGroup}
        style={styles.button}
        disabled={!groupName || !betAmount}
      >
        Create Group
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  segments: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});