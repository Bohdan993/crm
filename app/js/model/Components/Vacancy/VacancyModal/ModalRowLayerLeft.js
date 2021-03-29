	import {el, setAttr, place, tippy, list, Autocomplete} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import { initVacancyModalTooltip } from '../../../initToottips'
import storage from '../../../Storage'
import {save, formatDate} from '../../../helper'



class CheckBoxVacancy {
	constructor(type) {
		this.type = type
			this.el = el('div.checkbox-group', 
			this.input = el('input', {
				type,
				id: "#"
			}),
			this.label = el('label', 'Чекбокс', {
				for: '#'
			}),
			)
		}

	update(data, index, items, context){

		setAttr(this.input, {
			id: this.type + '-' + data.id,
			checked: data.checked,
			name: this.type === 'radio' ? 'wt-radio-btn' : '',
			'data-id': this.type === 'radio' ? data.dataID : data.id
		})

		setAttr(this.label, {
			for: this.type + '-' + data.id,
			innerText: data.name
		})

	}
}

class ChooseProductTypePopup {
	constructor(){
	this.save = save.bind(this)
	this.checkedProducts = []
	this.checkBoxData = [
			{
			id: 'season-rbtn-1',
			name: 'Сезонная',
			'dataID': '1'

		},
		{
			id: 'practice-rbtn-1',
			name: 'Практика',
			'dataID': '2'
		},
		{
			id: 'work-rbtn-1',
			name: 'Рабочая',
			'dataID': '3'
		}
	]
		this.el = el('div.vacancy-modal-popup#work-type-popup', 
			this.form = el('form',
				el('div.form-group', 
					this.employerName = el('p'),
					el('div.input-group.radio-group-type-2.hot.top-group',
						this.list1 = list('div.group', CheckBoxVacancy, undefined, 'radio')),
					el('div.input-group.radio-group-type-2.hot.bottom-group',
						this.list2 = list('div.group', CheckBoxVacancy, undefined, 'checkbox')),
					this.btn = el('button.confirm-bnt', 
						el('span', 'OK'))
					)
				)
			)


		this.list1.update(this.checkBoxData)
		this.list2.update(this.getItemsFromLocalStorage().workTypes)


		this.form.addEventListener('submit', (e) =>{
			e.preventDefault()
			this.parent.choooseProduct._tippy.hide()
			this.parent.chooseProductType.update(false)
			this.parent.fullInfo.update(true)
			this.parent.fullInfo._el.style.display = "flex"

			let text = this.list1.views.filter(el => el.input.checked)[0].label.innerText
			let checkedID = this.list1.views.filter(el => el.input.checked)[0].input.getAttribute('data-id')

			setAttr(this.parent.visaType, {
				innerText: `${text} - ${'\u00A0'}`
			})
			setAttr(this.parent.types, {
				innerText: `${this.list2.views.filter(el => el.input.checked).map(el => el.label.innerText).join(', ')}`
			})

			this.list2.views.forEach(el => {
				if(el.input.checked) {
					this.checkedProducts.push(el.input.getAttribute('data-id'))
				}
			})

			console.log(this.checkedProducts.join(','))
			console.log(checkedID)

			setAttr(this.parent.products, {
				style: {
					backgroundColor: text === `Практика` ? '#9c3' : text === 'Сезонная' ? '#e37373' : '#39c'
				}
			})

			this.save({
				id: this.data, 
				value: checkedID, 
				field: 'type_vacancy'
			})

			this.save({
				id: this.data, 
				value: this.checkedProducts.join(','), 
				field: 'type_production'
			}).then(res => {
				if(res === 'ok') {
						this.list1.views.forEach(el => el.checked = false)
						this.list2.views.forEach(el => el.checked = false)
				}
			})
		})
	}

	update(data){
		console.log(data)

		this.data = data
	}


	onmount(){
	}

	getItemsFromLocalStorage(){

		let workTypes = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []

		return {
			workTypes
		}
	}
}

export default class ModalRowLayerLeft {
	constructor(){
		this.prodTypes = []
		this.el = el('div.modal-row__wrapper', 
			el('div.main-info__choose-block', 
				this.chooseEmployer = place(el('div.choose-employer', 
					el('p',
						el('span', 'Выберите работодателя')))),
				this.chooseProductType = place(el('div.choose-product-type',
					el('p.country-vacancy',
						this.abbrVacancy = el('span', 'NO 293')),
					this.choooseProduct = el('p.type-product', 
						 el('span', 'Выберите тип продукции'))
					)),
				this.fullInfo = place(el('div.full-info',
					el('p.country-vacancy', 
						this.fullInfoAbbrVacancy = el('span', 'NO 293')),
					this.products = el('p.products', 
						this.visaType = el('span.visa-type', 'Сезонная - '),
						this.types = el('span.types', 'Цветы, Теплицы, Молочные коровы, Мясные коровы')
						)))
				),
			el('div.main-info__layer_left',
				el('div.main-info__country', 
					el('p', 'Страна'),
					this.countries = el('span', '')
					),
				el('div.main-info__period', 
					el('p', 'Период'),
					this.period = el('span', '')),
				el('div.main-info__clients',
					el('p', 'Кол-во клиентов'),
					el('span.main-info__numbers', 
						this.totalClients = el('span.number-of-people.total-number.attention-number', ''),
						this.numberClients = el('span.number-of-people.attention-number', '')))),
			el('div.main-info__layer_right',
				el('div.main-info__price', 
					el('p', 'Цена вакансии'),
					this.price = el('span', '')),
				el('div.main-info__dates',
					el('p', 'Даты'),
					this.dates = el('span', '')),
				el('div.main-info__closes-vacancies', 
					el('p', 'Закрытые вакансии'),
					el('div.main-info__indicators', 
						el('span.indicator.decline.main-info__indicator', 
							el('span', '0')),
						el('span.indicator.choosen.main-info__indicator', 
							el('span', '0')),
						el('span.indicator.ready.main-info__indicator', 
							el('span', '0')),
						el('span.indicator.wait.main-info__indicator', 
							el('span', '0')),
						el('span.indicator.department.main-info__indicator', 
							el('span', '0')),
						el('span.indicator.busy.main-info__indicator', 
							el('span', '0')))))
			)

		this.findEmployerPopup = new FindEmployerPopupComponent('Left')
		this.findEmployerPopup.el.style.display = "block"
		this.findEmployerPopup.parent = this

		this.chooseProductTypePopup = new ChooseProductTypePopup()
		this.chooseProductTypePopup.el.style.display = 'block'
		this.chooseProductTypePopup.parent = this
	}

