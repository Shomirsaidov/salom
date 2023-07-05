import { createStore } from 'vuex'
import messagesModule from './modules/messages'
import peopleModule from './modules/people.js'
import departmentsModule from './modules/departments.js'
import axios from 'axios'


export default createStore({
  state: () => ({
    counter: 0,
    
    
    currentUser: JSON.parse(localStorage.salom).username,
    friendConnected: null,
    theTab: 'home',


  }),
  mutations: {
    add(state, data) {
      state.counter+= data.value
    }, 
    connectFriend(state, data) {
      state.friendConnected = data.friend
    }
  },
  getters: {
    
    async loadChatData(state) {
      let r = await axios.get('http://localhost:7777/auth/getUserInfo/' + this.friendName)
      return r
    }

    
    // loadMessages(state) {
      
    //   // while creating a server you will have make a request to the REST api from this method instead of 
    //   // loading existing data in state, the chatsData object is created just for testing.
    //   return state.chatsData
    // }

  },
  actions: {
  },
  modules: {
    messagesModule,
    peopleModule,
    departmentsModule
  }
})
