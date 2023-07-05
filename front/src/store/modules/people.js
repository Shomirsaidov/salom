export default {
	state: () => ({
		peopleData: [
	        {name: 'Mirzoev Munir', 
	        job: 'IT', 
	        bio: 'Помогу словом и делом ...', 
	        picture: 'user2.jpg'},
	        {name: 'Tursunov Daler', 
	        job: 'Design', 
	        bio: 'Создам продающий интерфейс', 
	        picture: 'user4.jpg'},
	        {name: 'Solieva Madina', 
	        job: 'National Clothing', 
	        bio: 'Атласу адрас чакан ва сузанидузи бо нарххои дастрас', 
	        picture: 'user3.jpg'},
	        {name: 'Akhmedov Abdullo', 
	        job: 'Instructor', 
	        bio: 'Муаллими забони немиси. Омузиш дар муддати кутох', 
	        picture: 'user5.jpg'},
	        // {name: 'Zayniddin', 
	        // job: 'Стриптизёр', 
	        // bio: 'Хотите увидеть чёрный член! свяжитесь !', 
	        // picture: 'user6.jpg'},
    	],
    	
	}),
	getters: {
		getPeopleData(state) {
			return state.peopleData
		}

	},
	mutations: {
	
	}

}