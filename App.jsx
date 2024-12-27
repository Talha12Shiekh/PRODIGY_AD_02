import TodoList from './Screens/TodoScreen'
import { store } from "./Redux/store"
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';


export const useGetTodos = () => {
  return useSelector((state) => state.todosReducer.todos);
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="TodosScreen" component={TodoList} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  )
}

export default App