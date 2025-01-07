import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore, { getDocs, query, where } from '@react-native-firebase/firestore';

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

export const deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (key) => {
    await todosRefernce.doc(key).delete();
  }
)


export const editTodos = createAsyncThunk(
  "editTodos",
  async ({key,value}) => {
    await todosRefernce.doc(key).update({value});
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
    seteditkey: (state, { payload }) => {
      state.editkey = payload;
    },
    setisEditing: (state, { payload }) => {
      state.isEditing = payload;
    },
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

export const { seteditkey,setisEditing } = TodosSlice.actions;

export default TodosSlice.reducer;