import {el, setAttr, place, tippy, Autocomplete} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import { initVacancyModalTooltip } from '../../../initToottips'

export default class ModalRowLayerLeft {
	constructor(){
		this.el = el('div.modal-row__wrapper', 
			el('div.main-info__choose-block', 
				this.chooseEmployer = el('div.choose-employer', 
					el('p',
						el('span', 'Выберите работодателя'))),
				el('div.choose-product-type',
					el('p.country-vacancy',
						el('span', 'NO 293')),
					el('p.type-product', 
						el('span', 'Выберите тип продукции'))
					),
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
					el('span', '')
					),
				el('div.main-info__period', 
					el('p', 'Период'),
					el('span', '')),
				el('div.main-info__clients',
					el('p', 'Кол-во клиентов'),
					el('span.main-info__numbers', 
						el('span.number-of-people.total-number.attention-number', ''),
						el('span.number-of-people.attention-number', '')))),
			el('div.main-info__layer_right',
				el('div.main-info__price', 
					el('p', 'Цена вакансии'),
					el('span', '')),
				el('div.main-info__dates',
					el('p', 'Даты'),
					el('span', '')),
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

		this.findEmployerPopup = new FindEmployerPopupComponent()
		this.findEmployerPopup.el.style.display = "block"
		this.findEmployerPopup.parent = this
	}

	update(data){
		console.log(data)
	}


	onmount() {
		this.findEmployerInstance = initVacancyModalTooltip(this.chooseEmployer, this.findEmployerPopup.el, tippy)
	}

}