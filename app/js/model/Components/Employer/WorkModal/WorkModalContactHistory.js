import {el, setAttr, svg, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
import initWorkContactHistoryPopup from '../../../initWorkContactHistoryPopup'

import {MicroModal} from '../../../../../libs/libs'


import {come} from '../../../helper'

let flag = false

class WorkModalContactHistoryRow {
	constructor(){


		this.el = el('div.modal-row__contacts-history-row',{
			'data-contact-history-open':"modal-2"
		}, 
			el('div.modal-row__contacts-history-manager.modal-row__cell', {},
				this.manager = el('i.tag.manager-tag.dark-blue-tag'),
				this.direction = el('i.ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#arrow"}
				})))
				),

			el('div.modal-row__contacts-history-date.modal-row__cell', 
				this.date = el('time')),
			el('div.modal-row__contacts-history-text.modal-row__cell', 
				el('i.ico.letter-ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#letter"}
				}))),
				this.text = el('p', 'Прислал полный пакет документов :)')
				)
			)

		this.el.addEventListener('click', (e) => {
			MicroModal.show('modal-2');
		})

	}


	update(data){

		setAttr(this.date, {
			innerText: data.date
		})

		setAttr(this.text, {
			innerText: data.message
		})
	}
}


export default class WorkModalContactHistory {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'История контактов'),
			this.addItem = el('div.add-item', el('span', '+'), 'добавить контакт',{
				'data-contact-history-open':"modal-2"
			})
			)
		
		this.modalLayer = el('div.modal-row__layer.empty-layer')


		this.el = el('div.contact-history__layer',
				this.controls,
				this.list = list(this.modalLayer, WorkModalContactHistoryRow)
			)


		// this.openModal = this.openModal.bind(this)

		this.addItem.addEventListener('click', () => {
			MicroModal.show('modal-2');
		})
	

	}


	// openModal(){
	// 	this.addItem.addEventListener('click', function(){
	// 		MicroModal.show('modal-2');
	// 	})
	// }

	 update(data, index, items, context) {


	 		console.log(data)
	
			this.list.update(data)
	
			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalLayer)
			 initOverlayScrollbars(this.modalLayer)
			 if(!flag) {
			 	 initWorkContactHistoryPopup()
			 	 flag = true
			 }
			//

			this.data = data
			this.data.index = index
	}


}

Object.assign(WorkModalContactHistory.prototype , hiddenClassMixin)