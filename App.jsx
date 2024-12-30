import { store } from "./Redux/store"
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import { setUserLoading } from "./Redux/Slices/UserSlice";

export const useGetTodos = () => {
  return useSelector((state) => state.todosReducer.todos);
}
export const useGetUserLoading = () => {
  return useSelector((state) => state.userReducer.userLoading);
}

export const useSetUserLoading = () => {
  const dispatch = useDispatch();

  return (userloading) => {
    dispatch(setUserLoading(userloading));
  };
}

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NavigationContainer>

  )
}

export default App