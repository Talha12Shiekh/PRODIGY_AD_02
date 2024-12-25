import TodoList from './Components/TodoList'
import { store } from  "./Redux/store"
import { Provider, useSelector } from 'react-redux';

export const useGetTodos = () => {
  return useSelector((state) => state.todosReducer.todos);
} 

const App = () => {
  return (
    <Provider store={store}>
      <TodoList/>
    </Provider>
  )
}

export default App