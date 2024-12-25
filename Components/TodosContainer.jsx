import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleTodo from './SingleTodo';
import {SwipeListView} from 'react-native-swipe-list-view';
import DeleteAndEditItem from './DeleteAndEditItem';
import { useGetTodos } from '../App';

const TodosContainer = ({setvalue}) => {
  const newtodos = useGetTodos();

  return (
    <View style={styles.todoContainer}> 
      <SwipeListView
      showsVerticalScrollIndicator={false}
        data={newtodos}
        renderItem={(data, rowMap) => (
          <SingleTodo data={data} rowMap={rowMap} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <DeleteAndEditItem  setvalue={setvalue}  data={data} rowMap={rowMap} />
        )}
        leftOpenValue={55}
        rightOpenValue={-55}
      />
    </View>
  );
};

export default TodosContainer;

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
  },
});
