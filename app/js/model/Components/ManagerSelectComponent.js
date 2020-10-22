import {el} from '../../../libs/libs'
import initWorkModalSelect from '../initWorkModalSelect'
export default class ManagerSelect { // to ../MountingElements/Employer/WorkModal/mountManagerSelect.js
	constructor(){

		this.el = el('div.input-group', 
			el('p', "Менеджер"),
			this.manager = el('select.manager-select', {
				name: 'manager-select'
					}
				)
			)
		this.managerChoices = initWorkModalSelect(this.manager, {managers: JSON.parse(localStorage.getItem('managers'))})
	}

	update(data){
		console.log(data)
	}
}
