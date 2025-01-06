import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import SingleTodo from './SingleTodo';
import {SwipeListView} from 'react-native-swipe-list-view';
import DeleteAndEditItem from './DeleteAndEditItem';
import { useGetTodos, useGetUser } from '../App';
import { useDispatch } from 'react-redux';
import { fetchTodos } from '../Redux/Slices/TodosSlice';

const TodosContainer = ({setvalue}) => {
  const dispatch = useDispatch();
  const currentUser = useGetUser();
  const [todosloaded,settodosloaded] = useState(false);

  async function handleFetchTodos(){
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
  },[])

  const newtodos = useGetTodos();

  return (
    <View style={styles.todoContainer}> 
     <SwipeListView
      showsVerticalScrollIndicator={false}
        data={newtodos}
        renderItem={(data, rowMap) => (
          <SingleTodo todosloaded={todosloaded} data={data} rowMap={rowMap} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <DeleteAndEditItem  setvalue={setvalue}  data={data} rowMap={rowMap} />
        )}
        keyExtractor={item => item.id}
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