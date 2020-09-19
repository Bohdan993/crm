import {el, setAttr, svg, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'


import {modalRowMediaWrapper, // this.modalRowWrapper(class WorkModalMedia)
	modalRowMedia, // this.el (class WorkModalMediaRow)
	mediaShowMore, 
	body} from '../../../../view'





class WorkModalMediaRow{
	constructor(){


		this.el = el('div.modal-row__media', 
			el('a.modal-row__media-link',{
				href: '#',
				target: '_blank',
				rel: 'noopen nofollow'
			}, 
				el('img', {
					src: 'img/1.png',
					alt: 'Картинка'
				})),
			el('span.modal-row__media-remove')
			)

	}


	update(data){
		console.log(data)
	}
}


export default class WorkModalMedia {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'Медиа'),
			el('div.add-item', 
				el('label.choose', {
					'for': 'add-media'
				}, el('span', '+'), 'добавить'),
				this.addItem = el('input.add-media#add-media', {
					type: 'file', 
					name: '',
					multiple: 'multiple'
				})
				)
			)

		this.modalRowWrapper = el('div.modal-row__media-wrapper.empty-layer')
		this.modalLayer = el('div.modal-row__layer', 
			this.list = list(this.modalRowWrapper, WorkModalMediaRow)
		)
		


		this.el = el('div.media__layer',
				this.controls,
				this.modalLayer
			)

		this.addMedia = this.addMedia.bind(this)
	}

	 update(data, index, items, context) {

			this.list.update(data)

			// console.log(this.list)

			//Вызов функций которые зависят от инстанса класса
			 	checkIfWrapperIsEmpty(this.modalRowWrapper)
			 	initOverlayScrollbars(this.modalLayer)
			 	// ifMedia()
			//

			// this.addMedia()

			this.data = data
			this.data.index = index
	}


	addMedia(){
		this.addItem.addEventListener('change', function(e){
			let files = this.files
			console.log(typeof files)
			if( typeof files === undefined ) return;

			let data = new FormData();
			// console.log(files)
			for (let i = 0; i < files.length; i++) {
				data.append('file', files[i])
			}

			// $.each( files, function( key, value ){
			// 	data.append( key, value );
			// });

			console.log(data)

			fetch('https://crm.unicorn-exp.com/employers/upload_media/?id=1',{
				method: 'POST',
				body: data
			}).then(res => res).then(res => res.json()).then(res => console.log(res))


		})
	}


}

Object.assign( WorkModalMedia.prototype , hiddenClassMixin)

let show = false
let flagMedia = false

function showMoreMedia(wrapWidth, count, rowsAbs) {
        // console.log('more')
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
 
      
}



function ifMedia(){

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

      if(!flagMedia) {
        mediaShowMore.addEventListener('click', showMoreMedia.bind(this, wrapWidth, count, rowsAbs))
        flagMedia = true
      }
  		

  	
  	show = true
}