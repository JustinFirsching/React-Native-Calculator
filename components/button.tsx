import { StyleSheet, TouchableOpacity, Text, View, ColorValue } from 'react-native';

const buttonSize = 90

const logValueCallback = (value: string) => {
  console.log(`Pressed the ${value} button`)
}

export interface ButtonProps {
  val: string;
  widthFactor?: number;
  heightFactor?: number;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  onPress?: (value: string) => void;
}

export const Button: React.FC<ButtonProps> = ({ val, widthFactor = 1, heightFactor = 1, color = "white", backgroundColor = "gray", onPress = logValueCallback }) => {
  const padding = 4
  // Account for the reduced padding created by scaling
  // Note: This gets wonky if the factor is less than 1
  const width = widthFactor * buttonSize + (2 * (widthFactor - 1) * padding)
  const height = heightFactor * buttonSize + (2 * (heightFactor - 1) * padding)
  const calculatedStyle = {
    width: width,
    height: height,
    borderRadius: Math.min(width, height) / 2,
    backgroundColor: backgroundColor
  }

  return (
    <View style={{ padding: padding }}>
      <TouchableOpacity onPress={() => onPress(val)} style={[styles.button, calculatedStyle]}  >
        <Text style={[styles.buttonText, { color: color }]}>{val}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 48,
    textAlign: 'center'
  }
});
