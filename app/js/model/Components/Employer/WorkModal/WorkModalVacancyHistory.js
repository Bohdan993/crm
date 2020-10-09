import {el, setAttr, svg, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import ShowMoreBtn from './ShowMoreBtn'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'



class WorkModalVacancyHistoryRow {
	constructor(){


		this.el = el('div.modal-row__contacts-history-row',
			el('div.modal-row__vacancies-history-labels', 
				el('i.label.attention__label', 
					el('span', 'NO'),
					el('span', '293-17')
					),
				el('span.number-of-people.attention-number', 'M2')
				),
			el('div.modal-row__vacancies-history-date', 
				el('time', '03.03.2019  -  03.09.2019')),
			el('div.modal-row__vacancies-history-terms',
				el('time', '6 мес')),
			el('div.modal-row__vacancies-history-type',
				el('i.label.success-2__label', 
					el('span', 'Рабочая')),
				el('p', 'Свиньи')
				)
			)

	}


	update(data){
		// console.log(data)
	}
}


export default class WorkModalVacancyHistory {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'История вакансий')
			)


		this.modalRowWrapper = el('div.modal-row__vacancies-history-wrapper.empty-layer')
		this.modalLayer = el('div.modal-row__layer', 
			this.list = list(this.modalRowWrapper, WorkModalVacancyHistoryRow, 'id')
		)


		this.el = el('div.vacancies-history__layer',
				this.controls,
				this.modalLayer,
				// this.showMore = place(ShowMoreBtn)
		)

		initOverlayScrollbars(this.modalLayer)
	}

	 update(data, index, items, context) {


			this.list.update(data.data)


			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalRowWrapper)
	
			//

			this.data = data
			this.data.index = index
	}


}

Object.assign(WorkModalVacancyHistory.prototype , hiddenClassMixin)