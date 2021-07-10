import {createSlice} from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		isLoading: false
	},
	reducers: {
		setLoadingTrue(state) {
			state.isLoading = true
		},
		setLoadingFalse(state) {
			state.isLoading = false
		},
		pushNewTodo(state, action) {
			state.todos.push(action.payload)
		},
		addTodos(state, action) {
			state.todos = action.payload
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(el => el.id !== action.payload)
		}
	}
})

export const {setLoadingTrue, setLoadingFalse, pushNewTodo, addTodos, removeTodo} = todosSlice.actions

export const fetchTodos = () => async dispatch => {
	try {
		dispatch(setLoadingTrue())
		const response = await fetch('http://localhost:8888/get-todos');
		const data = await response.json();
		dispatch(addTodos(data))
	} catch (e) {
		console.log(e)
	} finally {
		dispatch(setLoadingFalse())
	}
};

export const createTodo = ({title, description}) => async dispatch => {
	const response = await fetch('http://localhost:8888/create-todo', {
		method: 'POST',
		body: JSON.stringify({title, description}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	const data = await response.json();
	dispatch(pushNewTodo(data))
};

export const deleteTodo = (id) => async dispatch => {
	const response = await fetch('http://localhost:8888/delete-todo/' + id, {
		method: 'DELETE',
	})

	await response.json();
	dispatch(removeTodo(id))
};

export default todosSlice.reducer
