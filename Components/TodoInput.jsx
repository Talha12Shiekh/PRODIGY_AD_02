import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BLACK_COLOR, DARK_GREEN_COLOR, GREEN_COLOR, WHITE_COLOR} from '../Constants';
import { InputContext } from '../Screens/TodoScreen';
import { useDispatch } from 'react-redux';
import { addTodos, editTodos, fetchTodos, setisEditing  } from '../Redux/Slices/TodosSlice';
import { useGetEditKey, useGetUser, useIsEditing } from '../App';

const TodoInput = ({value, setvalue}) => {
  const dispatch = useDispatch();
  const inputRef = useContext(InputContext);
  const currentUser = useGetUser();
  const editing = useIsEditing();
  const editkey = useGetEditKey();

  const [todoloaded,settodoloaded] = useState(false);

  async function handleAddTodos() {

    settodoloaded(true);
    try {
      if(!editing){
        await dispatch(addTodos({value,id:currentUser.uid}));
        ToastAndroid.show("Todo added successfully !",ToastAndroid.LONG);
      }else{
        await dispatch(editTodos({key:editkey,value:value}));
        dispatch(setisEditing(false));
        ToastAndroid.show("Todo edited successfully !",ToastAndroid.LONG);
      }
      setvalue("");
      settodoloaded(false);
      await dispatch(fetchTodos(currentUser.uid));
    } catch (error) {
      settodoloaded(false);
    } 
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
          {!todoloaded ? <Text style={styles.btnText}>{editing ? "Edit" : "Add"} Task</Text> : <ActivityIndicator
          size="large"
          color={GREEN_COLOR}
          />}
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
    padding: wp(4),
    borderRadius: 10,
    backgroundColor: BLACK_COLOR,
    color: WHITE_COLOR,
    fontSize: wp(4),
    fontFamily:"Poppins-Regular",
    paddingTop:wp(5),
    paddingBottom:wp(3)
  },
  buttonContainer: {
    marginVertical: hp(2),
  },
  button: {
    backgroundColor: DARK_GREEN_COLOR,
    padding: wp(3),
    borderRadius: 10,
    paddingBottom:wp(2)
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp(4),
    fontFamily:"Poppins-Regular",
  },
});