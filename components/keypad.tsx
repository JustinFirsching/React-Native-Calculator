import { Dispatch, SetStateAction } from 'react';
import { ButtonGroup } from './buttongroup';
import { StyleSheet, View } from 'react-native';

interface KeyPadProps {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  expression: string[];
  setExpression: Dispatch<SetStateAction<string[]>>;
}

const opTranslations = new Map<string, string>();
opTranslations.set('÷', '/')
opTranslations.set('×', '*')
opTranslations.set('+', '+')
opTranslations.set('−', '-')

export const KeyPad: React.FC<KeyPadProps> = ({ term, setTerm, expression, setExpression }) => {
  const appendTerm = (str: string) => {
    var newTerm = term
    if (term === '0') {
      if (str === '0') {
        // Don't prepend 0s
        return
      } else {
        // Delete leading 0s if we get a number
        term = str
      }
    }
    newTerm += str
    setTerm(newTerm)
  }

  const switchSign = (_: string) => {
    var newTerm: string
    if (term.startsWith('-')) {
      newTerm = term.slice(1)
    } else {
      newTerm = '-' + term
    }
    setTerm(newTerm)
  }

  const operator = (op: string) => {
    const t = opTranslations.get(op)
    if (t == null) {
      return
    }

    setTerm('')
    setExpression([...expression, term, t])
  }

  const evaluate = (_: string) => {
    setTerm('')
    setExpression([])
  }

  const clear = (_: string) => {
    setTerm('')
    if (term == '') {
      setExpression([])
    }
  }

  return (
    <View style={style.keypad}>
      <ButtonGroup
        buttons={[
          {
            val: 'AC',
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
            onPress: operator
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
            val: '='
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
