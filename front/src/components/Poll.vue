<template>
	<div class="grid justify-center items-center" style="padding-top: 120px">
		<h1 class="text-xl">Опросы</h1>
		<div class="flex my-8">
			<NavMessage/>
		</div>


		<div class="grid">


			<div v-if="!loaded" :style="{display: 'flex', justifyContent: 'cenetr',flexDirection: 'column'}">
	              <div id="loader"></div>
	              <h2 :style="{color: '#fff'}">Загрузка...</h2>
	        </div>


			<div 
				v-for="(poll, index) in data" 
				:key="index"
				class="border-2 rounded-2xl p-4 space-x-4 mb-2 mr-2 cursor-pointer hover:shadow-xl">
				<div class="flex items-center space-x-2 mb-0">
					<img :src="require(`@/assets/personalcard.svg`)" width="40">
					<h2>{{ poll.author }}</h2>
				</div><br>
				<div class="space-y-1">
					<h2 class="text-xl font-bold mb-4">{{ poll.question }}</h2>
					<div v-for="answer in poll.answers" class="flex justifyCenter">
						<button class="hover:bg-blue-500 p-2 bg-blue-700 text-white font-bold rounded-full rounded-l-none">{{ answer }}</button>
					</div>
				</div>
			</div>

		</div>



	</div>
</template>

<script>

	import '@/assets/tailwind.css'
	import '@/assets/customStyles.css'

	import NavMessage from './NavMessage.vue'

	export default {
		data: () => ({
			data: null,
			loaded: 0
		}),
		methods: {
			load() {
				this.data = this.$store.getters.polls
				console.log(this.data)
				this.loaded = 1

			}
		},
		mounted() {
			this.load()
		}

	}
</script>