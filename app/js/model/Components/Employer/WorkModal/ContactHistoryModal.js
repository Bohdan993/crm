import {
	el,
	setAttr,
	MicroModal
} from '../../../../../libs/libs'
import initWorkModalSelect from '../../../initWorkModalSelect'
import changeDirection from '../../../changeDirection'
import addContactHistory from '../../../fetchingData/Employer/WorkModal/addContactHistory'
import deleteContactHistory from '../../../fetchingData/Employer/WorkModal/deleteContactHistory'
import {
	dateInputChange
} from '../../../helper.js'

export default class ContactHistoryModal {
	constructor() {
		this.data = {}
		this.el = el('div.modal__overlay',
			el('div.modal__wrapper.my-modal-wrapper',
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
									})
								)
							),
							el('div.contact-history-modal__block.direction-block',
								el('p', 'Направление'),
								el('div.input-group',
									this.direction = el('i.ico.change-direction',
										el('span.s-arrow')
									)
								)
							),
							el('div.contact-history-modal__block.date-block',
								el('p', 'Дата'),
								el('div.input-group',
									this.date = el('input', {
										type: 'text',
										// value: new Date().toLocaleDateString()
									})
								)
							),
							el('div.contact-history-modal__block.contact-type-block',
								el('p', 'Тип контакта'),
								el('div.input-group',
									this.contact = el('select.contact-select', {
										name: 'contact-select'
									})
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
		)


		this.confirm.addEventListener('click', (e) => {
			addContactHistory({
					id_contact: this.data.data.id !== '' ? this.data.data.id : 0,
					message: encodeURIComponent(this.textarea.value.trim()),
					type_arrow: this.direction.classList.contains('rotate') ? 1 : 0,
					date: encodeURIComponent(this.date.value),
					id_login: this.managerChoices.managersChoises.getValue(true),
					id_type: this.contactChoices.contactChoices.getValue(true),
					id_employer: this.data.id,
					count: this.data.count
				})
				.then(res => {
					if (res === 'ok') {
						MicroModal.close('modal-2')
					}
					if (res === 'fail') {
						return
					}
				})
		})

		this.delete.addEventListener('click', (e) => {
			let conf = confirm(`Подтвердите удаление контакта`)
			if (conf) {
				deleteContactHistory({
					id: this.data.data.id !== '' ? this.data.data.id : 0,
					id_employer: this.data.id,
					count: this.data.count
				})
				MicroModal.close('modal-2')
			} else {
				return
			}

		})

		this.el.addEventListener('click', (e) => {
			if (!e.target.classList.contains('modal__overlay')) {
				return
			}
			MicroModal.close('modal-2')
		})

		this.close.addEventListener('click', (e) => {
			MicroModal.close('modal-2')
		})


		this.date.addEventListener('change', dateInputChange.bind(null, this.date))

		changeDirection(this.direction)

		this.managerChoices = initWorkModalSelect(this.manager, {
			managers: JSON.parse(localStorage.getItem('managers'))
		})
		this.contactChoices = initWorkModalSelect(this.contact, {
			contacts: JSON.parse(localStorage.getItem('type_contact'))
		})

	}


	update(data) {

		setAttr(this.textarea, {
			value: data.data.message
		})

		setAttr(this.date, {
			value: data.data.date || new Date().toLocaleDateString()
		})

		setAttr(this.direction, {
			classList: data.data.type_arrow === '1' ? 'ico change-direction rotate' : 'ico change-direction'
		})

		this.managerChoices.managersChoises.setChoiceByValue(data.data.id_manager)
		this.contactChoices.contactChoices.setChoiceByValue(data.data.id_type_contact)
		this.data = data
	}
}

