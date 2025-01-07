import { store } from "./Redux/store"
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import { setuserimage, setUserLoading } from "./Redux/Slices/UserSlice";

export const useGetTodos = () => {
  return useSelector((state) => state.todosReducer.todos);
}
export const useIsEditing = () => {
  return useSelector((state) => state.todosReducer.isEditing);
}
export const useGetEditKey = () => {
  return useSelector((state) => state.todosReducer.editkey);
}
export const useGetUserLoading = () => {
  return useSelector((state) => state.userReducer.userLoading);
}
export const useGetUserImage = () => {
  return useSelector((state) => state.userReducer.userimage);
}
export const useGetUser = () => {
  return useSelector((state) => state.userReducer.user);
}

export const useSetUserLoading = () => {
  const dispatch = useDispatch();

  return (userloading) => {
    dispatch(setUserLoading(userloading));
  };
}
export const useSetUserImage = () => {
  const dispatch = useDispatch();

  return (image) => {
    dispatch(setuserimage(image));
  };
}

const App = () => {

  return (
    <NavigationContainer
    linking={{
      prefixes: ["myapp://"],
      config: {
        screens: {
          ResetPassword: "resetpassword",
        },
      },
    }}
    >
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NavigationContainer>

  )
}

export default App