import React from 'react';

const TodoEntry = ({ todo }) => {
	return (
		<div className='mb-2 rounded-md card bg-base-200 hover:bg-base-300'>
			<div className='card-body'>
				<h3 className='mb-2 text-xl font-semibold'>{todo.title}</h3>
				<p className='mb-3'>{todo.subject}</p>
			</div>
			<div className='card-actions justify-end mr-3 mb-3'>
				<button className='btn btn-primary'>Edit</button>
				<button className='btn btn-secondary'>Delete</button>
			</div>
		</div>
	);
};

export default TodoEntry;
