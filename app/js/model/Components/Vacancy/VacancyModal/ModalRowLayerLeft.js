import {el, setAttr, place, tippy, list, Autocomplete} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import { initVacancyModalTooltip } from '../../../initToottips'
import storage from '../../../Storage'

`<div class="vacancy-modal-popup" id="work-type-popup" style="display: block;">
          <form>
            <div class="form-group">
              <p>Thompson Equestrian Partners</p>
              <div class="input-group radio-group-type-2 hot top-group">
                <div class="group">
                  <input type="radio" id="season-rbtn" name="vacancies-rbtn" checked="true" value="Сезонная">
                  <label for="season-rbtn">Сезонная</label>
                  <input type="radio" id="practice-rbtn" name="vacancies-rbtn" value="Практика">
                  <label for="practice-rbtn">Практика</label>
                  <input type="radio" id="work-rbtn" name="vacancies-rbtn" value="Рабочая">
                  <label for="work-rbtn">Рабочая</label>
                </div>
              </div>
              <div class="input-group radio-group-type-2 hot bottom-group">
                <div class="group">
                  <input type="checkbox" id="greenhouses-chbx-2" name="greenhouses-chbx-2" checked="true" value="Теплицы">
                  <label for="greenhouses-chbx-2">Теплицы</label>
                  <input type="checkbox" id="flowers-chbx-2" name="flowers-chbx-2" value="Цветы">
                  <label for="flowers-chbx-2">Цветы</label>
                  <input type="checkbox" id="fields-chbx-2" name="fields-chbx-2" value="Поля">
                  <label for="fields-chbx-2">Поля</label>
                </div>
              </div>
              <button class="confirm-bnt"><span>OK</span></button>
            </div>
          </form>
        </div>`


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
	}
}

class ChooseProductTypePopup {
	constructor(){
		this.el = el('div.vacancy-modal-popup#work-type-popup', 
			this.form = el('form',
				el('div.form-group', 
					this.employerName = el('p'),
					el('div.input-group.radio-group-type-2.hot.top-group',
						this.list1 = list('div.group', CheckBoxVacancy)),
					el('div.input-group.radio-group-type-2.hot.bottom-group',
						this.list2 = list('div.group', CheckBoxVacancy)),
					)
				)
			)
	}

	update(){

	}
}

export default class ModalRowLayerLeft {
	constructor(){
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
				el('div.full-info',
					el('p.country-vacancy', 
						el('span', 'NO 293')),
					el('p.products', 
						el('span.visa-type', 'Сезонная - '),
						el('span.types', 'Цветы, Теплицы, Молочные коровы, Мясные коровы')
						))
				),
			el('div.main-info__layer_left',
				el('div.main-info__country', 
					el('p', 'Страны'),
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

	update(data){
		console.log(data)
		
		setAttr(this.countries, {

			innerText: data.employer.id_country ? this.getItemsFromLocalStorage().countries.filter(el=> el.id === data.employer.id_country)[0].name : ''
		})


		setAttr(this.abbrVacancy, {
			innerText: data.vacancy ? data.vacancy : ''
		})



		setAttr(this.price, {
			innerText: data.employer.price ? data.employer.price : 'не достаточно данных'
		})
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
			this.update(storage.getState(e.detail.id))
			
		})
	}


		getItemsFromLocalStorage(){

		let countries = JSON.parse(localStorage.getItem('countriesVacancy')) || []

		return {
			countries
		}
	}

}