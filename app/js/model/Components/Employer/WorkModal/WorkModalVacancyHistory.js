import {
	el,
	setAttr,
	svg,
	list,
	place
} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import ShowMoreBtn from './ShowMoreBtn'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
import getWorkModalVacancyHistory from '../../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'


class WorkModalVacancyHistoryRow {
	constructor() {


		this.el = el('div.modal-row__contacts-history-row',
			el('div.modal-row__vacancies-history-labels',
				this.label = el('i.label',
					this.name = el('span', 'NO'),
					this.total_client = el('span', '293-17')
				),
				this.people = el('span.number-of-people.attention-number', 'M2')
			),
			el('div.modal-row__vacancies-history-date',
				this.date = el('time', '03.03.2019  -  03.09.2019')),
			el('div.modal-row__vacancies-history-terms',
				this.period = el('time', '6 мес')),
			el('div.modal-row__vacancies-history-type',
				this.labelType = el('i.label',
					this.labelTypeText = el('span', 'Рабочая')),
				this.production = el('p', 'Свиньи')
			)
		)

	}


	update(data) {
		// console.log(data)
		setAttr(this.name, {
			innerText: data.name + ' -'
		})

		setAttr(this.total_client, {
			innerText: data.total_client
		})

		setAttr(this.period, {
			innerText: data.period + ' мес'
		})

		setAttr(this.production, {
			innerText: data.type_production
		})

		setAttr(this.date, {
			innerText: data.start_work ?  data.start_work : '' + ' - ' + data.finish_work ? data.finish_work : ''
		})

		setAttr(this.people, {
			innerText: "М" + data.total_man + ' Ж' + data.total_woman,
			style: {
				color: data.archive === '0' ? '#FF9966' : '#99CCCC'
			}
		})

		setAttr(this.label, {
			style: {
				background: data.archive === '0' ? '#FF9966' : '#99CCCC'
			}
		})

		setAttr(this.labelType, {
			style: {
				background: data.type_vacancy == '1' ? '#E37373' : data.type_vacancy === '2' ? '#99CC33' : '#3399CC'
			}
		})

		setAttr(this.labelTypeText, {
			innerText: data.type_vacancy === '1' ? 'Сезонная' : data.type_vacancy === '2' ? 'Практика' : 'Рабочая',
		})
	}
}


export default class WorkModalVacancyHistory {
	constructor() {

		this.controls = el('div.modal-row__controls',
			el('p', 'История вакансий')
		)


		this.modalRowWrapper = el('div.modal-row__vacancies-history-wrapper.modal-row__wrapper')
		this.modalLayer = el('div.modal-row__layer.empty-layer',
			this.list = list(this.modalRowWrapper, WorkModalVacancyHistoryRow, 'id_vacancy')
		)


		this.el = el('div.vacancies-history__layer.modal-row__inner-layer',
			this.controls,
			this.modalLayer,
			this.showMore = place(ShowMoreBtn)
		)

		console.log(this.el)

		initOverlayScrollbars(this.modalLayer)

		this.pageShow = 2
		this.flagShow = false
	}

	update(data, index, items, context) {

		if (data.data.length) {
			setAttr(this.el, {
				style: {
					display: 'block'
				}
			})
		} else {
			setAttr(this.el, {
				style: {
					display: 'none'
				}
			})
		}

		let {
			loading,
			showing
		} = data
		if (showing) {
			this.pageShow++
		}

		if (loading) {
			this.pageShow = 2
		}

		this.list.update(data.data)


		//Пагинация
		if (data.data.length < data.total) {
			this.showMore.update(true, 'показать еще 5')

			if (!this.flagShow) {
				this.showMore.el.addEventListener('click', () => {
					getWorkModalVacancyHistory({
						id: this.data.data.id,
						showing: true,
						p: this.pageShow
					})
					// console.log(this.pageShow)
				})

				this.flagShow = true
			}

		} else {
			this.showMore.update(false)
			this.flagShow = false
		}

		//Вызов функций которые зависят от инстанса класса
		checkIfWrapperIsEmpty(this.modalRowWrapper)
		//

		this.data = data
		this.index = index
	}


}

Object.assign(WorkModalVacancyHistory.prototype, hiddenClassMixin)