import { ButtonGroup } from "./buttongroup";
import { StyleSheet, View } from 'react-native';

export const OperationPad = () => {
    return (
        <View style={style.specialtyPad}>
            <ButtonGroup
                buttons={[
                    {
                        val: "÷",
                    },
                    {
                        val: "×",
                    },
                    {
                        val: "−",
                    },
                    {
                        val: "+",
                    },
                    {
                        val: "=",
                    },
                ]}
                direction="column"
            />
        </View>
    );
};


const style = StyleSheet.create({
    specialtyPad: {
        flex: 1,
        height: "80%",
        width: "80%",
    },
});

