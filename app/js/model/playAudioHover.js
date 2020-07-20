
// import {sidebarWrapper} from '../view'

const playAudioHover = (items) => {
	let audio = document.createElement('audio')
	// let source = document.createElement('source')
	// let source2 = document.createElement('source')

	// source.setAttribute('src', 'audio/click.mp3')
	// source2.setAttribute('src', 'audio/click.ogg')


	audio.innerHTML = `
	<source src="audio/1.mp3"><source>

	`
	audio.muted = true
	audio.volume = 0.04

	// items.forEach(item=> {
	// 	item.addEventListener('mouseenter', async function(){
	// 		try{
	// 			let promise = await audio.play();
	// 		}catch(e){
	// 			console.error(e)
	// 		}
			
	// 	})
	// 	// item.addEventListener('mouseleave', function(){
	// 	// 	audio.pause();
	// 	// })
	// })
}


export default playAudioHover