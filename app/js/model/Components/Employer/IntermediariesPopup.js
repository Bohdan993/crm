import {el, setAttr, list} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'

class RadioGroup {
	constructor() {
			this.el = el('div', 
			this.input = el('input#show-rbtn', {
				type: 'radio',
				name: "intermediaries-rbtn"
			}),
			this.label = el('label', 'Показать', {
				for: 'show-rbtn'
			}),
			)
		}

	update(data) {

		setAttr(this.input, {
			id: data['data-id'],
			checked: data.checked
		})
		setAttr(this.label, {
			for: data['data-id'],
			innerText: data.label
		})

		this.filter(data.id, 'intermediary', 'intermediaryFilter')
	}
	filter(id, str, storageKey){
		this.input.addEventListener('change', filter)
		function filter(e){
			//this - один чекбокс в попапе
			if(this.checked) {
				getEmployersList({[str]: id})
				sessionStorage.setItem(storageKey, JSON.stringify(id))
			}
		}
	}
}

class IntermediariesCheckbox {
	constructor(){
		this.el= el('div.input-group', 
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
			this.data = data
			this.data.index = index
			setAttr(this.input, {
				id: 'intermediary-chbx-' + data.id,
				checked: data.checked
			})
			setAttr(this.label, {
				for: 'intermediary-chbx-' + data.id,
				innerText: data.name
			})
			this.filter(data.id, 'intermediaries', 'intermediariesFilter')
	}

	filter(id, str, storageKey){
		this.input.addEventListener('change', filter)

		function filter(e){
			//В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
			IntermediariesPopup.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
			//this - один чекбокс в попапе
			if(this.checked) {
				IntermediariesPopup.checkedArr.push(id)
				getEmployersList({[str]: IntermediariesPopup.checkedArr.join(','), filtered: true})
				
				sessionStorage.setItem(storageKey, JSON.stringify(IntermediariesPopup.checkedArr.join(',')))

			} else {
				IntermediariesPopup.checkedArr = IntermediariesPopup.checkedArr.filter(el => el !== id)
				getEmployersList({[str]: IntermediariesPopup.checkedArr.join(','), filtered: true})
				sessionStorage.setItem(storageKey, JSON.stringify(IntermediariesPopup.checkedArr.join(',')))
			}
		}
		
	}
}


export default class IntermediariesPopup {
	constructor(){
		this.checkedArr = []
		this.el = el('form', 
			this.list1 = list(".input-group.radio-group-type-1", RadioGroup, 'id'),
			this.list2 = list("div", IntermediariesCheckbox, 'id'))

	}

	update(data){
		let $this = this
		this.list1.update(data.radioGroupData)
		this.list2.update(data.intermediaries)

		this.list2.views.forEach((view, ind) => {
			view.input.addEventListener('change', function(e){
				if(this.checked) {
					$this.checkedArr[ind] = true
				} else {
					$this.checkedArr[ind] = false
				}


				let flag = $this.checkedArr.some(el => {
					return el === true
				})


				// if(flag && !$this.list1.views[1].input.checked) {
				// 	$this.list1.views[0].input.checked = true
				// } else if (flag && $this.list1.views[1].input.checked) {
				// 	$this.list1.views[0].input.checked = false
				// 	$this.list1.views[1].input.checked = false
				// }
			})
		})
	}

}




