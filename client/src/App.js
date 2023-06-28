import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
const App = () => {
	return (
		<>
			<Header />
			<div className='flex items-center justify-center w-full my-4'>
				<div className='flex flex-col w-5/6'>
					<TodoForm />
					<TodoList />
				</div>
			</div>
		</>
	);
};

export default App;
