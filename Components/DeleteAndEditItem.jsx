import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RED_COLOR } from '../Constants';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/FontAwesome5';
import { InputContext } from '../Screens/TodoScreen';
import { useGetTodos } from '../App';
import { useDispatch } from 'react-redux';
import { deleteTodos, editTodos, handleCangeEditSettings } from '../Redux/Slices/TodosSlice';


const DeleteAndEditItem = ({
  data,
  rowMap,
  setvalue,
}) => {
  const inputRef = useContext(InputContext);
  const todos = useGetTodos();
  const dispatch = useDispatch();

  function handleDeleteItem(rowMap, dltkey) {
    const deleteTodo = todos.find(t => t.key === dltkey);

    Alert.alert(`${deleteTodo.todo}`, 'Are you sure you want to delete', [
      {
        text: 'NO',
        onPress: () => { },
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => deleteItem(rowMap, dltkey) },
    ]);
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = async (rowMap, dltkey) => {
    closeRow(rowMap, dltkey);
    dispatch(deleteTodos({ key: dltkey }))
    ToastAndroid.show('Item deleted Successfully', ToastAndroid.LONG);
  };

  function handleEditItem(rowMap, edtkey) {
    closeRow(rowMap, edtkey);
    const editTodo = todos.find(t => t.key === edtkey);
    setvalue(editTodo.todo);
    inputRef?.current?.focus();
    dispatch(handleCangeEditSettings({ isEditing: true,editkey:editTodo.key }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.dltbtncntnr}>
        <TouchableOpacity
          onPress={() => handleDeleteItem(rowMap, data.item.key)}>
          <View style={styles.dltbtn}>
            <DeleteIcon name="delete" size={30} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.edtbtncntnr}>
        <TouchableOpacity onPress={() => handleEditItem(rowMap, data.item.key)}>
          <View style={styles.edtbtn}>
            <EditIcon name="pencil-alt" size={23} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAndEditItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dltbtncntnr: {
    flex: 1,
    backgroundColor: RED_COLOR,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: wp(3),
  },
  edtbtncntnr: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: wp(3),
  },
});
