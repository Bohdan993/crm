

import {MicroModal} from '../../libs/libs'

import {modalRowMediaWrapper,modalRowMedia,mediaShowMore, body} from '../view'


const initWorkPopup = ()=> {
	let show = false
	MicroModal.init({
  onShow: modal => {
  	if(modal.id === 'modal-1') {
  		let wrapWidth = modalRowMediaWrapper.offsetWidth
  		let width = 0
  		
  //Функционал медиа
  		modalRowMedia.forEach(el=> {
  			let style = el.currentStyle || window.getComputedStyle(el)
  			width += el.offsetWidth + parseInt(style.marginRight)

  			if(width > wrapWidth) {
  				// mediaShowMore.style.display = 'block'
  				if(!show) {
  					el.classList.add('hidden-row-opacity')
  				}	

  				mediaShowMore.style.display = 'flex'
  			}
  		})

  		// console.log(j)
  		
  		let rowsAbs = modalRowMediaWrapper.querySelectorAll('.hidden-row-opacity')
  		let count = 0
  		mediaShowMore.addEventListener('click', function(){
  			
  			let rows = modalRowMediaWrapper.querySelectorAll('.hidden-row-opacity')
  			let j = 0

  			rows.forEach((el, i, arr) => {
  				let clone = el.querySelector('img').cloneNode()
  				let mr = el.currentStyle || window.getComputedStyle(el)

  				clone.style.display = 'block'
  				clone.style.width = 'auto'
  				clone.style.height = '100px'
  				clone.style.marginRight = mr.marginRight

  				body.appendChild(clone)
  				
  				let style = clone.currentStyle || window.getComputedStyle(clone)
  				j += clone.offsetWidth + parseInt(style.marginRight)

  				body.removeChild(clone)


  				if(j < wrapWidth) {
  					el.classList.remove('hidden-row-opacity')
  				}

  				if(!el.classList.contains('hidden-row-opacity')) {
  					count++
  				}

  			})

  			if(count === rowsAbs.length) {
  				mediaShowMore.style.display = 'none'
  			}
 
  		})

  	}
  	show = true

    // let wrapper = modal.querySelector('.modal__wrapper')

    // console.log(wrapper)

    // wrapper.addEventListener('mouseup', function(e){
    //   alert('dfdf')
    // })
  },
  onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open'
});

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