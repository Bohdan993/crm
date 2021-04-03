import {el, setAttr, list} from '../../../../libs/libs'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'


class ArchiveActiveRow {
	constructor(){
		this.el = el('div.btn-group',
			this.btn = el('input'),
			this.label = el('label') 
			)
	}

	update(data){

		setAttr(this.btn, {
			type: data.type,
			id: data.id,
			name: data.id,
			checked: data.checked
		})

		setAttr(this.label, {
			for: data.id,
			innerText: data.text
		})
		this.filter(data.filter, data.str, data.storageKey)
		// this.filter(data.name, data.str, data.filter)
	}



	filter(id, str, storageKey){
		//@param id - id соответствующего чекбокса, который прилетает с сервака
		//@param str - поле объекта параметра функции getVacancyList, которая выводит список вакансий
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		sessionStorage.setItem(storageKey, JSON.stringify(id))

		this.btn.addEventListener('change', filter)

		function filter(e){
			if(this.checked) {
					sessionStorage.setItem(storageKey, JSON.stringify(1))
					getVacancyList({[str]: 1})
			} else {
					sessionStorage.setItem(storageKey, JSON.stringify(0))
					getVacancyList({[str]: 0})
			}
		}
	}
}


export default class ArchiveActive {

	constructor(){
		this.el = el('div.input-group.radio-group-type-2.blue', 
				this.list = list('div.group', ArchiveActiveRow)
			)
	}


	update(data){
		this.list.update(data)
	}

}
