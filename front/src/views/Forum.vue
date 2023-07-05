<template>
	<div class="flex justify-center p-2  mb-8">
		<div class="flex flex-wrap space-x-10" style="margin-top: 110px">


			<div class="flex flex-col justify-between items-end">
				<nav class="border-2 p-4 rounded-lg flex items-center space-x-4">
					<img :src="require(`@/assets/uploads/${chatData.avatar}`)" width="60" alt=""/>
					<div>
						<h1 class="font-bold text-2xl">{{ chatData.username }}</h1>
<!-- 						<h3 class="text-xs">{{ friendStatus }}</h3>
 -->					</div>
				</nav>

				<div class="flex items-center">
					<form class="grid" method="POST" action="http://localhost:7777/chats/loadPhoto" 
					enctype="multipart/form-data" id="photo_form">
						<input type="file" name="photo" id='photo_input'>
						<input type="hidden" v-model="friendName" name="receiver">
						<input type="hidden" v-model="currentUser" name="sender">
						<input type="hidden" v-model="now" name="time">
<!-- 						<input type="submit" value="Отправить файл">
 -->					</form>
					<button @click="scrollBlock">
						<img src="@/assets/arrow-down.svg" alt="" width="50">
					</button>
				</div>
			</div>

			<div class="flex flex-col justify-start" style="max-width: 380px">
				<div class="flex flex-col border-l-2 overflow-y-scroll mb-4 space-y-2 chatCont p-8 border-t-2 rounded-lg" style="max-height: 400px;">
					

					<div v-for="(message, index) in messages" :key="index" 
					:class="[messagesSTyle,message.sender == currentUser ? ownMessagesStyle : 0]">
						<h1 class="text-lg mb-2 font-bold">- {{ message.sender }}</h1>
						<h2 class="text-md">{{ message.text }}</h2>
						<h6 class="text-xs">{{ message.time.slice(0,5) }}</h6>
						<img @click="reqFull" v-if="message.image !== 'NO IMAGE'" :src="require(`@/assets/uploads/${message.image}`)" alt="">
						<video @click="reqFull" v-if="message.image.endsWith('.mp4') || message.image.endsWith('.3gp')" :src="require(`@/assets/uploads/${message.image}`)" controls></video>
					</div>

				</div>

				<div class="flex items-stretch  w-100" v-if="chatType !== 'state'">
					<input type="text" placeholder="Введите сообщение..." style="outline: none;" class="w-full p-4 border-2 border-r-0 rounded-full rounded-r-none"
					v-model="messageInput" id='messageInput'>
					<button @click="sendMessage" class="border-2 border-l-0 p-2 rounded-full rounded-l-none">
						<img src="@/assets/send.svg" alt="" width="47">
					</button>
				</div>

				<div v-if="chatType == 'state'">
					<select class="border-2 border-r-0 p-4 rounded-md" v-model="appType">
						<option class="text-lg" disabled selected>Выберите тип заяки</option>
						<option class="text-lg p-2 border-t-2" v-for="(option, index) in optionsOfApplication" :key="index">{{ option }}</option>						
						

					</select>
					<button class="hover:bg-black-1000 p-4 font-bold rounded-xl bg-green-800 text-white rounded-t-none" @click="sendMessage">
						Подать заяление "{{ appType }}"
					</button>
				</div>



			</div>

		</div>
	</div>
