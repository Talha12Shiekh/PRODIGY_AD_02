import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SingleTodo from './SingleTodo';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeleteAndEditItem from './DeleteAndEditItem';
import { useGetTodos, useGetUser } from '../App';
import firestore, { getDocs, query, where } from '@react-native-firebase/firestore';

const TodosContainer = ({ setvalue }) => {
  const newtodos = useGetTodos();
  const currentuser = useGetUser();
  const [todos, settodos] = useState([]);

  useEffect(() => {
    try {

      const fetchTodos = async () => {
        const q = query(firestore().collection('Todos'), where("id", "==", currentuser.uid));
        const todosSnapshot = await getDocs(q);
        let data = [];
        todosSnapshot.forEach(qry => {
          const todosdata = qry.data();
          data.push({ ...todosdata, id: qry.id });
        });
        settodos(data);
      }

      fetchTodos()
    } catch (error) {
      console.log(error);
    }

  }, [])

  return (
    <View style={styles.todoContainer}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={todos}
        renderItem={(data, rowMap) => (
          <SingleTodo data={data} rowMap={rowMap} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <DeleteAndEditItem setvalue={setvalue} data={data} rowMap={rowMap} />
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
