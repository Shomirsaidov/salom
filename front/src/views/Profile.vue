<template>
    <div class="home flex justify-center items-center">
		<div style="margin-top: 120px;" class="space-y-8">

			<h1 class="text-xl font-black">Salom<span class="font-light"> Биҷу</span></h1>
			
		
			<input type="text" value="" id="tjkInput" style="font-size: 30px; display: none;">
			<div class="flex items-center justify-center space-x-4">
				<input type="text" placeholder="Матни ҷустуҷу..." id="tjkInput" style="font-size: 23px;"
				class="border-2 rounded-2xl p-4 outline-blue-300" v-model="tjk_tempo_text">
				<div class="flex items-center space-x-4 bg-gray-200 rounded-full p-4
				space-x-2 cursor-pointer">
					<img src="@/assets/search-normal-2.svg" alt="" width="40"
					class="hover:bg-gray-100 rounded-xl" @click="search">
					<img src="@/assets/microphone-2.svg" alt="" width="40"
					class="hover:bg-gray-100 rounded-xl" @click="speak">
				</div>

				<div class="items-center flex justify-center" v-if="listening">
					<div :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
		        		<img src="@/assets/mic.gif" alt="" width="70">
		    		</div>
				</div>

			</div>

			<div class="items-center flex justify-center" v-if="!loaded">
				<div :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
		        	<div id="loader"></div>
		    	</div>
			</div>

			<div class="items-center flex justify-center" v-if="speaking">
				<div v-if="!loaded" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
		        	<img src="@/assets/sound.gif" alt="" width="70">
		    	</div>
			</div>

			<div class="flex justify-center flex-col" style="max-width: 300px;">


				<div v-for="(link,index) in main_data[0]" :key="index"
				class="p-4 border-2 flex items-center space-x-4 rounded-xl cursor-pointer hover:shadow-md">
					<div>
						<a class="text-lg font-bold text-left mb-2" :href="link">{{ link }}<span class="font-light text-sm bg-green-300 text-green-900 ml-4 p-2 rounded-full"></span></a>
					</div>
				</div>

			</div>

			<audio :src="require('@/assets/audio/starter.wav')" controls style="visibility: hidden;" id="starter"></audio>
			<audio :src="require('@/assets/audio/error.wav')" controls style="visibility: hidden;" id="error"></audio>
			<audio :src="require('@/assets/audio/абуКист.wav')" controls style="visibility: hidden;" id="abuKist"></audio>
			<audio :src="require('@/assets/audio/гуш_мекунам.wav')" controls style="visibility: hidden;" id="gush"></audio>
			<audio :src="require('@/assets/audio/мухаббат.wav')" controls style="visibility: hidden;" id="muhabbat"></audio>
			<audio :src="require('@/assets/audio/салом.wav')" controls style="visibility: hidden;" id="salom"></audio>
			<audio :src="require('@/assets/audio/сирри_махфи.wav')" controls style="visibility: hidden;" id="sirr"></audio>
			<audio :src="require('@/assets/audio/тарчумаихол.wav')" controls style="visibility: hidden;" id="tarjuma"></audio>
			<audio :src="require('@/assets/audio/ташаккур.wav')" controls style="visibility: hidden;" id="tashakkur"></audio>
			<audio :src="require('@/assets/audio/хайр.wav')" controls style="visibility: hidden;" id="khayr"></audio>
			<audio :src="require('@/assets/audio/хизмат_шумо.wav')" controls style="visibility: hidden;" id="khizmat"></audio>
			<audio :src="require('@/assets/audio/vazifa.wav')" controls style="visibility: hidden;" id="vazifa"></audio>



		</div>




	</div>
