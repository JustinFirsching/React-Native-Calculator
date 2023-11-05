import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { evaluateExpression } from '../src/evaluate';

interface ScreenProps {
  expression: string[],
  term: string,
}

export const Screen: React.FC<ScreenProps> = ({expression, term}) => {
  var [displayTerm, setDisplayTerm] = useState(0)
  useEffect(() => {
    const nextDisplayTerm = Number(term)
    console.log(`Term is now ${term}`)
    if (!isNaN(nextDisplayTerm)) {
        setDisplayTerm(nextDisplayTerm)
    }
  }, [term]);

  var [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    console.log(`Expression is now ${expression}`)
    var exp = [...expression]
    if (term === "") {
        exp.pop()
    }
    const evaluation = evaluateExpression([...exp, term]) || 0
    setDisplayValue(evaluation)
  }, [term, expression]);

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
