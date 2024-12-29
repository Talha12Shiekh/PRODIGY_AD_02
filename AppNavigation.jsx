import TodoList from './Screens/TodoScreen'
import { useDispatch, useSelector } from 'react-redux';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import { setuser } from './Redux/Slices/UserSlice';
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';


const AppNavigation = () => {
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  function onAuthStateChanged(user) {
    dispatch(setuser(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TodosScreen">
        <Stack.Screen name="TodosScreen" component={TodoList} />
      </Stack.Navigator>
    )
  } else {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
    )
  }

}

export default AppNavigation;
