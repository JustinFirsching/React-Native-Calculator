import React, { useState } from 'react';
import { Screen } from './components/screen';
import { KeyPad } from './components/keypad';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Expression } from './src/expression';

export default function App() {
  const [expression, setExpression] = useState<Expression>(new Expression())

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ flex: 0.30, width: "100%" }}>
          <Screen
            expression={expression}
          />
        </View>
        <View style={{ flex: 0.60 }}>
          <KeyPad
            expression={expression}
            setExpression={setExpression}
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
    alignItems: "center",
  },
  safeAreaView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
