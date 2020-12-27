import {el} from '../../../libs/libs'
// import saveFieldsData from '../fetchingData/saveFieldsData'
import initWorkModalSelect from '../initWorkModalSelect'
import storage from '../Storage'
import {save} from '../helper'
import {default as employersStorage} from '../Storage/globalEmployers'

export default class ManagerSelect { // to ../MountingElements/Employer/WorkModal/mountManagerSelect.js
	constructor(type){
		this.type = type
		this.save = save.bind(this)
		this.el = el('div.input-group', 
			el('p', "Менеджер"),
			this.manager = el('select.manager-select', {
				name: 'manager-select'
					}
				)
			)

		this.manager.addEventListener('change' , (e) => {
				if(this.type === 'employer') {
									this.save({
										str: 'employers',
										id: this.data.id,
										value: this.manager.value, 
										field: 'id_login'
									})
					let currManager = JSON.parse(localStorage.getItem('managers')).filter(el=> el.id === this.manager.value)[0]
					employersStorage.setPartialState(this.data.id, 'id_employer', 'manager', currManager ? currManager.name.split(' ').map(el => el[0]).join('') : '')
					employersStorage.setPartialState(this.data.id, 'id_employer', 'manager_color', currManager ? currManager.color: '')
					 
                } else {
                	this.save({
										id: this.data.id,
										value: this.manager.value, 
										field: 'id_manager',
										target: 'employer'
									})
                }
		})

		if(this.type === 'employer') {
			this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managers'))})
		} else {
			this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managersVacancy'))})
		}
		
	}

	update(data){
		// console.log(data)
		this.managerChoices.managersChoises.setChoiceByValue(data.id_manager)

		this.data = data
	}

	onmount() {
		document.addEventListener('storageemployeradd', (e) => {
            this.update(storage.getState(e.detail.id).employer.id_manager)
        })
	}
}
