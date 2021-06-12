import {
	el,
	setAttr
} from '../../../../../libs/libs'
import {
	save
} from '../../../helper'

import vacancyStorage from '../../../Storage/globalVacancies'
import vacancyListUpdateEvent from '../../../CustomEvents/vacancyListUpdateEvent'


export default class DemandComponent {
	constructor() {

		this.data = {}
		this.save = save.bind(this)
		this.el = el('div.demands-layer.modal-row__inner-layer',
			el('div.modal-row__controls',
				el('p', 'Требования')),
			el('div.modal-row__layer',
				el('div.demands__top',
					el('div.demands__clients.info-block',
						el('p', 'Кол-во клиентов'),
						el('div.input-group',
							this.clientsNumber = el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__men.info-block',
						el('p', 'М'),
						el('div.input-group',
							this.men = el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__women.info-block',
						el('p', 'Ж'),
						el('div.input-group',
							this.women = el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__languages.info-block',
						el('p', 'Уровень владения языками'),
						el('div.input-group',
							this.languageLevel = el('input.info-area', {
								type: 'text'
							})))),
				el('div.demands__bottom bottom-areas',
					el('div.demands__experiance info-block',
						el('p', 'Опыт работы'),
						el('div.input-group',
							this.workExp = el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.demands__requirements.info-block',
						el('p', 'Особые требования'),
						el('div.input-group',
							this.specReq = el('textarea.vacancy-textarea', {
								rows: 3
							}))),
				)))



		this.clientsNumber.addEventListener('change', (e) => {

			const closedVacancies = vacancyStorage.getPartialState(this.data.id, 'id_vacancy', 'status')
			const totalClientsCount = closedVacancies.slice(1).reduce((acc, next) => acc + next, 0)


			this.save({
				id: this.data.id,
				value: this.clientsNumber.value.trim(),
				field: 'total_client'
			})

			console.log(vacancyStorage)

			setAttr(this.sibling.totalClients, {
				innerText: this.clientsNumber.value
			})

			setAttr(this.sibling.totalClientsCount, {
				innerText: +this.clientsNumber.value - totalClientsCount
			})

			vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'total_client', this.clientsNumber.value.trim())
			vacancyListUpdateEvent.detail.id = this.data.id
			document.dispatchEvent(vacancyListUpdateEvent)
		})

		this.men.addEventListener('change', (e) => {
			this.save({
				id: this.data.id,
				value: this.men.value.trim(),
				field: 'total_man'
			})

			setAttr(this.sibling.numberClients, {
				innerText: `${'\u00A0'}-${'\u00A0'}${+this.men.value > 0 ? 'М' + this.men.value : ''} ${+this.women.value > 0 ? 'Ж' + this.women.value : ''}`
			})

			vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'total_man', this.men.value.trim())
			vacancyListUpdateEvent.detail.id = this.data.id
			document.dispatchEvent(vacancyListUpdateEvent)
		})

		this.women.addEventListener('change', (e) => {
			this.save({
				id: this.data.id,
				value: this.women.value.trim(),
				field: 'total_woman'
			})

			setAttr(this.sibling.numberClients, {
				innerText: `${'\u00A0'}-${'\u00A0'}${+this.men.value > 0 ? 'М' + this.men.value : ''} ${+this.women.value > 0 ? 'Ж' + this.women.value : ''}`
			})

			vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'total_woman', this.women.value.trim())
			vacancyListUpdateEvent.detail.id = this.data.id
			document.dispatchEvent(vacancyListUpdateEvent)
		})

		this.languageLevel.addEventListener('change', (e) => {
			this.save({
				id: this.data.id,
				value: this.languageLevel.value.trim(),
				field: 'language_skill'
			})
		})

		this.workExp.addEventListener('change', (e) => {
			this.save({
				id: this.data.id,
				value: this.workExp.value.trim(),
				field: 'experience_work'
			})
		})

		this.specReq.addEventListener('change', (e) => {
			this.save({
				id: this.data.id,
				value: this.specReq.value.trim(),
				field: 'special_requirement'
			})
		})

	}


	update(data, context) {

		setAttr(this.clientsNumber, {
			value: data.clients === '0' ? '' : data.clients
		})

		setAttr(this.men, {
			value: data.men === '0' ? '' : data.men
		})

		setAttr(this.women, {
			value: data.women === '0' ? '' : data.women
		})

		setAttr(this.languageLevel, {
			value: data.languageSkill
		})

		setAttr(this.workExp, {
			value: data.workExp
		})

		setAttr(this.specReq, {
			value: data.specialReq
		})


		this.data = data
		this.sibling = context
	}


	onmount() {

	}


}