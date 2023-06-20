import Todos from './Todos';
import TodoEntry from './TodoEntry';

const TodoList = () => {
	return (
		<div className='rounded-lg shadow-lg card bg-base-100 w-5/6'>
			<div className='card-body'>
				{Todos.map((todo) => (
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
