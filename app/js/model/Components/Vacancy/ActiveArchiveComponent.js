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

		console.log(data)

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
			this.filter(data.filter, 'active', 'archive', 'activeVacancyFilter', 'archiveVacancyFilter')
		// this.filter(data.name, data.str, data.filter)
	}



	filter(id, str, str2, storageKey, storageKey2){
		//@param id - id соответствующего чекбокса, который прилетает с сервака
		//@param str - поле объекта параметра функции getVacancyList, которая выводит список работодателей
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		sessionStorage.setItem(storageKey, JSON.stringify(id))

		this.btn.addEventListener('change', filter)

		function filter(e){

			if(this.checked) {
				if(this.id === 'current-chbx') {
					sessionStorage.setItem(storageKey, JSON.stringify(id))
					getVacancyList({[str]: id, filtered: true})
				} else if(this.id === 'archive-chbx') {
					sessionStorage.setItem(storageKey2, JSON.stringify(id))
					getVacancyList({[str2]: id, filtered: true})
				}
				
			} else {
				if(this.id === 'current-chbx') {
					console.log('current-chbx')
					sessionStorage.setItem(storageKey, JSON.stringify(0))
					getVacancyList({[str]: 0, filtered: true})
				} else if(this.id === 'archive-chbx') {
					console.log('archive-chbx')
					sessionStorage.setItem(storageKey2, JSON.stringify(0))
					getVacancyList({[str2]: 0, filtered: true})
				}
			}
		}
		
	}
}


export default class ArchiveActive {
	constructor(){
		// this.data = [
		// 	{
		// 		type: 'checkbox',
		// 		id: 'current-chbx',
		// 		checked: true,
		// 		text: 'Текущие',
		// 		filter: 1
		// 	},
		// 	{
		// 		type: 'checkbox',
		// 		id: 'archive-chbx',
		// 		checked: false,
		// 		text: 'Архивные',
		// 		filter: 1
		// 	}
		// ]
		this.el = el('div.input-group.radio-group-type-2.blue', 
				this.list = list('div.group', ArchiveActiveRow)
			)

		// this.list.update(this.data)

	}


	update(data){
		this.list.update(data)
	}

}
