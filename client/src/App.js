import Header from './components/Header';
import TodoList from './components/TodoList';
const App = () => {
	return (
		<>
			<Header />
			<div className='my-4 flex flex-col items-center'>
				<TodoList />
			</div>
		</>
	);
};

export default App;
