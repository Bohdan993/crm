import {el} from '../../../libs/libs'
import saveFieldsData from '../fetchingData/saveFieldsData'
import initWorkModalSelect from '../initWorkModalSelect'
export default class ManagerSelect { // to ../MountingElements/Employer/WorkModal/mountManagerSelect.js
	constructor(type){
		this.type = type
		this.el = el('div.input-group', 
			el('p', "Менеджер"),
			this.manager = el('select.manager-select', {
				name: 'manager-select'
					}
				)
			)

		this.manager.addEventListener('change' , (e) => {
				if(this.type === 'employer') {
                   saveFieldsData({
                    str: 'employers',
                    id: this.context.id,
                    value: this.textarea.value, 
                    field: 'name', 
                    target: 'main', 
                    id_target: ''
                   })
                } else {

                }
		})

		if(this.type === 'employer') {
			this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managers'))})
		} else {
			this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managersVacancy'))})
		}
		
	}

	update(data){

		this.managerChoices.managersChoises.setChoiceByValue(data)
	}
}
