import {el, setAttr} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'

export default class ManagerPopup {
	constructor(type = 'employer'){
		this.type = type
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: 'chbx'
			}),
			this.label = el('label' ,{
				for: 'chbx'
			}, this.tag = el('i.tag.manager-tag'))
			)
	}

	 update(data, index, items, context) {
	 		// console.log(data)
			this.data = data
			this.data.index = index
			setAttr(this.input, {
				id: 'manager-chbx-' + data.id,
				checked: data.checked
			})
			setAttr(this.tag, {
				innerText: data.name
			})
			setAttr(this.label, {
				for: 'manager-chbx-' + data.id,
				innerHTML: `<i class="tag manager-tag" style="background-color:${'#' + data.color}">${data.name.split(/\s+/).map(word => word[0].toUpperCase()).join('')}</i>${data.name}`
			})

			if(this.type === 'employer') {
				this.filter(data.id, 'manager', 'managerFilter')
			} else {
				this.filter(data.id, 'manager', 'managerFilterVacancy')
			}
			
	}

	filter(id, str, storageKey){
		this.input.addEventListener('change', filter)

		function filter(e){
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			ManagerPopup.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				ManagerPopup.checkedArr.push(id)

				if(this.type === 'employer') {
					getEmployersList({[str]: ManagerPopup.checkedArr.join(',')})
				} else {
					getVacancyList({[str]: ManagerPopup.checkedArr.join(',')})
				}
				
				sessionStorage.setItem(storageKey, JSON.stringify(ManagerPopup.checkedArr.join(',')))
			} else {
				ManagerPopup.checkedArr = ManagerPopup.checkedArr.filter(el => el !== id)

				if(this.type === 'employer') {
					getEmployersList({[str]: ManagerPopup.checkedArr.join(',')})
				} else {
					getVacancyList({[str]: ManagerPopup.checkedArr.join(',')})
				}

				sessionStorage.setItem(storageKey, JSON.stringify(ManagerPopup.checkedArr.join(',')))
			}
		}
		
	}
}
