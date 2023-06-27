import axios from 'axios';

const API_URL = 'http://localhost:8080/';
const config = {
	reponseType: 'json',
};

const getTodos = async () => {
	const response = await axios.get(API_URL, config);
	return response.data;
};

const deleteTodo = async (todoID) => {
	await axios.delete(`${API_URL}${todoID}`, config);
	return todoID;
};

const todosService = {
	getTodos,
	deleteTodo,
};

export default todosService;
