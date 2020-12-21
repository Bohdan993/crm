import {el, setAttr, list} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'

class RadioGroup {
	constructor() {
			this.data = ''
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

		this.data = data.id
	}
	filter(id, str, storageKey, e){
		let $this = this
		filter()
		
		function filter() {
			//this - один чекбокс в попапе
			if($this.input.checked) {
				getEmployersList({[str]: id})
				if(id !== '') {
					sessionStorage.setItem(storageKey, JSON.stringify(id))
				} else {
					sessionStorage.removeItem(storageKey)
				}
				
			}
		}
	}

	onmount(){
		this.input.addEventListener('change', this.filter.bind(this, this.data, 'intermediary', 'intermediaryFilter'))
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
		
		this.el = el('form', 
			this.list1 = list(".input-group.radio-group-type-1", RadioGroup, 'id'),
			this.list2 = list("div", IntermediariesCheckbox, 'id'))

		

	}

	update(data){

		let $this = this
		this.list1.update(data.radioGroupData)
		this.list2.update(data.intermediaries)

		this.checkedArr = Array(this.list2.views.length).fill('')
		this.getItemsLocalStorage().intermediaries.forEach(el => {
			if(el !== '') {
				console.log(el)
				this.checkedArr[+el - 1] = '1'
			}
		})


		this.list2.views.forEach((view, ind) => {
			view.input.addEventListener('change', function(e){


				if(this.checked) {
					$this.checkedArr[ind] = '1'
				} else {
					$this.checkedArr[ind] = ''
				}


				let flag = $this.checkedArr.some(el => {
					return el !== ''
				})


				let flag2 = $this.list1.views.some(el => {
					return el.input.checked
				})


				if(!flag2 && flag) {
					$this.list1.views[0].input.checked = true
					$this.list1.views[0].filter('1', 'intermediary', 'intermediaryFilter')
				}

				if(!flag) {
					$this.list1.views[0].filter('', 'intermediary', 'intermediaryFilter')
					$this.list1.views.forEach(el => {
						el.input.checked = false
					})
				}


			})
		})
	}

	getItemsLocalStorage(){
		let intermediaries = JSON.parse(sessionStorage.getItem('intermediariesFilter')) || ''
		intermediaries = intermediaries.split(',')

		return {
			intermediaries
		}
	}

}




