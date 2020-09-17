import {el, setAttr, svg, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'




class WorkModalContactHistoryRow {
	constructor(){


		this.el = el('div.modal-row__contacts-history-row',{
			'data-custom-open':"modal-2"
		}, 
			el('div.modal-row__contacts-history-manager.modal-row__cell', {},
				el('i.tag.manager-tag.dark-blue-tag'),
				el('i.ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#arrow"}
				})))
				),

			el('div.modal-row__contacts-history-date.modal-row__cell', 
				el('time')),
			el('div.modal-row__contacts-history-text.modal-row__cell', 
				el('i.ico.letter-ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#letter"}
				}))),
				el('p', 'Прислал полный пакет документов :)')
				)
			)

	}


	update(data){
		console.log(data)
	}
}


export default class WorkModalContactHistory {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'История контактов'),
			this.addItem = el('div.add-item', el('span', '+'), 'добавить контакт', {
				'data-custom-open' : "modal-2"
			})
			)
		
		this.modalLayer = el('div.modal-row__layer.empty-layer')


		this.el = el('div.contact-history__layer',
				this.controls,
				this.list = list(this.modalLayer, WorkModalContactHistoryRow)
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

Object.assign(WorkModalContactHistory.prototype , hiddenClassMixin)