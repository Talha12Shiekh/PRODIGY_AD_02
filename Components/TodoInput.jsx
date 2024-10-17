import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useContext } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BLACK_COLOR, DARK_GREEN_COLOR, WHITE_COLOR} from '../Constants';
import { InputContext } from './TodoList';

const TodoInput = ({todos,value, setvalue, settodos,setisEdited,isEdited,editId}) => {

  const inputRef = useContext(InputContext);

  function handleAddTodos() {
    const todoObject = {
      todo: value,
      key: Date.now(),
    };
    if(isEdited){
      const newTodos = [...todos];
      const editedTodos = newTodos.find(t => t.key === editId);
      editedTodos.todo = value;
      settodos(newTodos);
      inputRef?.current?.blur()
    }else {
      if(value === "") return ToastAndroid.show("You can not add an empty item",ToastAndroid.LONG);
      settodos(prev => [...prev, todoObject]);
    }
    setvalue('');
    setisEdited(false)
  }

  return (
    <>
      <View>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={vlue => setvalue(vlue)}
          style={styles.input}
          placeholder="Add Task"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddTodos} style={styles.button}>
          <Text style={styles.btnText}>{isEdited ? "Edit" : "Add"} Task</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    border: '1px solid grey',
    padding: wp(3),
    borderRadius: 10,
    backgroundColor: BLACK_COLOR,
    color: WHITE_COLOR,
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
    paddingTop:wp(5)
  },
  buttonContainer: {
    marginVertical: hp(2),
  },
  button: {
    backgroundColor: DARK_GREEN_COLOR,
    padding: wp(2),
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
    fontSize:wp(4),
    paddingTop:wp(.5)
  },
});
