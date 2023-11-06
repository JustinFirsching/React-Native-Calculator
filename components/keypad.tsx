import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ButtonGroup } from './buttongroup';
import { StyleSheet, View } from 'react-native';
import { Expression } from '../src/expression';
import { evaluateExpression } from '../src/evaluate';

interface KeyPadProps {
  expression: Expression;
  setExpression: Dispatch<SetStateAction<Expression>>;
}

const opTranslations = new Map<string, string>();
opTranslations.set('÷', '/')
opTranslations.set('×', '*')
opTranslations.set('+', '+')
opTranslations.set('−', '-')

export const KeyPad: React.FC<KeyPadProps> = ({ expression, setExpression }) => {
  const [clearButtonText, setClearButtonText] = useState("AC")

  const appendTerm = (str: string) => {
    setClearButtonText("C")

    var newTerm: string
    if (str === "0" && expression.currentTerm === "0") {
      // Handle 0s
      newTerm = expression.currentTerm
    } else if (str === ".") {
      // If we already have a decimal, ignore this.
      if (expression.currentTerm.includes(".")) {
        return
      }
      // Append the decimal, but prefix if needed
      newTerm = (expression.currentTerm || "0") + str
    } else {
      // All other, just append the string
      newTerm = expression.currentTerm + str
    }
    setExpression(expression.withCurrentTerm(newTerm))
  }

  const switchSign = (_: string) => {
    var newTerm: string = expression.currentTerm
    if (expression.currentTerm.startsWith('-')) {
      newTerm = expression.currentTerm.slice(1)
    } else if ((expression.currentTerm || "0") !== "0") {
      newTerm = '-' + expression.currentTerm
    }
    setExpression(expression.withCurrentTerm(newTerm))
  }

  const operator = (op: string) => {
    const t = opTranslations.get(op)
    if (t == null) {
      return
    }

    // If we can't evaluate, use the current term as the last term. It may just
    // mean that we are entering the first number
    const backup = expression.currentTerm || expression.lastTerm
    const evaluated = evaluateExpression(expression) || backup
    setExpression(new Expression(
      evaluated.toString(), t, ""
    ))
  }

  const evaluate = (_: string) => {
    const evaluated = evaluateExpression(expression) || expression.currentTerm
    setExpression(new Expression(
      "", "", evaluated.toString()
    ))
  }

  const clear = (clearState: string) => {
    const hasInput = expression.currentTerm || expression.operator
    const buttonIsAc = clearState === "AC"
    if (hasInput && !buttonIsAc) {
      setClearButtonText("AC")
      setExpression(expression.withCurrentTerm(""))
    } else {
      setExpression(new Expression())
    }
  }

  const percent = (_: string) => {
    console.log(expression)
    if (expression.lastTerm === "") {
      if (expression.currentTerm === "") {
        // No-op if there are no terms
        return
      }

      // If there is only one term, treat it as a percentage of 100
      const pct = Number(expression.currentTerm) / 100.0
      setExpression(expression.withCurrentTerm(pct.toString()))
    } else {
      // Shoutout to copilot for getting this one really close
      // If there are two terms, treat the second as a percentage of the first
      const pct = Number(expression.lastTerm) * Number(expression.currentTerm) / 100.0
      setExpression(expression.withCurrentTerm(pct.toString()))
    }
  }

  return (
    <View style={style.keypad}>
      <ButtonGroup
        buttons={[
          {
            val: clearButtonText,
            onPress: clear,
          },
          {
            val: '+/-',
            onPress: switchSign,
          },
          {
            val: '%',
            onPress: percent,
          },
          {
            val: '÷',
            onPress: operator,
          },
        ]}
      />
      <ButtonGroup
        buttons={[
          {
            val: '7',
            onPress: appendTerm,
          },
          {
            val: '8',
            onPress: appendTerm,
          },
          {
            val: '9',
            onPress: appendTerm,
          },
          {
            val: '×',
            onPress: operator,
          },
        ]}
      />
      <ButtonGroup
        buttons={[
          {
            val: '4',
            onPress: appendTerm,
          },
          {
            val: '5',
            onPress: appendTerm,
          },
          {
            val: '6',
            onPress: appendTerm,
          },
          {
            val: '−',
            onPress: operator,
          },
        ]}
      />
      <ButtonGroup
        buttons={[
          {
            val: '1',
            onPress: appendTerm,
          },
          {
            val: '2',
            onPress: appendTerm,
          },
          {
            val: '3',
            onPress: appendTerm,
          },
          {
            val: '+',
            onPress: operator,
          },
        ]}
      />
      <ButtonGroup
        buttons={[
          {
            val: '0',
            widthFactor: 2,
            onPress: appendTerm,
          },
          {
            val: '.',
            onPress: appendTerm,
          },
          {
            val: '=',
            onPress: evaluate,
          },
        ]}
      />
    </View>
  )
}

const style = StyleSheet.create({
  keypad: {
  },
});
