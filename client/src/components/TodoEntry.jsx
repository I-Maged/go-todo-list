import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todos/todosSlice';
import { handleEdit } from '../features/todos/todosSlice';

const TodoEntry = ({ todo }) => {
	const dispatch = useDispatch();

	const handleDelete = (todoID) => {
		try {
			dispatch(deleteTodo(todoID));
		} catch (err) {
			console.error('Failed to delete Todo: ', err);
		}
	};

	return (
		<div className='mb-2 rounded-md card bg-base-200 hover:bg-base-300'>
			<div className='card-body'>
				<h3 className='mb-2 text-xl font-semibold'>{todo.title}</h3>
				<p className='mb-3'>{todo.subject}</p>
			</div>
			<div className='card-actions justify-end mr-3 mb-3'>
				<button
					onClick={() => dispatch(handleEdit(todo))}
					className='btn btn-primary'
				>
					Edit
				</button>
				<button
					onClick={() => handleDelete(todo._id)}
					className='btn btn-secondary'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoEntry;
