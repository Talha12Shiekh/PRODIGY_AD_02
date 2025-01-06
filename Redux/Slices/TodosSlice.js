import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore, { getDocs, query, where } from '@react-native-firebase/firestore';
import { useGetUser } from '../../App';
import { ToastAndroid } from 'react-native';

const initialState = {
  todos: [],
  isEditing: false,
  editkey: null
}

const todosRefernce = firestore().collection("Todos");

export const addTodos = createAsyncThunk(
  "addTodos",
  async ({value,id}) => {
    await todosRefernce.add({
      value,
      id,
    });
  }
)



export const fetchTodos = createAsyncThunk(
  "fetchTodos",
  async (userid) => {
      const q = query(todosRefernce, where("id", "==", userid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(qry => {
        const todos = qry.data() ;
        data.push({ ...todos, id: qry.id });
      });
      return data;
  }
)



export const TodosSlice = createSlice({
  name: 'todosSlice',
  initialState,
  reducers: {
    deleteTodos: (state, { payload }) => {
      const newtodos = [...state.todos];
      const deletedTodos = newtodos.filter(t => t.key !== payload.key);
      state.todos = deletedTodos;
    },
    handleCangeEditSettings: (state, { payload }) => {
      state.isEditing = payload.isEditing;
      state.editkey = payload.editkey;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      
    });
    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.todos = [...state.todos,action.meta.arg];
    });
  },
})

export const { deleteTodos, handleCangeEditSettings } = TodosSlice.actions;

export default TodosSlice.reducer

