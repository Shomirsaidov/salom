<template>
	

		  	<h2 :class="['border-blue-600 p-2 rounded-t-lg shadow-lg', {'bg-gray-100 border-b-2 rounded-t-lg border-blue-600 p-2 shadow-lg': $route.path == '/home'}]">
		  		<router-link 
		  		:class="[link_classes, {'active-link': $route.path == '/home' ? true : false}]" to="/home">
		  			Контакты
		    	</router-link> 
		    </h2>

		    <h2 :class="['border-blue-600 p-2 rounded-t-lg shadow-lg', {'bg-gray-100 border-b-2 rounded-t-lg border-blue-600 p-2 shadow-lg': $route.path == '/search'}]">
		  		<router-link 
		  		:class="[link_classes, {'active-link': $route.path == '/search' ? true : false}]" to="/search">
		  			Люди
		    	</router-link> 
		    </h2>


		  	<h2 :class="['border-blue-600 p-2 rounded-t-lg shadow-lg', {'bg-gray-100 border-b-2 rounded-t-lg border-blue-600 p-2 shadow-lg': $route.path == '/state'}]">
		  		<router-link 
		  		:class="[link_classes, {'active-link': $route.path == '/state' ? true : false}]" to="/state">
		  			Заявления
		    	</router-link> 
		    </h2>


		    <h2 class="border-blue-600 p-2 rounded-t-lg shadow-lg">
		  		<router-link :class="[link_classes, {'active-link': $route.path == '/QA' ? true : false}]" to="/QA">
		  			Форум
		    	</router-link> 
		    </h2>

		    <h2 class="border-blue-600 p-2 rounded-t-lg shadow-lg">
		  		<router-link :class="[link_classes, {'active-link': $route.path == '/poll' ? true : false}]" to="/poll">
		  			Опросы
		    	</router-link> 
		    </h2>

		    <h2 class="border-blue-600 p-2 rounded-t-lg shadow-lg">
		  		<router-link :class="[link_classes, {'active-link': $route.path == '/posters' ? true : false}]" to="/posters">
		  			Рассылки
		    	</router-link> 
		    </h2>


</template>


<script>
	export default {
		data: () => ({
			actives: ['bg-gray-100']
		})
	}
</script>

<style>
	/*.active-link {
		background: aliceblue;
		color: #000;
		border-bottom: 2px whitesmoke solid;
	}*/
</style>