<template>
	<div class="flex justify-center">
		<div style="max-width: 600px; margin-top: 110px;" >

			<h1 class="text-xl font-black my-2 mb-4">Salom<span class="font-light"> People</span></h1>
			<h1 class="font-light text-lg">{{ message }}</h1>

			

			<div class="flex items-stretch justify-center my-6">
				<input type="text" placeholder="Молодой учитель английского" class="outline-0 rounded-full rounded-r-none p-2 border-2 text-center text-xl">
				<button class="btn bg-blue-700 rounded-full rounded-l-none p-2 px-8 text-md text-white hover:bg-blue-500 font-black">
					<img src="@/assets/search-normal-1.svg" alt="Искать" width="30">
				</button>
			</div>


			<div v-if="!loaded" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
		        <div id="loader"></div>
		    </div>


			<div class="shadow-xl space-y-2 p-2 my-8">

				<div v-for="(person,index) in $store.getters.getPeopleData" :key="index"
				@click="navigateToChat(person.name)" class="p-4 border-2 flex items-center space-x-4 rounded-xl cursor-pointer hover:shadow-md">
					<img :src="require(`@/assets/uploads/${person.picture}`)" class="rounded-xl" width="50" alt="">
					<div>
						<h1 class="text-lg font-bold text-left mb-2">{{ person.name }}<span class="font-light text-sm bg-green-300 text-green-900 ml-4 p-2 rounded-full">{{ person.job }}</span></h1>
						<h2 class="text-md text-left">{{ person.bio }}</h2>
					</div>
				</div>

			</div>


		</div>
	</div>
</template>

<script>
	import '@/assets/tailwind.css'
	import '@/assets/customStyles.css'

	import NavBar from '@/components/NavBar.vue'
	import axios from 'axios'


	export default {
		components: {
			NavBar
		},
		data: () => ({
			message: 'Вы можете найти любого человека по разным сферам занятости и социальному значению...',
			loaded: false,
		}),
		methods: {
			async signIn() {
				await axios.post('http://localhost:7777/state/makeApplication', {
					department: 'ЗАГС',
					referrer: 'Dilnoza and Shomirsaidov',
					type: 'Регистрация бракосочетания',
					time: '20.05.2030',
				})


			},
			navigateToChat(toSpeakWith) {
				this.$router.push({path: '/chat',name: 'chat', params: {friend: toSpeakWith}})
			},

			async signIn2() {
				await axios.post('http://localhost:7777/chats/getChat', {
					sender: 'shomirsaidov',
					receiver: 'test2008',
					
				})


			},
			async a() {
				// let r = await this.$store.getters.contactsList
				let r = await axios.post('http://localhost:7777/auth/getContacts', {
        	username: 'Komiljon'
      	})
				console.log(r)
			},
			note() {
				Notification.requestPermission()
				var notif = new Notification('Hi', {
					tag: 'ache-mail',
					body: 'I love you very much',
					icon: '@/assets/logo.png'
				})
			}


		},
		beforeMount() {
			this.$store.state.theTab = 'search'
			console.log(this.$store.state.theTab)
		},
		mounted() {
			// this.signIn()
			// this.signIn2()
			this.note()
			this.a()
		}


	}
</script>




