import { StyleSheet, View, Text, PlatformColor, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { BlurView } from 'expo-blur';

function BottomBar() {
  return (
    <BlurView tint="dark">
      <SafeAreaView>
        <TextInput
          style={styles.textInput}
          placeholder="testing"
        />  
      </SafeAreaView>
    </BlurView>
  )
}

export function Home() {
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <BottomBar/>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  text: {
    color: PlatformColor('label')
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    // height: 100,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: PlatformColor('separator'),
    borderRadius: 30,
    color: PlatformColor('label'),
    fontSize: 15
  }
});
