<template>
	<div class="flex justify-center">
		<div style="max-width: 600px; margin-top: 110px">

			<h1 class="text-xl font-black my-2 mb-4">Salom<span class="font-light"> Invest</span></h1>
			<h1 class="font-light text-lg">{{ message }}</h1>
			<div class="flex items-stretch justify-center my-6">
				<input type="text" placeholder="Молодой учитель английского" class="outline-0 rounded-full rounded-r-none p-2 border-2 text-center text-xl">
				<button class="btn bg-blue-700 rounded-full rounded-l-none p-2 px-8 text-md text-white hover:bg-blue-500 font-black">
					<img src="@/assets/search-normal-1.svg" alt="Искать" width="30">
				</button>
			</div>

			<div class="grid">

				<div v-if="!loaded" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
		              <div id="loader"></div>
		        </div>

				<div 
				v-for="(project,key) in data" :key="key"
				class="bg-white rounded-xl p-6 border-2 space-y-4 mb-8">
						<h1 class="text-xl font-black">{{ project.title }}</h1>
						<div class="flex justify-center">
							<img :src="require(`@/assets/uploads/${project.images}`)" width="100" />
						</div>

						<div class="flex items-center bg-blue-100 space-x-2 p-2 rounded-xl">
							<img :src="require(`@/assets/uploads/profile-circle.svg`)" width="40">
							<h2 class="text-grey text-lg text-blue">{{project.creator }}</h2>
						</div>

						<p class="text-md">{{ project.description }}</p>

						<div class="flex items-center space-x-2">
							<img src="@/assets/coin.svg" width="30">
							<h3 class="font-light text-xl">Капитализация: 
								<span class="font-bold">{{ project.capital }} $</span></h3>
						</div>

						<div class="flex items-start space-x-2">
							<img src="@/assets/bag-2.svg" width="30">
							<h3 class="font-light text-xl text-start">Инвесторы: 
								<span class="font-semibold text-md">{{ project.investors }}</span></h3>
						</div>

						<div class="flex justify-end space-x-4">
							<div class="rounded-xl p-4 bg-red-100 pointer hover:bg-red-200"><img src="@/assets/heart-add.svg" width="30"></div>
							<button class="text-xl p-4 rounded-full bg-green-600 hover:bg-green-700 text-white">Финансировать</button>
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
			message: 'Интересные и перспективные проекты нуждающиеся в вашей поддержке',
			data: null,
			loaded: false
		}),
		methods: {

			note() {
				Notification.requestPermission()
				var notif = new Notification('Hi', {
					tag: 'ache-mail',
					body: 'I love you very much',
					icon: '@/assets/logo.png'
				})
			},

			async load() {
				let r = await axios.get('http://localhost:7777/invest/getProjects')
				this.data = r.data
				this.loaded = true
				console.log(this.data)
			}


		},
		beforeMount() {
			this.$store.state.theTab = 'invest'
		},
		mounted() {
			this.load()	
		}


	}
</script>




