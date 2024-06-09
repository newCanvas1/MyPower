import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [History]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
