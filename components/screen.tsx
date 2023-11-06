import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { evaluateExpression } from '../src/evaluate';
import { Expression } from '../src/expression';

interface ScreenProps {
  expression: Expression,
}

export const Screen: React.FC<ScreenProps> = ({ expression }) => {
  var [displayTerm, setDisplayTerm] = useState("0")
  var [displayValue, setDisplayValue] = useState("0")
  useEffect(() => {
    // Display the current term, unless it is "", in which case, display 0
    setDisplayTerm(Number(expression.currentTerm).toLocaleString())

    var evaluation = evaluateExpression(expression)
    if (evaluation === null) {
      evaluation = Number(expression.lastTerm)
    }
    setDisplayValue(evaluation.toLocaleString())
  }, [expression]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.input} numberOfLines={1} ellipsizeMode='head'>{displayTerm}</Text>
      <Text style={styles.preview} numberOfLines={1} ellipsizeMode='head'>{displayValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: "5%",
    paddingBottom: "10%",
  },
  input: {
    color: 'white',
    fontSize: 64,
    flexWrap: "nowrap",
  },
  preview: {
    color: 'lightgray',
    fontSize: 24,
  },
})
