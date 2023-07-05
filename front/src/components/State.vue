<template>
	<div class="grid justify-center items-center" style="padding-top: 120px">
		<h1 class="text-xl">Заявления</h1>
		<div class="flex my-8">
			<NavMessage/>
		</div>
		<div class="grid grid-cols-2">


			<div v-if="!loaded" :style="{display: 'flex', justifyContent: 'cenetr',flexDirection: 'column'}">
	              <div id="loader"></div>
	              <h2 :style="{color: '#fff'}">Загрузка...</h2>
	        </div>


			<div 
				v-for="(contact, index) in data" 
				:key="index"
				@click="navigateToChat(contact.username)"
				class="border-2 rounded-2xl p-4 flex items-center space-x-4 mb-2 mr-2 cursor-pointer hover:shadow-xl">
				<img :src="require(`@/assets/${contact.avatar}`)" width="40">
				<div class="space-y-1">
					<h2 class="text-xl font-bold">{{ contact.username }}</h2>
					<h4 :class="[{'text-green-500': contact.status == 'Принято'}, {'text-red-500': contact.status == 'Отклонено'}]">{{ contact.status }}</h4>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import '@/assets/tailwind.css'
	import '@/assets/customStyles.css'
	import NavMessage from './NavMessage.vue'

	import axios from 'axios'

	export default {
		components: {
			NavMessage
		},
		data: () => ({
			data: null,
			loaded: false
		}),
		methods: {
			navigateToChat(toSpeakWith) {
				this.$router.push({path: '/chat',name: 'chat', params: {friend: toSpeakWith}})
			},
			async load() {
				// let r = await this.$store.getters.contactsList
				// let r = await axios.post('http://localhost:7777/state/getDepartments', {
    //     			username: JSON.parse(localStorage.salom).username
    //   				})
      			this.data = this.$store.getters.departments
      			this.loaded = true
				console.log(this.data)
				console.log('Hi')
			},


		},
		beforeMount() {
			this.load()
		}
	}
</script>


<style>
	
</style>






