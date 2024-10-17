import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RED_COLOR} from '../Constants';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from 'react-native-vector-icons/FontAwesome5';
import { InputContext } from './TodoList';

const DeleteAndEditItem = ({data, rowMap,todos,settodos,setisEdited,setvalue,seteditId}) => {

  const inputRef = useContext(InputContext);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteItem = (rowMap, dltkey) => {
    closeRow(rowMap, dltkey);
    const newData = [...todos];
    const deletedTodos = newData.filter(t => t.key !== dltkey);
    settodos(deletedTodos);
  };

  function handleEditItem(rowMap, edtkey){
    closeRow(rowMap, edtkey);
    setisEdited(true);
    const newData = [...todos];
    const editTodoIndex = newData.findIndex(t => t.key === edtkey);
    const todotoedit = newData[editTodoIndex];
    console.log("Key" + todotoedit.key);
    setvalue(todotoedit.todo)
    inputRef?.current?.focus()
    seteditId(todotoedit.key)
  }

  return (
    <View style={styles.container}>
      <View style={styles.dltbtncntnr}>
        <TouchableOpacity onPress={() => deleteItem(rowMap, data.item.key)}>
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
    marginVertical: hp(0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
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
