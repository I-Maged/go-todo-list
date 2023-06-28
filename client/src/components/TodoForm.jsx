import { useState } from 'react';
import { addTodo } from '../features/todos/todosSlice';
import { useDispatch } from 'react-redux';

const TodoForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [subject, setSubject] = useState('');

	const submitTodo = (e) => {
		e.preventDefault();
		dispatch(addTodo({ title, subject }));
	};

	return (
		<form
			onSubmit={submitTodo}
			className='mb-4 flex justify-between w-full'
		>
			<input
				type='text'
				placeholder='Title'
				id='title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='input input-bordered input-primary w-full max-w-xs'
			/>
			<input
				type='text'
				placeholder='Subject'
				id='subject'
				value={subject}
				onChange={(e) => setSubject(e.target.value)}
				className='input input-bordered input-primary w-full max-w-xs'
			/>
			<button
				type='submit'
				className='btn btn-success'
			>
				Add Todo
			</button>
		</form>
	);
};

export default TodoForm;
