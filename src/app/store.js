import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import todosSlice from "../features/todos/todosSlice";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		todos: todosSlice
	}
});
