import {el, setAttr, svg, list, place} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import ShowMoreBtn from './ShowMoreBtn'
import { modal } from '../../../MountingElements/Employer/WorkModal/mountContactHistoryModal'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
// import changeDirection from '../../../changeDirection'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
// import initWorkContactHistoryPopup from '../../../initWorkContactHistoryPopup'
import getWorkModalContactHistory from '../../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'

import {MicroModal} from '../../../../../libs/libs'


import {come} from '../../../helper'

let flag = false
class WorkModalContactHistoryRow {
	constructor(){

		this.data = {}
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
				el('i.ico.letter-ico', svg('svg', this.typeContact = svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#letter"}
				}))),
				this.text = el('p', 'Прислал полный пакет документов :)')
				)
			)

		this.el.addEventListener('click', (e) => {
			MicroModal.show('modal-2');
			modal.update(this.data)
			console.log(this.data)
		})

		// this.flag = false

	}


	update(data, index, items, context){

		// console.log(context)


		const currManager = context.data.storage.managers.filter(manager => {
			return manager.id === data.id_manager
		})

		const currContact = context.data.storage.typeContact.filter(contact => {
			return contact.id === data.id_type_contact
		})


		setAttr(this.date, {
			innerText: data.date
		})

		setAttr(this.text, {
			innerText: data.message
		})

		setAttr(this.manager , {
				style: {"background-color": "#" + (currManager[0] ? currManager[0].color : null)}, 
				innerText: currManager[0] ? currManager[0].name.split(/\s+/).map(word => word[0].toUpperCase()).join('') : null
			})

		setAttr(this.typeContact, {
			xlink: { href: `img/sprites/svg/symbol/sprite.svg#${currContact[0] ? currContact[0].icon : null}`}
		})

		setAttr(this.direction, {
			classList: `ico${data.type_arrow === '1' ? ' rotate' : ''}`
		})

	
		// console.log(context.data.data)

		this.data.data = data
		this.data.id = context.data.data.id
		this.data.count = context.count
		this.index = index
	}


}


export default class WorkModalContactHistory {
	constructor(){
		this.data = {}
		this.controls = el('div.modal-row__controls',
			el('p', 'История контактов'),
			this.addItem = el('div.add-item', el('span', '+'), 'добавить контакт',{
				'data-contact-history-open':"modal-2"
			})
			)
		

		this.modalRowWrapper = el('div.modal-row__contacts-history-wrapper.empty-layer')
		this.modalLayer = el('div.modal-row__layer', 
			this.list = list(this.modalRowWrapper, WorkModalContactHistoryRow, 'id')
		)


		this.el = el('div.contact-history__layer',
				this.controls,
				this.modalLayer,
				this.showMore = place(ShowMoreBtn)
			)


		this.addItem.addEventListener('click', (e) => {
			console.log(this.data)
			MicroModal.show('modal-2')
			modal.update({
				data:{
					message: '',
					date: '',
					id: '',
					id_manager: '',
					id_type_contact: '',
					type_arrow: '',
				},
				id: this.data.data.id,
				count: this.data.count
			})
		})

		this.data.storage = this.getItemsLocalStorage()
		// initWorkContactHistoryPopup()
		this.pageShow = 2
		this.flag = false
		this.flagShow = false

		initOverlayScrollbars(this.modalLayer)
		// this.scrollInstance = OverlayScrollbars(this.modalLayer)
	}


	 update(data, index, items, context) {
	 		let {loading, deleating, adding, showing} = data
	 		console.log(context)
	 		if(showing) {
				this.pageShow++
			}

			if(loading) {
				this.pageShow = 2
			}

			if(adding) {
			}

			if(deleating) {
			}
	 	// 	console.log('this.flag', this.flag)
			// console.log(this.data.id)
			this.data.data = data
			this.data.index = index
			this.data.count = (this.pageShow - 1) * 5
			this.list.update(data.data, {data: this.data, count: this.data.count})
			// console.log(this.data.data.id)
			//Пагинация
			if(data.data.length < data.total) {
				this.showMore.update(true, 'показать еще 5')

				if(!this.flagShow) {
					this.showMore.el.addEventListener('click', ()=> {
							getWorkModalContactHistory({id: this.data.data.id, showing: true, p: this.pageShow})
							console.log(this.pageShow)
					})

						this.flagShow = true
				}

			} else {
				this.showMore.update(false)
				this.flagShow = false
			}
	
			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalRowWrapper)
			 // this.scrollInstance.update()
		
			//

			// console.log('this.flag', this.flag)

	}

		getItemsLocalStorage(){
		const managers = JSON.parse(localStorage.getItem('managers'))
		const typeContact = JSON.parse(localStorage.getItem('type_contact'))

		return {
				managers,
				typeContact
			}
	}


}

Object.assign(WorkModalContactHistory.prototype , hiddenClassMixin)