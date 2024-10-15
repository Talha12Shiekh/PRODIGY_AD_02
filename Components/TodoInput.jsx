import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK_COLOR, DARK_GREEN_COLOR, WHITE_COLOR } from '../Constants';

const TodoInput = () => {
    return (
        <>
            <View>
                <TextInput style={styles.input} placeholder="Add Task" />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TodoInput;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        border: '1px solid grey',
        padding: wp(4),
        borderRadius: 10,
        backgroundColor: BLACK_COLOR,
        color: WHITE_COLOR,
        fontSize: wp(4)
    },
    buttonContainer: {
        marginVertical: hp(2),
    },
    button: {
        backgroundColor: DARK_GREEN_COLOR,
        padding: wp(3),
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: wp(4)
    },
});
