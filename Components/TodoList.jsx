import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TodoInput from './TodoInput';
import {BG_COLOR} from '../Constants';
import TodosContainer from './TodosContainer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TodoList = () => {
  const [todos, settodos] = useState([]);
  const [value, setvalue] = useState('');
  return (
    <View style={styles.container}>
      <TodoInput value={value} setvalue={setvalue} settodos={settodos} />
      <TodosContainer todos={todos} settodos={settodos} />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: wp(3),
  },
});
