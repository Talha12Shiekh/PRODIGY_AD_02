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
} from '../Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Skeleton } from 'moti/skeleton';

const SingleTodo = ({ data, rowMap,todosloaded }) => {
  return (
    <Skeleton>
      <View style={styles.singleTodo}>
        <View>
          <Text numberOfLines={1} style={styles.todoTxt}>
            {data.item.value}
          </Text>
        </View>
      </View>
    </Skeleton>
  );
};

export default SingleTodo;

const styles = StyleSheet.create({
  singleTodo: {
    backgroundColor: BLACK_COLOR,
    padding: wp(5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(0.6),
  },
  todoTxt: {
    fontSize: wp(4),
    fontFamily: "Poppins-Regular",
  }
});
