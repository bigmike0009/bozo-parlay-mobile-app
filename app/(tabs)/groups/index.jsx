import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import MyGroups from '../../components/MyGroups';
import FindGroups from '../../components/FindGroups';

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState('myGroups');

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'myGroups', label: 'My Groups' },
          { value: 'findGroups', label: 'Find Groups' },
        ]}
        style={styles.toggle}
      />
      
      {activeTab === 'myGroups' ? <MyGroups /> : <FindGroups />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggle: {
    margin: 16,
  },
});