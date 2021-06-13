import {
	el
} from '../../../libs/libs'
import initWorkModalSelect from '../initWorkModalSelect'
import {
	save
} from '../helper'
import employersStorage from '../Storage/globalEmployers'
import employerListUpdateEvent from './../CustomEvents/employerListUpdateEvent'
import vacancyStorage from '../Storage/globalVacancies'

import vacancyListUpdateFetchEvent from '../CustomEvents/vacancyListUpdateFetchEvent'


export default class ManagerSelect { // to ../MountingElements/Employer/WorkModal/mountManagerSelect.js
	constructor(type) {
		this.type = type
		this.save = save.bind(this)
		this.el = el('div.input-group',
			el('p', "Менеджер"),
			this.manager = el('select.manager-select', {
				name: 'manager-select'
			})
		)

		this.manager.addEventListener('change', (e) => {
			if (this.type === 'employer') {
				this.save({
					str: 'employers',
					id: this.data.id,
					value: this.manager.value,
					field: 'id_login'
				})
				let currManager = JSON.parse(localStorage.getItem('managers')).filter(el => el.id === this.manager.value)[0]
				employersStorage.setPartialState(this.data.id, 'id_employer', 'manager', currManager ? currManager.name.split(' ').map(el => el[0]).join('') : '')
				employersStorage.setPartialState(this.data.id, 'id_employer', 'manager_color', currManager ? currManager.color : '')
				sessionStorage.setItem('currActiveManagerId', JSON.stringify(currManager?.id || null))
				employerListUpdateEvent.detail.id = this.data.id
				document.dispatchEvent(employerListUpdateEvent)
			} else {
				this.save({
					id: this.data.id,
					value: this.manager.value,
					field: 'id_manager',
					target: 'employer'
				})

				let currManager = JSON.parse(localStorage.getItem('managersVacancy')).filter(el => el.id === this.manager.value)[0]
				vacancyStorage.setPartialState(this.data.id_vacancy, 'id_vacancy', 'manager', currManager ? currManager.name.split(' ').map(el => el[0]).join('') : '')
				vacancyStorage.setPartialState(this.data.id_vacancy, 'id_vacancy', 'manager_color', currManager ? currManager.color : '')
				vacancyListUpdateFetchEvent.detail.id = this.data.id_vacancy
				document.dispatchEvent(vacancyListUpdateFetchEvent)
			}
		})

		if (this.type === 'employer') {
			this.managerChoices = initWorkModalSelect(this.manager, {
				managers: JSON.parse(localStorage.getItem('managers'))
			})
		} else {
			this.managerChoices = initWorkModalSelect(this.manager, {
				managers: JSON.parse(localStorage.getItem('managersVacancy'))
			})
		}

	}

	update(data) {
		// console.log(data)
		this.managerChoices.managersChoises.setChoiceByValue(data.id_manager)

		this.data = data
	}

	onmount() {
		document.addEventListener('storageemployeradd', (e) => {

			const {
				vacancyEmployerData: employer,
				employerId
			} = e.detail

			const managersData = {
				id_manager: employer.employer.id_manager,
				id: employerId
			}

			this.update(managersData)

		})
	}
}