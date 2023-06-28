import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos } from '../features/todos/todosSlice';
import TodoEntry from './TodoEntry';

const TodoList = () => {
	const { todos } = useSelector((state) => state.todos);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	if (!todos) {
		return <h1>Loading!</h1>;
	}

	return (
		<div className='rounded-lg shadow-lg card bg-base-100 w-full'>
			<div className='card-body'>
				{todos.map((todo) => (
					<TodoEntry
						key={todo._id}
						todo={todo}
					/>
				))}
			</div>
		</div>
	);
};

export default TodoList;
