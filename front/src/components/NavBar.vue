<template>

		<nav class="w-screen flex justify-center pt-4">
		    <div class="flex justify-between items-center space-x-6 bg-blue-500 rounded-full p-2" 
		    style="box-shadow: 1px 1px 7px blue; z-index: 3">
		    		<router-link :class="[link_classes, {'active-link': $store.state.theTab == 'home' || $store.state.theTab == 'chat'  ? true : false}]" to="/home" @click="navigate('home')">
		    			<img src="@/assets/home.svg" width="35" />
		    			<button>Главная</button>
		    		</router-link>

		    		<router-link :class="[link_classes, {'active-link': $store.state.theTab == 'search' ? true : false}]" to="/search" @click="navigate('search')">
		    			<img src="@/assets/search-normal.svg" width="35" />
		    			<button>Найти</button>
		    		</router-link> 

		    		<router-link :class="[link_classes, {'active-link': $store.state.theTab == 'profile' ? true : false}]" to="/profile" @click="navigate('profile')">
		    			<img src="@/assets/personalcard.svg" width="35" />
		    			<button>Профиль</button>
		    		</router-link> 

		    		<router-link :class="[link_classes, {'active-link': $store.state.theTab == 'invest' ? true : false}]" to="/invest" @click="navigate('invest')">
		    			<img src="@/assets/presention-chart.svg" width="35" />
		    			<button>Инвестировать</button>
		    		</router-link> 

		    		
		    </div>
	  </nav>

</template>
<script>

	import '@/assets/tailwind.css'

	export default {
		name: 'NavBar',
		data: () => ({
			link_classes: [
				'text-white',
				'font-bold', 
				'p-2' ,
				'flex', 
				'space-x-2', 
				'items-center', 
			]

		}),
		methods: {
			navigate(to) {
				this.$store.state.theTab = to;
			}
		},
	
	}
</script>
<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

  .active-link {
      color: #000;
      background: #fff;
      border-radius: 44px;
   }

}
</style>