import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState,createContext} from 'react';
import {BG_COLOR} from '../Constants';
import TodosContainer from '../Components/TodosContainer';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TodoInput from '../Components/TodoInput';
import LogoAndProfile from '../Components/LogoAndProfile';

export const InputContext = createContext(null);

const TodoList = ({userimage}) => {
  const [value, setvalue] = useState('');
  const inputRef = useRef(null);

  return (
    <InputContext.Provider value={inputRef}>
    <View style={styles.container}>
      <LogoAndProfile
      userimage={userimage}
      />
      <TodoInput
        value={value}
        setvalue={setvalue}
      />
      <TodosContainer
        setvalue={setvalue}
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