</template>
<script>
	import '@/assets/tailwind.css'
	import axios from 'axios'



	// let r = await axios.post('http://localhost:7777/chats/getChat', {
	// 				sender: JSON.parse(localStorage.salom).username,
	// 				receiver: this.friendName
	// 			})
	// let Messages = r.data

	// let Messages = null
	const thisUser = JSON.parse(localStorage.salom).username
	var ws = null;
	


	// ws.onmessage = (message) => {

	// }

	export default {
		components: {
			// NavBar
		},
		props: ['friend'],
		data: () => ({
			chatData: undefined,
			messages: null,
			messagesSTyle: ['bg-blue-600', 'text-white', 'p-2', 'rounded-lg', 'text-left', 'self-start'],
			ownMessagesStyle: ['bg-red-400','text-white', 'text-right', 'self-end'],
			currentUser: JSON.parse(localStorage.salom).username,
			messageInput: '',
			friendName: 'forum',
			fileSelected: '',
			now: new Date().toLocaleTimeString(),
			friendStatus: 'checking',
			chatType: 'undefined',
			appType: '',
			optionsOfApplication: null
		}),
		beforeMount() {
			this.loadChatData()			
			// this.loadChats()
		},
		methods: {
			async loadChatData() {
				let r = await axios.get('http://localhost:7777/auth/getUserInfo/' + this.friendName)
				this.chatData = r.data[0]
				this.chatType = this.chatData.type
				this.optionsOfApplication = this.chatData.contacts.split(',')
				console.log(this.chatData)
			},
			async loadMessages() {
				console.log('Called !')
				let r = await axios.post('http://localhost:7777/chats/loadForum', {
					sender: JSON.parse(localStorage.salom).username,
					receiver: this.friendName
				})
				this.messages = r.data
				console.log(this.messages)
			},


			sendMessage() {
				if(this.messageInput !== '') {

					let time = new Date().toLocaleTimeString()

					let obj = {text: this.messageInput, time: time, sender: this.currentUser, receiver: 'forum', image: 'NO IMAGE'}
					this.messages.push(obj)
					ws.send(JSON.stringify(obj))

					let scrollHeight = document.querySelector('.chatCont').scrollHeight;
					setTimeout(()=> document.querySelector('.chatCont').scrollTo(0,scrollHeight), 100)
					this.messageInput = ''
				}
				if(document.getElementById("photo_input").value !== '') {
					console.log('hi')
					this.now = new Date().toLocaleTimeString()
					// document.getElementById("photo_form").submit()
					this.submitForm()
				}
			},
			submitForm() {

				// let imageName = document.getElementById("photo_input").value.split('\\')
				// imageName = this.now + imageName[imageName.length - 1].toLowerCase()



				var formData = new FormData();
				var File = document.getElementById("photo_input")
				formData.append('photo', File.files[0])
				formData.append('sender', this.currentUser)
				formData.append('receiver', this.friendName)
				formData.append('time', this.now)
				// formData.append('imageName', imageName)


				axios.post('http://localhost:7777/chats/loadPhoto', formData, {
					headers: {
						'Content-Type': 'miltipart/form-data'
					}
				})


				ws.send(JSON.stringify({receiver: this.friendName,sender: this.currentUser, type: 'for refresh'}))
				location.reload()


				
				// console.log(imageName)
				// let obj = {text: '', time: this.now, sender: this.currentUser, receiver: this.friendName, image: imageName}


				// this.messages.push(obj)


			},
			scrollBlock() {
				document.querySelector('.chatCont').scrollTo(0,1e8)
			},
			reqFull(event) {
				event.target.requestFullscreen()
			}


		},
		watch: {
			messages(newObj, oldObj) {
				document.querySelector('.chatCont').scrollTo(0,1e8)	
			}
		},
		mounted() {
			// setInterval(this.loadMessages(), 3000)
			this.loadMessages()

			setTimeout(() => {
				ws = new WebSocket('ws://localhost:4440', thisUser)
			}, 2000)
			
			setTimeout(() => document.querySelector('.chatCont').scrollTo(0,1e8),300)
			setTimeout(() => {
				if(this.chatType !== 'state') {
					document.querySelector('#messageInput').focus()
				}
			},300)

			setTimeout(() => {
				ws.onmessage = (message) => {

					console.log(message.data)

					if(message.data == 'refresh !') {
						location.reload()
					} else if(message.data == 'online' || message.data == 'offline') {
						this.friendStatus = message.data
					} else {

						console.log('heeeeeeeeeeeyyyyyy')
						console.log(JSON.parse(message.data));
						this.messages.push(JSON.parse(message.data))
						document.querySelector('.chatCont').scrollTo(0,1e8)
					}
				}


				ws.send(JSON.stringify({receiver: this.friendName,sender: this.currentUser, type: 'line check'}))
			}, 3000)



		},



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

