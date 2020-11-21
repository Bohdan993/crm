import {el, setAttr} from '../../../libs/libs'
import getEmployersList from '../fetchingData/getEmployersList'
import getVacancyList from '../fetchingData/Vacancy/getVacancyList'



export default class SidebarPopupRadioInterface { // класс от которого наследутся LastContactPopup,SortingPopup
	constructor(type = 'employer'){
		this.type = type
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'radio',
				id: 'chbx'
			}),
			this.label = el('label' ,{
				for: 'chbx'
			})
			)
	}
	 update(data, index, items, context) {

			setAttr(this.input, {
				id: data.prefix + data.id,
				checked: data.checked,
				name: data.prefix + 'name'
			})
			setAttr(this.label, {
				for: data.prefix + data.id,
				innerText: data.name
			})
			this.data = data
			this.data.index = index
	}


	filter(id, str, storageKey){
		let type = this.type

		this.input.addEventListener('change', filter)
		function filter(e){
			//this - один чекбокс в попапе
			if(this.checked) {
				if(type === 'employer') {
					getEmployersList({[str]: id})
				} else {

					getVacancyList({[str]: id})
				}
				
				sessionStorage.setItem(storageKey, JSON.stringify(id))
			}
		}
	}
}




