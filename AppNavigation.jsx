import TodoList from './Screens/TodoScreen'
import { useDispatch, useSelector } from 'react-redux';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import { setuser } from './Redux/Slices/UserSlice';
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import ProfileImage from "./assets/images/profile.png";



const AppNavigation = () => {
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  const [userimage,setuserimage] = useState(ProfileImage);

  function onAuthStateChanged(user) {
    console.log(user);
    dispatch(setuser(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TodosScreen">
        <Stack.Screen name="TodosScreen" >
        {props => <TodoList userimage={userimage} {...props}/>}
          </Stack.Screen>
      </Stack.Navigator>
    )
  } else {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" >
        {
          props => <WelcomeScreen setuserimage={setuserimage} {...props}/>
        }
      </Stack.Screen>
      <Stack.Screen name="SignIn" >
        {
          props => <SignInScreen setuserimage={setuserimage} {...props}/>
        }
      </Stack.Screen>
      <Stack.Screen name="SignUp" >
        {
          props => <SignUpScreen setuserimage={setuserimage} {...props}/>
        }
      </Stack.Screen>
    </Stack.Navigator>
    )
  }

}

export default AppNavigation;