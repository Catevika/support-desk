import axios from 'axios';

const API_URL = '/api/users';

// * Get userList
const getUserList = async () => {
	const response = await axios.get(API_URL + '/all');
	return response.data;
};

const userService = {
	getUserList
};

export default userService;
