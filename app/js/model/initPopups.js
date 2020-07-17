import PopupMD from './popup'

import {MicroModal} from '../../libs/libs'



const initPopups = ()=> {
	let popup = new PopupMD('.sidebar__filter-item',{
		view: true,
		contents: `.sidebar__avatar`,
		// pointerPosition: 'right',
		// size_pointer_position: 20,

	})

	console.log(popup)

	// document.querySelectorAll('.sidebar__filter-item').forEach(el => {
	// 	el.addEventListener('click', function(){
	// 		MicroModal.show('modal-1')
	// 	})
	// })

}


export default initPopups