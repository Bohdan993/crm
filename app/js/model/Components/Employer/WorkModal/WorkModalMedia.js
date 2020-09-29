import {el, setAttr, svg, list, toastr, place} from '../../../../../libs/libs';
import ProgressBar from '../ProgressBar'
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'

import addMedia from '../../../fetchingData/Employer/WorkModal/addMedia'

import {modalRowMediaWrapper, // this.modalRowWrapper(class WorkModalMedia)
	modalRowMedia, // this.el (class WorkModalMediaRow)
	mediaShowMore, 
	body} from '../../../../view'

const URL = 'https://crm.unicorn-exp.com/images/employer/media'



class WorkModalMediaRow{
	constructor(){


		this.el = el('div.modal-row__media', 
			this.link = el('a.modal-row__media-link',{
				href: '#',
				target: '_blank',
				rel: 'noopen nofollow'
			}, 
				this.img = el('img', {
					src: 'img/1.png',
					alt: 'Картинка'
				})),
			el('span.modal-row__media-remove')
			)

	}


	update(data){
		console.log(data)
		setAttr(this.link, {
			href: URL + '/' + data.name 
		})

		setAttr(this.img, {
			src: URL + '/' + data.name,
			alt: data.name
		})
	}
}


export default class WorkModalMedia {
	constructor(){
		this.data = {}
		this.controls = el('div.modal-row__controls',
			el('p', 'Медиа'),
			el('div.add-item', 
				el('label.choose', {
					'for': 'add-media'
				}, el('span', '+'), 'добавить'),
				this.addItem = el('input.add-media#add-media', {
					type: 'file', 
					name: '',
				})
				)
			)

		this.modalRowWrapper = el('div.modal-row__media-wrapper.empty-layer')
		this.modalLayer = el('div.modal-row__layer', 
			this.list = list(this.modalRowWrapper, WorkModalMediaRow),
			this.progress  = place(ProgressBar)
		)
		


		this.el = el('div.media__layer',
				this.controls,
				this.modalLayer
			)

		// this.addMedia = this.addMedia.bind(this)

		this.addItem.addEventListener('change', (e) => {
			let files = e.target.files
			if( typeof files === undefined ) return;

			let data = new FormData();
			try{
				for (let i = 0; i < files.length; i++) {
				const str = files[i].type.split('/')
				if(/\jpe?g|png$/i.test(str[1]) === false) {
					throw new Error("Загружаемый файл должен быть картинкой")
					return
				}
					data.append('file', files[i])
				}
				addMedia(this.data.id, data)
			} catch(e) {
				toastr.error(`${e.message}`, 'Ошибка!' ,{timeOut: 0, extendedTimeOut: 0})
			}
		})
	}

	 update(data, index, items, context) {

			this.list.update(data.data)
		
			console.log(this.list)

			//Вызов функций которые зависят от инстанса класса
			 	checkIfWrapperIsEmpty(this.modalRowWrapper)
			 	initOverlayScrollbars(this.modalLayer)
			 	setTimeout(() => {
			 		ifMedia(this.modalRowWrapper, this.list.views)
			 	}, 0)
			 	
			//

			this.data = data
			this.data.index = index
	}

}

Object.assign( WorkModalMedia.prototype , hiddenClassMixin)

let show = false
let flagMedia = false

function showMoreMedia(modalRowMediaWrapper, wrapWidth, count, rowsAbs) {
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



function ifMedia(modalRowMediaWrapper, modalRowMedia){
			
  		let wrapWidth = modalRowMediaWrapper.offsetWidth
  		let width = 0

  //Функционал медиа
  		modalRowMedia.forEach(el=> {
  			el = el.el
  			let img = el.querySelector('img')
  			let style = el.currentStyle || window.getComputedStyle(el)
  			img.onload = () => {
  				width += el.offsetWidth + parseInt(style.marginRight)
  				// console.log(width)
  				// console.log(wrapWidth)
	  				if(width > wrapWidth) {
		  				el.classList.add('hidden-row-opacity')
		  				mediaShowMore.style.display = 'flex'
	  			}
  			}
  			
  		})
 
  		// console.log(j)
  		
  		let rowsAbs = modalRowMediaWrapper.querySelectorAll('.hidden-row-opacity')
  		let count = 0

      if(!flagMedia) {
        mediaShowMore.addEventListener('click', showMoreMedia.bind(this, modalRowMediaWrapper, wrapWidth, count, rowsAbs))
        flagMedia = true
      }

}