import axios from 'axios'

export default {
	state: () => ({
		departments: [
	        {username: 'Вазорати Маориф', avatar: 'maorif.jpg',status: 'На рассмотрении'},
	        {username: 'Вазорати Адлия', avatar: 'adliya.jpg',status: 'Принято'},
	        {username: 'Корхои Дохили', avatar: 'vkd.jpg',status: 'Принято'},
	        {username: 'Вазорати Тандурусти', avatar: 'medical.jpg',status: 'Отклонено'},

    	],
    	
	}),
	getters: {
		departments(state) {
			return state.departments	
		}

	},
	mutations: {
	
	}

}