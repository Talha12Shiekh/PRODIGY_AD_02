import { store } from "./Redux/store"
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';

export const useGetTodos = () => {
  return useSelector((state) => state.todosReducer.todos);
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