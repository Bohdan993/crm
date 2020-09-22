import {el, setAttr} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'



export default class SidebarPopupInterface { // класс от которого наследутся CountryPopup, TypeManufacturyPopup, ContactDataPopup
	constructor(){
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
				id: 'country-chbx-' + data.id,
				checked: data.checked
			})
			setAttr(this.label, {
				for: 'country-chbx-' + data.id,
				innerText: data.name
			})
			this.data = data
			this.data.index = index
	}


	filter(id, str, storageKey){
		//@param id - id соответствующего чекбокса, который прилетает с сервака
		//@param str - поле объекта параметра функции getEmployersList, которая выводит список работодателей
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		this.input.addEventListener('change', filter)

		function filter(e){
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			SidebarPopupInterface.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				SidebarPopupInterface.checkedArr.push(id)
				getEmployersList({[str]: SidebarPopupInterface.checkedArr.join(',')})
				
				sessionStorage.setItem(storageKey, JSON.stringify(SidebarPopupInterface.checkedArr.join(',')))
			} else {
				SidebarPopupInterface.checkedArr = SidebarPopupInterface.checkedArr.filter(el => el !== id)
				getEmployersList({[str]: SidebarPopupInterface.checkedArr.join(',')})
				sessionStorage.setItem(storageKey, JSON.stringify(SidebarPopupInterface.checkedArr.join(',')))
			}
		}
		
	}
}




