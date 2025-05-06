import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

const mockLines = [
  { id: '1', event: 'Vikings vs Packers', line: 'Vikings Moneyline +110' },
  { id: '2', event: 'Bears vs Lions', line: 'Lions Spread -3.5' },
  { id: '3', event: 'Jets vs Dolphins', line: 'Jets Moneyline +200' },
];

export default function MakePickScreen() {
  const { id } = useLocalSearchParams();
  const [selectedLine, setSelectedLine] = useState(null);
  const theme = useTheme();

  const handlePick = () => {
    if (selectedLine) {
      console.log(`Pick made: ${selectedLine}`);
      // Handle pick submission logic here
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleMedium" style={styles.header}>Make Your Pick</Text>

      <Surface style={styles.linesCard}>
        {mockLines.map((line) => (
          <TouchableOpacity
            key={line.id}
            style={[
              styles.lineItem,
              selectedLine === line.line && { backgroundColor: theme.colors.primaryContainer },
            ]}
            onPress={() => setSelectedLine(line.line)}
          >
            <Text style={styles.lineText}>{line.event}</Text>
            <Text style={styles.lineText}>{line.line}</Text>
          </TouchableOpacity>
        ))}
      </Surface>

      <Button
        mode="contained"
        onPress={handlePick}
        disabled={!selectedLine}
        style={styles.submitButton}
      >
        Submit Pick
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  linesCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  lineItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  lineText: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 16,
  },
});