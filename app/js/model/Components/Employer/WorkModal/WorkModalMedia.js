import {el, setAttr, svg, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'




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
					'for': 'add-item'
				}),
				el('input.add-media#add-media', {
					type: 'file', 
					name: '',
					multiple: 'multiple'
				})
				)
			)
		this.modalRowWrapper = el('div.modal-row__media-wrapper')
		this.modalLayer = el('div.modal-row__layer.empty-layer', 
			this.list = list(this.modalRowWrapper, WorkModalMediaRow)
		)
		


		this.el = el('div.media__layer',
				this.controls,
				this.modalLayer
			)

		
	}

	 update(data, index, items, context) {

	 		// console.log(data)
	 		
			
	
	 		// console.log(data)
	
			this.list.update(data)
			// this.input.id = 'country-chbx-' + data.id
			// setAttr(this.label, {
			// 	for: 'country-chbx-' + data.id,
			// 	innerText: data.name
			// })

			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalLayer)
			//

			this.data = data
			this.data.index = index
	}


}

Object.assign( WorkModalMedia.prototype , hiddenClassMixin)