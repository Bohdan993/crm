import {el, setAttr, place} from '../../../../../libs/libs'
import {save} from '../../../helper'
export default class TermsComponent {
	constructor(){

		this.data = {}
		this.save = save.bind(this)
		this.el = el('div.terms-layer', 
			el('div.modal-row__controls',
				el('p', 'Условия')),
			el('div.modal-row__layer',
				el('div.terms__top',
					el('div.terms__start-date.info-block',
						el('p', 'Дата начала работы'),
						el('div.input-group', 
							this.startWork = el('input.info-area', {
								type: 'text'
							}))),
					el('div.terms__period.info-block',
						el('p', 'Период (мес)'),
						el('div.input-group', 
							this.period = el('input.info-area', {
								type: 'text'
							}))),
					el('div.terms__salary.info-block',
						el('p', 'Заработная плата'),
						el('div.input-group', 
							this.salary = el('input.info-area', {
								type: 'text'
							})))),
				el('div.terms__middle',
					el('div.terms__accommodation.info-block',
						el('p', 'Проживание'),
						el('div.input-group', 
							this.accomodation = el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__nutrition.info-block',
						el('p', 'Питание'),
						el('div.input-group', 
							this.feeding = el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__taxes.info-block',
						el('p', 'Налоги'),
						el('div.input-group', 
							this.taxes = el('textarea.vacancy-textarea', {
								rows: 3
							})))),
				el('div.terms__bottom.bottom-areas',
					el('div.terms__work-responsibilities.info-block',
						el('p', 'Рабочие обязаности'),
						el('div.input-group', 
							this.workResp = el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__work-time.info-block',
						el('p', 'Рабочее время'),
						el('div.input-group', 
							this.workTime = el('textarea.vacancy-textarea', {
								rows: 3
							})))
					),
				))


		this.startWork.addEventListener('change', (e) => {
			this.save({
				id: this.data.id, 
				value: this.startWork.value.trim(), 
				field: 'start_work'
			})
		})

		this.period.addEventListener('change', (e) => {
			this.save({
					id: this.data.id, 
					value: this.period.value.trim(), 
					field: 'period'
				})

			setAttr(this.sibling.period, {
				innerText: `${this.period.value} мес.`
			})
		})

		this.salary.addEventListener('change', (e) => {
			this.save({
				id: this.data.id, 
				value: this.salary.value.trim(), 
				field: 'salary'
			})
		})

		this.accomodation.addEventListener('change', (e) => {
			this.save({
					id: this.data.id, 
					value: this.accomodation.value.trim(), 
					field: 'residency'
				})
		})

		this.feeding.addEventListener('change', (e) => {
			this.save({
					id: this.data.id, 
					value: this.feeding.value.trim(), 
					field: 'feeding'
				})
		})

		this.taxes.addEventListener('change', (e) => {
				this.save({
					id: this.data.id, 
					value: this.taxes.value.trim(), 
					field: 'tax'
				})
		})

		this.workResp.addEventListener('change', (e) => {
				this.save({
					id: this.data.id, 
					value: this.workResp.value.trim(), 
					field: 'responsibilities_work'
				})
		})

		this.workTime.addEventListener('change', (e) => {
				this.save({
					id: this.data.id, 
					value: this.workTime.value.trim(), 
					field: 'work_time'
				})
		})
	}


	update(data, context){

		setAttr(this.startWork , {
			value: data.startWork
		})

		setAttr(this.period , {
			value: data.period
		})

		setAttr(this.salary , {
			value: data.salary
		})

		setAttr(this.accomodation , {
			value: data.residency
		})

		setAttr(this.feeding , {
			value:  data.feeding
		})

		setAttr(this.taxes , {
			value:  data.taxes
		})

		setAttr(this.workResp , {
			value:  data.workResp
		})

		setAttr(this.workTime , {
			value:  data.workTime
		})

		this.data = data
		this.sibling = context
	}

}
