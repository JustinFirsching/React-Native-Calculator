import React, { useState } from 'react';
import { Screen } from './components/screen';
import { KeyPad } from './components/keypad';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const [expression, setExpression] = useState<string[]>([])
  const [term, setTerm] = useState("")

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ flex: 0.30, width: "100%" }}>
          <Screen
            expression={expression}
            term={term}
          />
        </View>
        <View style={{ flex: 0.60 }}>
          <KeyPad
            expression={expression}
            setExpression={setExpression}
            term={term}
            setTerm={setTerm}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
