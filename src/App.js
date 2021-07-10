import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchTodos, createTodo, deleteTodo} from "./features/todos/todosSlice";

const CreateTodoForm = ({onSubmit}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !description || loading) return;

		try {
			setLoading(true)
			await onSubmit(title, description)
			setTitle('')
			setDescription('')
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="title"
				value={title}
				onChange={({target: {value}}) => setTitle(value)}
			/>
			<br/>
			<br/>
			<input
				type="text"
				placeholder="description"
				value={description}
				onChange={({target: {value}}) => setDescription(value)}
			/>
			<br/>
			<br/>
			<button type="submit" disabled={!title || !description || loading}>create todo</button>
		</form>
	)
}

const TodosList = ({todos, isLoading, onTodoDelete}) => {

	if (isLoading) return <h1>LOADING.....</h1>

	return (
		<div>
			{todos.map(todo => (
				<div key={todo.id}>
					<h4>{todo.title}</h4>
					<p>{todo.description}</p>
					<p>Is completed: {todo.completed.toString()}</p>
					<span>Created At: {new Date(todo.createdAt).toLocaleString()}</span>
					<button onClick={() => onTodoDelete(todo.id)}>delete!</button>
					<hr/>
				</div>
			))}
		</div>
	)
}

function App() {
	const {todos, isLoading} = useSelector(({todos}) => todos);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos())
	}, []);

	const onTodoCreate = async (title, description) => {
		if (!title || !description) return;

		await dispatch(createTodo({title, description}));
	}

	const onTodoDelete = (id) => dispatch(deleteTodo(id))

	return (
		<div className="App">
			<CreateTodoForm onSubmit={onTodoCreate}/>

			<TodosList todos={todos} isLoading={isLoading} onTodoDelete={onTodoDelete}/>
		</div>
	);
}

export default App;
