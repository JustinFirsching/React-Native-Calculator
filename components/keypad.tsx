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

    var newTerm = expression.currentTerm || ""
    if (expression.currentTerm === '0') {
      if (str === '0') {
        // Don't prepend 0s
        return
      } else {
        // Delete leading 0s if we get a number
        newTerm = str
      }
    }
    newTerm += str
    console.log(newTerm)
    setExpression(expression.withCurrentTerm(newTerm))
  }

  const switchSign = (_: string) => {
    var newTerm: string
    if (expression.currentTerm.startsWith('-')) {
      newTerm = expression.currentTerm.slice(1)
    } else {
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
