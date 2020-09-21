

import {MicroModal} from '../../libs/libs'

import {modalRowMediaWrapper,modalRowMedia,mediaShowMore, body} from '../view'


function addMouseUpTrigger(e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    return
  }

}


function closeModal(id, e) {
  if(e.target.classList.contains('my-modal-wrapper')) {
    MicroModal.close(id)
  }
}





// function showMoreMedia(wrapWidth, count, rowsAbs) {
//         // console.log('more')
//         let rows = modalRowMediaWrapper.querySelectorAll('.hidden-row-opacity')
//         let j = 0

//         rows.forEach((el, i, arr) => {
//           let clone = el.querySelector('img').cloneNode()
//           let mr = el.currentStyle || window.getComputedStyle(el)

//           clone.style.display = 'block'
//           clone.style.width = 'auto'
//           clone.style.height = '100px'
//           clone.style.marginRight = mr.marginRight

//           body.appendChild(clone)
          
//           let style = clone.currentStyle || window.getComputedStyle(clone)
//           j += clone.offsetWidth + parseInt(style.marginRight)

//           body.removeChild(clone)


//           if(j < wrapWidth) {
//             el.classList.remove('hidden-row-opacity')
//           }

//           if(!el.classList.contains('hidden-row-opacity')) {
//             count++
//           }

//         })

//         if(count === rowsAbs.length) {
//           mediaShowMore.style.display = 'none'
//         }
 
      
// }

let flag = false
let flagMedia = false

const initWorkPopup = (count) => {

	let show = false
	let modal = MicroModal.init({
  onShow: (modal, node) => {
    console.log(`${modal.id} is shown`)
    const wrapper = modal.querySelector('.my-modal-wrapper')

    if(!flag) {
      wrapper.addEventListener('mouseup', addMouseUpTrigger)
      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
      flag = true
    }
    

  // 	if(modal.id === 'modal-1') {
  // 		let wrapWidth = modalRowMediaWrapper.offsetWidth
  // 		let width = 0
  		
  // //Функционал медиа
  // 		modalRowMedia.forEach(el=> {
  // 			let style = el.currentStyle || window.getComputedStyle(el)
  // 			width += el.offsetWidth + parseInt(style.marginRight)

  // 			if(width > wrapWidth) {
  // 				// mediaShowMore.style.display = 'block'
  // 				if(!show) {
  // 					el.classList.add('hidden-row-opacity')
  // 				}	

  // 				mediaShowMore.style.display = 'flex'
  // 			}
  // 		})

  // 		// console.log(j)
  		
  // 		let rowsAbs = modalRowMediaWrapper.querySelectorAll('.hidden-row-opacity')
  // 		let count = 0

  //     if(!flagMedia) {
  //       mediaShowMore.addEventListener('click', showMoreMedia.bind(this, wrapWidth, count, rowsAbs))
  //       flagMedia = true
  //     }
  		

  // 	}
  // 	show = true

  },
  onClose: modal => {
    console.log(`${modal.id} is hidden`) // [2]
  },
  openTrigger: 'data-custom'+ count +'-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});



}


export default initWorkPopup