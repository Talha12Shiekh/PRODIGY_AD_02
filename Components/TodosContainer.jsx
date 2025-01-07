import {  StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SingleTodo from './SingleTodo';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeleteAndEditItem from './DeleteAndEditItem';
import { useGetTodos, useGetUser } from '../App';
import { useDispatch } from 'react-redux';
import { fetchTodos } from '../Redux/Slices/TodosSlice';

const TodosContainer = ({ setvalue,value }) => {
  const dispatch = useDispatch();
  const currentUser = useGetUser();
  const [todosloaded, settodosloaded] = useState(false);

  async function handleFetchTodos() {
    try {
      settodosloaded(true);
      await dispatch(fetchTodos(currentUser.uid));
      settodosloaded(false);
    } catch (error) {
      settodosloaded(false);
    }
  }

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const newtodos = useGetTodos();

  return (
    <View style={styles.todoContainer}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={newtodos}
        renderItem={(data, rowMap) => {
         return <SingleTodo data={data} rowMap={rowMap} />
        }}
        renderHiddenItem={(data, rowMap) => (
          <DeleteAndEditItem value={value} setvalue={setvalue} data={data} rowMap={rowMap} />
        )}
        keyExtractor={todo => todo.id}
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
  }
});