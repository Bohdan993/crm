import {el, setAttr, list} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'

class CheckBoxVacancyEarlier {
	constructor() {
			this.el = el('fieldset', 
			el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: "earlier-chbx"
			}),
			this.label = el('label', 'Ранее предоставляли вакансии', {
				for: 'earlier-chbx'
			}),
			))
		}

	update(data, index, items, context) {
		// console.log(data)
		setAttr(this.input, {
			id: data.id,
			checked: data.checked
		})
		setAttr(this.label, {
			for: data.id,
			innerText: data.label
		})

		this.filter('vacancy_active', 'vacancyActiveFilter')
	}
	filter(str, storageKey){
		this.input.addEventListener('change', filter)
		function filter(e){
			if(!this.checked) {
				getEmployersList({[str]: '0'})
				sessionStorage.setItem(storageKey, JSON.stringify(''))
			} else {
				getEmployersList({[str]: '1'})
				sessionStorage.setItem(storageKey, JSON.stringify('1'))
			}
		}
	}
}


class CheckBoxVacancy {
	constructor() {
			this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: "#"
			}),
			this.label = el('label', 'Чекбокс', {
				for: '#'
			}),
			)
		}

	update(data, index, items, context){
		// console.log(data)
		setAttr(this.input, {
			id: data.id,
			checked: data.checked
		})
		setAttr(this.label, {
			for: data.id,
			innerText: data.label
		})

		this.filter(data.name, data.str, data.filter)
	}

	filter(id, str, storageKey){
		//@param id - id соответствующего чекбокса, который прилетает с сервака
		//@param str - поле объекта параметра функции getEmployersList, которая выводит список работодателей
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		this.input.addEventListener('change', filter)

		function filter(e){
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			CheckBoxVacancy.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				CheckBoxVacancy.checkedArr.push(id)
				getEmployersList({[str]: CheckBoxVacancy.checkedArr.join(',')})
				
				sessionStorage.setItem(storageKey, JSON.stringify(CheckBoxVacancy.checkedArr.join(',')))
			} else {
				CheckBoxVacancy.checkedArr = CheckBoxVacancy.checkedArr.filter(el => el !== id)
				getEmployersList({[str]: CheckBoxVacancy.checkedArr.join(',')})
				sessionStorage.setItem(storageKey, JSON.stringify(CheckBoxVacancy.checkedArr.join(',')))
			}
		}
		
	}
}



class VacancyPopupType {
	constructor(){
	
		this.el= el('fieldset',
				el('p', 'Тип вакансии'),
				el('div.input-group.radio-group-type-2',
					this.list = list('div.group', CheckBoxVacancy)
				)
			)

	}

	 update(data, index, items, context) {
			this.data = data
			this.data.index = index

			this.list.update(data)
	}
}


class VacancyPopupTerm {
	constructor(){
	
		this.el= el('fieldset',
				el('p', 'Срок вакансии'),
				el('div.input-group.radio-group-type-2.yellow',
					this.list1 = list('div.group', CheckBoxVacancy),
					this.list2 = list('div.group', CheckBoxVacancy)
				)
			)

	}

	 update(data, index, items, context) {
			this.data = data
			this.data.index = index
			let data1 = data.slice(0, 3)
			let data2 = data.slice(3)
			this.list1.update(data1)
			this.list2.update(data2)
	}

}


export {
	CheckBoxVacancyEarlier,
	VacancyPopupType,
	VacancyPopupTerm
}

