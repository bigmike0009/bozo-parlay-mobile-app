import React from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { mockChatMessages } from '../../../mockData/mock';

export default function GroupChat() {
  const [messages, setMessages] = React.useState(mockChatMessages || []); // Ensure messages is always an array
  const [input, setInput] = React.useState('');

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'CurrentUser',
        text: input,
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Use functional update to avoid potential state issues
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isCurrentUser ? styles.currentUser : styles.otherUser,
            ]}
          >
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.message}>{item.text}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <IconButton icon="send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    maxWidth: '70%',
  },
  currentUser: {
    backgroundColor: '#6200ee',
    alignSelf: 'flex-end',
  },
  otherUser: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});