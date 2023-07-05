export default {
	state: () => ({
		polls: [
	        {question: 'Кто за то чтобы службп в армии была однолетней ?', author: 'Анонимный опрос',
	        answers: ['За','Против']},
	        {question: 'What is your name ?', author: 'Анонимный опрос',answers: ['Abubakr','Komiljon','Zayniddin']}

    	],
    	
	}),
	getters: {
		polls(state) {
			return state.polls
		}

	},
	mutations: {
		
	}

}