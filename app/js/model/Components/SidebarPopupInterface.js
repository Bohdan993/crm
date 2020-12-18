import {el, setAttr} from '../../../libs/libs'
import getEmployersList from '../fetchingData/getEmployersList'
import getVacancyList from '../fetchingData/Vacancy/getVacancyList'



export default class SidebarPopupInterface { // класс от которого наследутся CountryPopup, TypeManufacturyPopup, ContactDataPopup
	constructor(type = 'employer'){
		this.type = type
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
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
				checked: data.checked
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
		
		//@param id - id соответствующего чекбокса, который прилетает с сервака
		//@param str - поле объекта параметра функции getEmployersList, которая выводит список работодателей
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		this.input.addEventListener('change', filter)

		function filter(e){
			// console.log(type)
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			SidebarPopupInterface.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				SidebarPopupInterface.checkedArr.push(id)
				
				if(type === 'employer') {
					getEmployersList({[str]: SidebarPopupInterface.checkedArr.join(','), filtered: true})
				} else {

					getVacancyList({[str]: SidebarPopupInterface.checkedArr.join(','), filtered: true})
				}
				
				sessionStorage.setItem(storageKey, JSON.stringify(SidebarPopupInterface.checkedArr.join(',')))
			} else {
				SidebarPopupInterface.checkedArr = SidebarPopupInterface.checkedArr.filter(el => el !== id)

				if(type === 'employer') {
					getEmployersList({[str]: SidebarPopupInterface.checkedArr.join(','), filtered: true})
				} else {
					getVacancyList({[str]: SidebarPopupInterface.checkedArr.join(','), filtered: true})
				}
				sessionStorage.setItem(storageKey, JSON.stringify(SidebarPopupInterface.checkedArr.join(',')))
			}
		}
		
	}
}




