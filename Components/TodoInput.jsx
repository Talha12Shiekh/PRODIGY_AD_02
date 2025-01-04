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
import { BLACK_COLOR, DARK_GREEN_COLOR, WHITE_COLOR } from '../Constants';
import { InputContext } from '../Screens/TodoScreen';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, handleCangeEditSettings } from '../Redux/Slices/TodosSlice';
import { useGetUser } from '../App';
import firestore from '@react-native-firebase/firestore';


const TodoInput = ({ value, setvalue }) => {
  const dispatch = useDispatch();
  const inputRef = useContext(InputContext);
  const user = useGetUser();

  const { isEditing, editkey } = useSelector((state) => state.todosReducer);


  async function handleAddTodos() {
    try {
      await firestore()
        .collection('Todos')
        .add({
          value: value,
          id: user.uid,
        });
    } catch (error) {
      console.log(error);
    }
    // if(isEditing){
    //   dispatch(addTodos({key:user.uid,value}));
    //   dispatch(handleCangeEditSettings({ isEditing: false,editkey:null }));
    // } else {
    //   dispatch(addTodos({data:value,key:Date.now()}));
    // }
    setvalue("");
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
          <Text style={styles.btnText}>{isEditing ? "Edit" : "Add"} Task</Text>
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
    fontFamily: "Poppins-Regular",
    paddingTop: wp(5),
    paddingBottom: wp(3)
  },
  buttonContainer: {
    marginVertical: hp(2),
  },
  button: {
    backgroundColor: DARK_GREEN_COLOR,
    padding: wp(3),
    borderRadius: 10,
    paddingBottom: wp(2)
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp(4),
    fontFamily: "Poppins-Regular",
  },
});
