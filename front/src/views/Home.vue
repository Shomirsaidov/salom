<template>
  <!-- <div class="home flex justify-center items-center">
  </div> -->
  <div class="home flex justify-center items-center">
		<div style="margin-top: 120px;">

		  <h1 class="text-xl font-black">Salom<span class="font-light"> Messager</span></h1>
		  <div class="flex mt-8 cursor-pointer mb-8">
		  	


		  	<NavMessage/>



		  </div>


		  <ContactsList/>



		</div>
		
	</div>

</template>

<script>
// @ is an alias to /src
import ContactsList from '@/components/ContactsList.vue'
import NavBar from '@/components/NavBar.vue'
import NavMessage from '@/components/NavMessage.vue'


export default {
  name: 'Home',
  components: {
    ContactsList, NavBar, NavMessage
  },
  beforeMount() {
  	console.log(this.$route)
  }
}
</script>
