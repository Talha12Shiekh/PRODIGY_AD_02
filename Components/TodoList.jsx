import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState,createContext, useEffect} from 'react';
import TodoInput from './TodoInput';
import {BG_COLOR} from '../Constants';
import TodosContainer from './TodosContainer';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InputContext = createContext(null);

const getTodos = async () => {
  console.log("getting")
  const storedTodos = await AsyncStorage.getItem("todos");
  if (storedTodos === "[]") {
    return [];
  } else {
    return JSON.parse(storedTodos);
  }
};

const TodoList = () => {
  const [todos, settodos] = useState([]);
  const [value, setvalue] = useState('');
  const [isEdited, setisEdited] = useState(false);
  const [editId, seteditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getTodos();

      settodos(fetchedTodos);
    }

    fetchTodos();
  }, []);


  return (
    <InputContext.Provider value={inputRef}>
    <View style={styles.container}>
      <TodoInput
        isEdited={isEdited}
        setisEdited={setisEdited}
        value={value}
        setvalue={setvalue}
        settodos={settodos}
        todos={todos}
        editId={editId}
      />
      <TodosContainer
        setisEdited={setisEdited}
        todos={todos}
        settodos={settodos}
        setvalue={setvalue}
        seteditId={seteditId}
      />
    </View>
    </InputContext.Provider>
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
