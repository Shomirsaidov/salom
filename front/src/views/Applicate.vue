<template>
	<div class="flex justify-center p-2">
		<div class="flex flex-wrap items-start space-x-10">


			<nav class="border-2 p-4 rounded-lg flex items-center space-x-4">
				<img :src="require(`@/assets/uploads/${chatData.picture}`)" width="60" alt=""/>
				<h1 class="font-bold text-2xl">{{ chatData.name }}</h1>
			</nav>

			<div class="flex flex-col justify-start">
				<div class="flex flex-col border-l-2 overflow-y-scroll mb-4 space-y-2 chatCont p-8 border-t-2 rounded-lg" style="max-height: 400px;">
					



					<div v-for="(message, index) in messages" :key="index" 
					:class="[messagesSTyle,message.sender == currentUser ? ownMessagesStyle : something]">
						<h2 class="text-md">{{ message.text }}</h2>
					</div>



				</div>
				<div class="flex items-stretch  w-100">
					<input type="text" placeholder="Введите сообщение..." style="outline: none;" class="w-full p-4 border-2 border-r-0 rounded-full rounded-r-none"
					v-model="messageInput">
					<button @click="sendMessage" class="border-2 border-l-0 p-2 rounded-full rounded-l-none">
						<img src="@/assets/send.svg" alt="" width="47">
					</button>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import '@/assets/tailwind.css'

	export default {
		components: {
			// NavBar
		},
		props: ['friend'],
		data: () => ({
			chatData: null,
			messages: null,
			messagesSTyle: ['bg-blue-600', 'text-white', 'p-2', 'rounded-lg', 'text-left', 'self-start'],
			ownMessagesStyle: ['bg-red-400','text-white', 'text-right', 'self-end'],
			currentUser: JSON.parse(localStorage.salom).username,
			messageInput: null,
		}),
		beforeMount() {
			var friendName = this.$route.params.friend
			this.chatData = this.$store.state.contactsList.filter(user => user.name == friendName)[0]
			console.log(this.chatData.location)
			this.loadChats()
			console.log(this.messages)
		},
		methods: {
			loadChats() {
				this.$store.commit('connectFriend', {friend: this.chatData.name})	
				console.log(this.chatData.name)	
				this.messages = this.$store.getters.loadChats
			},
			sendMessage() {
				this.messages.push({text: this.messageInput, time: '18:04', sender: 'Shomirsaidov Abubakr', receiver: 'Zainiddinov Zainiddin'})

				let scrollHeight = document.querySelector('.chatCont').scrollHeight;
				setTimeout(()=> document.querySelector('.chatCont').scrollTo(0,scrollHeight), 100)
				this.messageInput = ''
			}


		},
		mounted() {
			document.querySelector('.chatCont').scrollTo(0,1e8)
		}

	}
</script>

<style lang="scss">
	.chatCont::-webkit-scrollbar {
		width: 4px;
	}
	.chatCont::-webkit-scrollbar-track {
		background: whitesmoke;
	}
	.chatCont::-webkit-scrollbar-thumb {
  		background-color: skyblue;    /* цвет бегунка */
  		border-radius: 40px;       /* округлось бегунка */
  		border: 3px solid skyblue;  /* отступ вокруг бегунка */
	}
</style>