	update(data, context){
		console.log(data, context)


		let d = new Date(data.date.split('.').reverse().join('.'))
		d.setMonth(+d.getMonth() + +data.period)

		if(context === 'storage') {
			this.chooseEmployer.update(false)
			this.chooseProductType.update(true)
			this.chooseProductType._el.style.display = "flex"

			setAttr(this.abbrVacancy, {
				innerText: data.vacancy ? data.vacancy : ''
			})
		}


		if(context === 'nulledEmployer') {
			this.chooseEmployer.update(true)
			this.chooseProductType.update(false)
			this.fullInfo.update(false)
			this.chooseProductType._el.style.display = "none"
			this.fullInfo._el.style.display = "none"

			setAttr(this.dates, {
				innerText: data.period ? `${data.date} - ${formatDate(d)}`: '-'
			})
		}


		if(context === 'employer') {
			this.chooseEmployer.update(false)

			if(data.type_vacancy !== '0') {

				this.chooseProductType.update(false)
				this.fullInfo.update(true)
				this.chooseProductType._el.style.display = "none"
				this.fullInfo._el.style.display = "flex"

			} else {

				this.chooseProductType.update(true)
				this.fullInfo.update(false)
				this.chooseProductType._el.style.display = "flex"
				this.fullInfo._el.style.display = "none"
			}


			setAttr(this.dates, {
				innerText: data.period ? `${data.date} - ${formatDate(d)}`: '-'
			})

		}

		setAttr(this.countries, {
			innerText: data.employer.id_country ? this.getItemsFromLocalStorage().countries.filter(el=> el.id === data.employer.id_country)[0]?.name : '-'
		})

		// setAttr(this.abbrVacancy, {
		// 	innerText: data.vacancyName ? data.vacancyName : ''
		// })

		setAttr(this.fullInfoAbbrVacancy, {
			innerText: data.vacancyName ? data.vacancyName : ''
		})

		setAttr(this.price, {
			innerText: data.employer.price ? data.employer.price : 'не достаточно данных'
		})

		setAttr(this.visaType, {
			innerText: data.type_vacancy === '1' ? `Сезонная - ${'\u00A0'}` : data.type_vacancy === '2' ? `Практика - ${'\u00A0'}` : `Рабочая - ${'\u00A0'}`
		})


	

		let arr = data.type_production.split(',')
		let wt = this.getItemsFromLocalStorage().workTypes

		arr.forEach(el => {
			wt.forEach(elem => {
				if(+el === +elem.id) {
					this.prodTypes.push(elem.name)
				}
			})
		})

		setAttr(this.types, {
			innerText: this.prodTypes.join(', ')
		})

		setAttr(this.products, {
				style: {
					backgroundColor: data.type_vacancy === '2' ? '#9c3' : data.type_vacancy === '1' ? '#e37373' : '#39c'
				}
			})

		setAttr(this.totalClients, {
			innerText: `${data.clients}`
		})

		setAttr(this.numberClients, {
			innerText: `${+data.men ? ('\u00A0' + '-' + '\u00A0' + 'М' + data.men) : ''} ${+data.women ? ('Ж' + data.women) : ''}`
		})


		setAttr(this.period, {
			innerText: data.period ? data.period + ' мес.' : '-'
		})

		this.chooseProductTypePopup.update(data.idVac)

		setTimeout(()=>{this.prodTypes = []}, 0)

	// }

		this.data = data
	}


	onmount() {
		this.chooseEmployer.update(true)
		this.findEmployerInstance = initVacancyModalTooltip(this.chooseEmployer._el, this.findEmployerPopup.el, tippy)
		this.chooseProductTypeInstance = initVacancyModalTooltip(this.choooseProduct, this.chooseProductTypePopup.el, tippy)


		document.addEventListener('storageemployeradd', (e) => {

			this.chooseEmployer.update(false)
			this.chooseProductType.update(true)
			this.chooseProductType._el.style.display = "flex"
			this.update(storage.getState(e.detail.id), 'storage')
			
		})
	}


	getItemsFromLocalStorage(){

		let countries = JSON.parse(localStorage.getItem('countriesVacancy')) || []
		let workTypes = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []

		return {
			countries,
			workTypes
		}
	}


}