import { StatusBar } from 'expo-status-bar';
import { PlatformColor, StyleSheet, Text, View } from 'react-native';
import * as Screens from './screens'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Screens.Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlatformColor('systemBackground'),
  },
});
