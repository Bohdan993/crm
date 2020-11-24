import {el, setAttr, svg, list, MicroModal} from '../../../../../libs/libs'
import initWorkModalSelect from '../../../initWorkModalSelect'
import changeDirection from '../../../changeDirection'
import addContactHistory from '../../../fetchingData/Employer/WorkModal/addContactHistory'
import deleteContactHistory from '../../../fetchingData/Employer/WorkModal/deleteContactHistory'

let initedSelects = false

export default class ContactHistoryModal {
	constructor(){

		this.data = {}
		this.el = el('div.modal__overlay', {
			tabindex: '-1'
		}, 
			el('div.modal__container.contact-history-modal', {
				role: 'dialog',
				'aria-modal': 'true',
				'aria-labelledby': 'modal-2-title'
			}, 
			el('div.contact-history-modal__layer', 
			this.close = el('span.modal__close', 
				el('span'), 
				el('span')
				),
			el('div.contact-history-modal__header', 
				el('div.contact-history-modal__block.manager-block', 
					el('p', 'Менеджер'),
					el('div.input-group', 
						this.manager = el('select.manager-select', {
							name: 'manager-select'
								}
							)
						)
					),
				el('div.contact-history-modal__block.direction-block', 
					el('p', 'Направление'),
					el('div.input-group', 
						this.direction = el('i.ico.change-direction', 
							svg('svg', svg('use', {
								xlink: { href: "img/sprites/svg/symbol/sprite.svg#arrow"}
							}))
							)
						)
					),
				el('div.contact-history-modal__block.date-block', 
					el('p', 'Дата'),
					el('div.input-group', 
						this.date = el('input', {
							type: 'text'
								}
							)
						)
					),
				el('div.contact-history-modal__block.contact-type-block', 
					el('p', 'Тип контакта'),
					el('div.input-group', 
						this.contact = el('select.contact-select', {
							name: 'contact-select'
								}
							)
						)
					),
				),
			el('div.contact-history-modal__body', 
				el('div.contact-history-modal__block', 
					el('p', 'Содержание'),
					el('div.input-group',
						this.textarea = el('textarea.info-area', {
							rows: 12,
							value: ''
						})
						)
					)
				),
			this.confirm = el('button.confirm-btn', 
				el('span', 'OK')),
			this.delete = el('button.delete-btn', 'Удалить')

			)
			)
		)	

			this.confirm.addEventListener('click', (e) => {
				console.log(this.date.value)
				addContactHistory({
					id_contact: this.data.data.id !== '' ? this.data.data.id : 0,
					message: this.textarea.value,
					type_arrow: this.direction.classList.contains('rotate') ? 1 : 0,
					date: this.date.value,
					id_login: this.managerChoices.managersChoises.getValue(true),
					id_type: this.contactChoices.contactChoices.getValue(true),
					id_employer: this.data.id,
					count: this.data.count
				})
				.then(res => {
					if(res === 'ok') {
						MicroModal.close('modal-2')
					}
					if(res === 'fail') {
						return
					}
				})
			})

			this.delete.addEventListener('click', (e) => {
				// console.log(this.textarea.value)
				deleteContactHistory({
					id: this.data.data.id !== '' ? this.data.data.id : 0,
					id_employer: this.data.id,
					count: this.data.count
				})
				MicroModal.close('modal-2')
			})

			this.el.addEventListener('click', (e) => {
				if(!e.target.classList.contains('modal__overlay')){
						return
				}
				MicroModal.close('modal-2')
			})

			this.close.addEventListener('click', (e) => {
				MicroModal.close('modal-2')
			})

			changeDirection(this.direction)

			this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managers'))})
			this.contactChoices = initWorkModalSelect(this.contact, {contacts: JSON.parse(localStorage.getItem('type_contact'))})

	}


	update(data){
			console.log(this.data)
		// console.log(JSON.parse(localStorage.getItem('managers')))
			setAttr(this.textarea, {
				value: data.data.message
			})

			setAttr(this.date, {
				value: data.data.date
			})
			this.managerChoices.managersChoises.setChoiceByValue(data.data.id_manager)
			this.contactChoices.contactChoices.setChoiceByValue(data.data.id_type_contact)
			this.data = data
	}
}

// initWorkModalSelect(this.comCountrySelect, {countries: JSON.parse(localStorage.getItem('countries'))})
