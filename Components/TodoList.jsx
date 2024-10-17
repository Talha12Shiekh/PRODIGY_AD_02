import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState,createContext} from 'react';
import TodoInput from './TodoInput';
import {BG_COLOR} from '../Constants';
import TodosContainer from './TodosContainer';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const InputContext = createContext(null);

const TodoList = () => {
  const [todos, settodos] = useState([]);
  const [value, setvalue] = useState('');
  const [isEdited, setisEdited] = useState(false);
  const [editId, seteditId] = useState(null);
  const inputRef = useRef(null);
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
