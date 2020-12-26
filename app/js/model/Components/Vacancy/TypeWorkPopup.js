import {el, setAttr, list} from '../../../../libs/libs'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'
import SidebarPopupInterface from '../SidebarPopupInterface'



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
		//@param str - поле объекта параметра функции getVacancyList, которая выводит список работодателей
		//@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
		this.input.addEventListener('change', filter)

		function filter(e){
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			CheckBoxVacancy.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				console.log(id, str, storageKey)
				CheckBoxVacancy.checkedArr.push(id)
				getVacancyList({[str]: CheckBoxVacancy.checkedArr.join(','), filtered: true})
				
				sessionStorage.setItem(storageKey, JSON.stringify(CheckBoxVacancy.checkedArr.join(',')))
			} else {
				CheckBoxVacancy.checkedArr = CheckBoxVacancy.checkedArr.filter(el => el !== id)
				getVacancyList({[str]: CheckBoxVacancy.checkedArr.join(','), filtered: true})
				sessionStorage.setItem(storageKey, JSON.stringify(CheckBoxVacancy.checkedArr.join(',')))
			}
		}
		
	}
}



class VacancyPopupType {
	constructor(){
			
		this.el= el('div.form-group', 
				el('fieldset',
				el('p', 'Тип работы'),
				el('div.input-group.radio-group-type-2.hot',
					this.list = list('div.group', CheckBoxVacancy)
				)
			))

	}

	 update(data, index, items, context) {
			this.data = data
			this.data.index = index

			this.list.update(data)
	}
}


class TypeManufacturyRow extends SidebarPopupInterface {
  constructor(type){
    super(type)
  }

  update(data, index, items, context) {
    super.update(data, index, items, context)
    this.filter(data.id, 'type_production', 'typeManufacturyVacancyFilter')
  }


  filter(id, str, storageKey){
    super.filter(id, str, storageKey)
  }
}



class TypeManufactury {
	constructor(type){
		this.type = type
		this.el = el('div.form-group',
			el('fieldset',
				el('p', 'Тип производства'),
				this.list = list('div', TypeManufacturyRow, 'id', this.type)
				),
				el('fieldset', 
					this.list2 = list('div', TypeManufacturyRow, 'id', this.type)
					) 
			)
	}

	update(data){

		const end = data.length
		const middle = Math.ceil(end/2)
		const prod1 = data.slice(0, middle)
		const prod2 = data.slice(middle, end)

		this.list.update(prod1)
		this.list2.update(prod2)
	}
}




export {
	VacancyPopupType,
	TypeManufactury
}
