import axios from 'axios';

const API_URL = 'http://localhost:8080/';
const config = {
	reponseType: 'json',
};

const getTodos = async () => {
	const response = await axios.get(API_URL, config);
	return response.data;
};

const addTodo = async (todoData) => {
	const response = await axios.post(API_URL, todoData, config);

	const newData = {
		_id: response.data.InsertedID,
		title: todoData.title,
		subject: todoData.subject,
	};

	return newData;
};
const updateTodo = async (todoData) => {
	await axios.put(`${API_URL}${todoData.id}`, todoData, config);

	const newData = {
		_id: todoData.id,
		title: todoData.title,
		subject: todoData.subject,
	};

	return newData;
};

const deleteTodo = async (todoID) => {
	await axios.delete(`${API_URL}${todoID}`, config);
	return todoID;
};

const todosService = {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
};

export default todosService;
