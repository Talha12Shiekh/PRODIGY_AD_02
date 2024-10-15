import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BLACK_COLOR,
  center,
  GREEN_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/FontAwesome5';

const SingleTodo = () => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.singleTodo}>
        <View style={{maxWidth: wp(60)}}>
          <Text numberOfLines={1} style={styles.todoTxt}>
            SingleTodoSingleTodoSingleTodoSingleTodoSingleTodo
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <DeleteIcon name="delete" size={30} color={RED_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity>
            <EditIcon name="pencil-alt" size={23} color={GREEN_COLOR} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SingleTodo;

const styles = StyleSheet.create({
  singleTodo: {
    backgroundColor: BLACK_COLOR,
    padding: wp(5),
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(0.6),
    shadowColor: WHITE_COLOR,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
  },
  todoTxt: {
    fontSize: wp(4),
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 20,
    ...center,
  },
});