</template>
<script>


	var recognizer

	import NavBar from '@/components/NavBar.vue'
	import $ from 'jquery'
	import axios from 'axios'
	import '@/assets/tailwind.css'

	export default {
		name: 'Profile',
		components: {
			NavBar
		},
		data: () => ({
			lettersConfig: {
        32: [" ", 'vowel'],
		0: '',
        1575: ["о",'vowel'],
        1576: ["б", 'consonant'],
        1608: ["в", "consonant"],
        1711: ["г", "consonant"],
        1594: ["ғ", "consonant"],
        1583: ["д", "consonant"],
        1740: ["е", "vowel"],
        // "ё" odd
        1688: ["ж","consonant"], 
        1586: ["з", "consonant"],
        1592: ["з", "consonant"],
        1584: ["з", "consonant"],
        // "и" odd
        // "ӣ" odd
        // "й" odd
        1705: ["к", "consonant"],
        1602: ["қ", "consonant"],
        1604: ["л", "consonant"],
        1605: ["м", "consonant"],
        1606: ["н", "consonant"],
        1570: ["о", "vowel"],
        1662: ["п", "consonant"],
        1585: ["р", "consonant"],
        1589: ["с", "consonant"],
        1587: ["с", "consonant"],
        1578: ["т", "consonant"],
        1591: ["т", "consonant"],
        // "у" odd
        // "ӯ" odd
        1601: ["ф", "consonant"],
        1582: ["х", "consonant"],
        1581: ["ҳ", "consonant"],
        1607: ["ҳ", "consonant"],
        1670: ["ч", "consonant"],
        1580: ["ҷ", "consonant"],
        1588: ["ш", "consonant"],
        1593: ["ъ", "consonant"],
        // "э" odd
        // "ю" odd
        // "я" odd
    		},
    		local_tempo: '',
    		tjk_text: '',
    		tjk_tempo_text: '',
			listening: false,
			speaking: 0,
			loaded: 1,
			main_data: ['asdasd','asdasd']
			// audio_source: require('http://localhost:7777/getFile/starter.wav')


		}),
		methods: {
			speak() {
				this.tjk_tempo_text = ''
        		this.tjk_text = ''
        		this.local_tempo = ''
				recognizer.start()
				this.listening = 1
			},
			async search() {
				this.loaded = 0
				if(this.tjk_tempo_text.includes('салом')) {
						// let audio = document.createElement('')
						setTimeout(() => document.getElementById('starter').play(),30)
					} 
					else if(this.tjk_tempo_text.includes('хвб ҳсте')) {
						setTimeout(() => document.getElementById('tashakkur').play(),30)

					}
					else if(this.tjk_tempo_text.includes('барои чи номи ту дилноза аст') || this.tjk_tempo_text.includes('че ном тв дл ноз ост')
					|| this.tjk_tempo_text.includes('брое че ном тв дл нозҳ ост') || this.tjk_tempo_text.includes('брое че ном тв') 
					|| this.tjk_tempo_text.includes('брое че нометв') || this.tjk_tempo_text.includes('брое че номе тв') || this.tjk_tempo_text.includes('брое че ном дв ') && this.tjk_tempo_text.includes('ост')
					|| this.tjk_tempo_text.includes('брое чен ном тв')) {
						setTimeout(() => document.getElementById('sirr').play(),30)  
					}
					else if(this.tjk_tempo_text.endsWith('ту ки асти')) {
						setTimeout(() => document.getElementById('tarjuma').play(),30)
					}
					else if(this.tjk_tempo_text.endsWith('шомирсаидов абубакр кист') || this.tjk_tempo_text.endsWith('шом мерсъед обвбкр кест')
					|| this.tjk_tempo_text.endsWith('шоме съед обвбкр кест') || this.tjk_tempo_text.includes('шомер хред обвбкр кест')
					|| this.tjk_tempo_text.includes('шоме съед в обвбкр кест') || this.tjk_tempo_text.includes('шоме хред обвбкр кест')
					|| this.tjk_tempo_text.includes('мерсъед обвбкр кест') || this.tjk_tempo_text.includes('швмез съед обвбкр кест')) {
						setTimeout(() => document.getElementById('abuKist').play(),30)
					}
					else if(this.tjk_tempo_text.startsWith('дилноза') || this.tjk_tempo_text.startsWith('дер лвзр') 
					|| this.tjk_tempo_text.startsWith('дл нозм') || this.tjk_tempo_text.startsWith('гл нозм') || this.tjk_tempo_text.startsWith("длел нзр")
					|| this.tjk_tempo_text.startsWith('длел нзр') || this.tjk_tempo_text.startsWith('ден озр') || this.tjk_tempo_text.startsWith('дл нзр')
					|| this.tjk_tempo_text.startsWith('дл нозр') || this.tjk_tempo_text == 'гл озр' || this.tjk_tempo_text == 'дл озр'
					|| this.tjk_tempo_text.startsWith("гл овр") || this.tjk_tempo_text == 'дл нозҳ' || this.tjk_tempo_text == 'гл нзр'
					|| this.tjk_tempo_text == 'ҷнозҳ') {
						setTimeout(() => document.getElementById('gush').play(),30)
					}
					else if(this.tjk_tempo_text.includes('рахмат') || this.tjk_tempo_text.includes('тшкр')) {
						setTimeout(() => document.getElementById('khizmat').play(),30)
					}
					else if(this.tjk_tempo_text.includes('хайр') || this.tjk_tempo_text.includes('хред') || this.tjk_tempo_text.includes('ҳоер')
						|| this.tjk_tempo_text.includes('хр')) {
						setTimeout(() => document.getElementById('khayr').play(),30)
					}
					else if(this.tjk_tempo_text.includes('ман туро дуст медорам') || this.tjk_tempo_text.includes('мн тв ро двст ндорм')) {
						setTimeout(() => document.getElementById('muhabbat').play(),30)
					}
					else if(this.tjk_tempo_text.includes('вазифаи ту чист')) {
						setTimeout(() => document.getElementById('vazifa').play(),30)
					}
					else {
						setTimeout(() => document.getElementById('error').play(),30)                
					}



					let links_data = await axios.get('http://localhost:7777/biju/' + this.tjk_tempo_text)
					console.log(links_data)
					this.main_data = links_data.data
					this.loaded = 1


			},	
			tjkTranslate(sentence, tempo) {
				this.tjk_tempo_text = ''
		        for(var char of sentence) {
		            // if(previous_char == 'consonant' && lettersConfig[char.codePointAt()][1] == 'consonant') {
		            //     local_tempo += 'a'                
		            // }
		            this.tjk_tempo_text += this.lettersConfig[char.codePointAt()][0]
		            // previous_char = lettersConfig[char.codePointAt()][1]   
		        }
		        if(tempo) {
		                // this.tjk_tempo_text = this.local_tempo
		        } else {
		                this.tjk_text = this.tjk_tempo_text
		        }
		    },
		    onResult(event) {
		    	console.log(event + 'asdad')


		        var result = event.results[event.resultIndex];
		        if (result.isFinal) {
					this.listening = 0
		            console.log('Вы сказали: ' + result[0].transcript);
		            this.tjkTranslate(result[0].transcript, true)
		            document.querySelector('#tjkInput').value = 'this.tjk_tempo_text	'
		            // document.querySelector('#tjkInput').value = result[0].transcript

					
					if(this.tjk_tempo_text.includes('слом')) {
						// let audio = document.createElement('')
						setTimeout(() => document.getElementById('starter').play(),30)
					} 
					else if(this.tjk_tempo_text.includes('хвб ҳсте')) {
						setTimeout(() => document.getElementById('tashakkur').play(),30)

					}
					else if(this.tjk_tempo_text.includes('брое че ном тв длнвоз ост') || this.tjk_tempo_text.includes('че ном тв дл ноз ост')
					|| this.tjk_tempo_text.includes('брое че ном тв дл нозҳ ост') || this.tjk_tempo_text.includes('брое че ном тв') 
					|| this.tjk_tempo_text.includes('брое че нометв') || this.tjk_tempo_text.includes('брое че номе тв') || this.tjk_tempo_text.includes('брое че ном дв ') && this.tjk_tempo_text.includes('ост')
					|| this.tjk_tempo_text.includes('брое чен ном тв')) {
						setTimeout(() => document.getElementById('sirr').play(),30)  
					}
					else if(this.tjk_tempo_text.endsWith('тв ке ҳсте')) {
						setTimeout(() => document.getElementById('tarjuma').play(),30)
					}
					else if(this.tjk_tempo_text.endsWith('шоме сед обвбкр кест') || this.tjk_tempo_text.endsWith('шом мерсъед обвбкр кест')
					|| this.tjk_tempo_text.endsWith('шоме съед обвбкр кест') || this.tjk_tempo_text.includes('шомер хред обвбкр кест')
					|| this.tjk_tempo_text.includes('шоме съед в обвбкр кест') || this.tjk_tempo_text.includes('шоме хред обвбкр кест')
					|| this.tjk_tempo_text.includes('мерсъед обвбкр кест') || this.tjk_tempo_text.includes('швмез съед обвбкр кест')) {
						setTimeout(() => document.getElementById('abuKist').play(),30)
					}
					else if(this.tjk_tempo_text.startsWith('гл зд') || this.tjk_tempo_text.startsWith('дер лвзр') 
					|| this.tjk_tempo_text.startsWith('дл нозм') || this.tjk_tempo_text.startsWith('гл нозм') || this.tjk_tempo_text.startsWith("длел нзр")
					|| this.tjk_tempo_text.startsWith('длел нзр') || this.tjk_tempo_text.startsWith('ден озр') || this.tjk_tempo_text.startsWith('дл нзр')
					|| this.tjk_tempo_text.startsWith('дл нозр') || this.tjk_tempo_text == 'гл озр' || this.tjk_tempo_text == 'дл озр'
					|| this.tjk_tempo_text.startsWith("гл овр") || this.tjk_tempo_text == 'дл нозҳ' || this.tjk_tempo_text == 'гл нзр'
					|| this.tjk_tempo_text == 'ҷнозҳ') {
						setTimeout(() => document.getElementById('gush').play(),30)
					}
					else if(this.tjk_tempo_text.includes('рҳмт') || this.tjk_tempo_text.includes('тшкр')) {
						setTimeout(() => document.getElementById('khizmat').play(),30)
					}
					else if(this.tjk_tempo_text.includes('хер') || this.tjk_tempo_text.includes('хред') || this.tjk_tempo_text.includes('ҳоер')
						|| this.tjk_tempo_text.includes('хр')) {
						setTimeout(() => document.getElementById('khayr').play(),30)
					}
					else if(this.tjk_tempo_text.includes('мн тв ро двст медорм') || this.tjk_tempo_text.includes('мн тв ро двст ндорм')) {
						setTimeout(() => document.getElementById('muhabbat').play(),30)
					}
					else if(this.tjk_tempo_text.includes('взефҳ тв чест')) {
						setTimeout(() => document.getElementById('vazifa').play(),30)
					}
					else {
						setTimeout(() => document.getElementById('error').play(),30)                
					}





					this.speaking = 1
					setTimeout(() => this.speaking = 0, 7000)

		            
		        } else {
		            // console.log('Промежуточный результат: ', result[0].transcript);
		            document.querySelector('#tjkInput').value = result[0].transcript

		            this.tjkTranslate(result[0].transcript, true)
		            console.log(this.tjk_tempo_text)
		            document.querySelector('#tjkInput').value = this.tjk_tempo_text
		        }

		    },

			// minimizeByConsonants() {

			// },

			sendForTTS() {
				axios.get('салом ')
			}


		},
		mounted() {
			recognizer = new webkitSpeechRecognition();
			recognizer.interimResults = true;
			recognizer.lang = 'fa_Ir';



			 recognizer.onresult = (event) => {
			 	this.onResult(event)
			 } 





		}
	}
</script>
