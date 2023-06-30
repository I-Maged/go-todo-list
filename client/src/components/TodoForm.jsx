import { useEffect, useState } from 'react';
import { addTodo } from '../features/todos/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../features/todos/todosSlice';

const TodoForm = () => {
	const { edit } = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [subject, setSubject] = useState('');

	useEffect(() => {
		if (edit) {
			setTitle(edit.title);
			setSubject(edit.subject);
		}
	}, [edit]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (edit) {
			dispatch(updateTodo({ id: edit._id, title, subject }));
		} else {
			dispatch(addTodo({ title, subject }));
		}

		setTitle('');
		setSubject('');
	};

	// const handleAdd = (e) => {
	// 	e.preventDefault();
	// 	dispatch(addTodo({ title, subject }));
	// };

	return (
		<form
			onSubmit={handleFormSubmit}
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
				{edit ? 'Edit' : 'Add'}
			</button>
		</form>
	);
};

export default TodoForm;
