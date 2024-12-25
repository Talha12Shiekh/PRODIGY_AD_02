import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  isEditing:false,
  editkey:null
}

export const TodosSlice = createSlice({
  name: 'todosSlice',
  initialState,
  reducers: {
    addTodos: (state, { payload }) => {
      if(state.isEditing){
        const editTodoIndex = state.todos.findIndex(t => t.key === payload.key);
        if (editTodoIndex !== -1) {
          state.todos[editTodoIndex].todo = payload.value;
        }
      }else {
        state.todos = [...state.todos, { todo: payload.data, key: payload.key }]
      }
    },
    deleteTodos: (state, { payload }) => {
      const newtodos = [...state.todos];
      const deletedTodos = newtodos.filter(t => t.key !== payload.key);
      state.todos = deletedTodos;
    },
    handleCangeEditSettings : (state,{payload}) => {
      state.isEditing = payload.isEditing;
      state.editkey = payload.editkey;
    }
  },
})

export const { addTodos, deleteTodos , handleCangeEditSettings } = TodosSlice.actions;

export default TodosSlice.reducer

