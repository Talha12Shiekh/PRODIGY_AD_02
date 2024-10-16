import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SingleTodo from './SingleTodo';
import {SwipeListView} from 'react-native-swipe-list-view';
import DeleteAndEditItem from './DeleteAndEditItem';

const TodosContainer = ({todos,settodos}) => {
  return (
    <View style={styles.todoContainer}>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
        <SingleTodo />
      </ScrollView> */}
      <SwipeListView
        data={todos}
        renderItem={(data, rowMap) => (
          <SingleTodo data={data} rowMap={rowMap} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <DeleteAndEditItem data={data} rowMap={rowMap} todos={todos} 
          settodos={settodos}
          />
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
