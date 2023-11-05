import { Button, ButtonProps } from './button'
import { StyleSheet, View } from 'react-native';

interface ButtonGroupProps {
  buttons: ButtonProps[];
  direction?: "row" | "column";
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, direction = "row" }) => {
  return (
    <View style={[styles.buttonGroup, { flexDirection: direction }]}>
      {buttons.map((button, idx) =>
        <Button key={idx} {...button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    alignItems: 'center',
  }
})
