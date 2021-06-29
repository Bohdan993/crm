import {
	el,
	setAttr,
	list
} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/Employer/getEmployersList'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'
import CheckBox from './CheckBox';

//*comment* Это тот класс, который отвечает за формирование списка меток
export class StringsPopup {
	constructor() {
		this.data = {}
		this.el = el('fieldset',
			el('p', 'Метки'),
			//*comment*
			el('div.input-group.radio-group-type-1',
				this.list1 = list('div.group', CheckBox, 'id'),
				this.list2 = list('div.group', CheckBox, 'id'),
				this.list3 = list('div.group', CheckBox, 'id'),
				this.list4 = list('div.group', CheckBox, 'id'),
			)
		)

	}

	update(data, index, items, context) {
		this.data = data
		//*comment*
		let data1 = data.slice(0, 2)
		let data2 = data.slice(2, 4)
		let data3 = data.slice(4, 7)
		let data4 = data.slice(7)

		this.list1.update(data1)
		this.list2.update(data2)
		this.list3.update(data3)
		this.list4.update(data4)
	}
}
//


class ManagerPopup {
	constructor(type = 'employer') {
		this.type = type
		this.el = el('div.input-group',
			this.input = el('input', {
				type: 'checkbox',
				id: 'chbx'
			}),
			this.label = el('label', {
				for: 'chbx'
			}, this.tag = el('i.tag.manager-tag'))
		)
	}

	update(data, index, items, context) {
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

		if (this.type === 'employer') {
			this.filter(data.id, 'manager', 'managerFilter')
		} else {
			this.filter(data.id, 'manager', 'managerFilterVacancy')
		}

	}

	filter(id, str, storageKey) {
		this.input.addEventListener('change', filter)
		let $this = this

		function filter(e) {
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			ManagerPopup.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ?
				JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if (this.checked) {
				ManagerPopup.checkedArr.push(id)

				if ($this.type === 'employer') {

					getEmployersList({
						[str]: ManagerPopup.checkedArr.join(',')
					})
				} else {
					getVacancyList({
						[str]: ManagerPopup.checkedArr.join(',')
					})
				}

				sessionStorage.setItem(storageKey, JSON.stringify(ManagerPopup.checkedArr.join(',')))
			} else {
				ManagerPopup.checkedArr = ManagerPopup.checkedArr.filter(el => el !== id)

				if ($this.type === 'employer') {

					getEmployersList({
						[str]: ManagerPopup.checkedArr.join(',')
					})
				} else {
					getVacancyList({
						[str]: ManagerPopup.checkedArr.join(',')
					})
				}

				sessionStorage.setItem(storageKey, JSON.stringify(ManagerPopup.checkedArr.join(',')))
			}
		}

	}
}


export default class ManagerPopupList {
	constructor(str) {
		this.el = el('fieldset',
			el('p', 'Менеджеры'),
			this.list = list('div.group', ManagerPopup, 'id', str)
		)

	}

	update(data, index, items, context) {
		this.data = data
		this.data.index = index

		this.list.update(data)
	}
}