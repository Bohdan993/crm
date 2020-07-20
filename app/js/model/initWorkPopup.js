

import {MicroModal} from '../../libs/libs'



const initWorkPopup = ()=> {
	MicroModal.init({
  onShow: modal => console.info(`${modal.id} is shown`), // [1]
  onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});
	console.log('worked');

	// document.querySelectorAll('.row').forEach(el => {
	// 	el.addEventListener('click', function(){
	// 		MicroModal.show('modal-1')
	// 	})
	//  })

// document.querySelector('.modal__btn-1').addEventListener('click', function(){
// 	MicroModal.show('modal-2')
// })
}


export default initWorkPopup