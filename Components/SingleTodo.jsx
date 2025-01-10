import {
  Text,
  View,
} from 'react-native';
import React from 'react';
import { styles } from '../styles';

const SingleTodo = ({ data, rowMap }) => {
  return (
    <View style={styles.singleTodo}>
        <View>
          <Text numberOfLines={1} style={styles.todoTxt}>
            {data.item.value}
          </Text>
        </View>
    </View>
  );
};

export default SingleTodo;
