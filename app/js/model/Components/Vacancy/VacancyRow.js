import {
	el,
	setAttr,
	place,
	list,
	MicroModal
} from '../../../../libs/libs'
import TableVacancyClient from './VacancyClients'
import showFullRow from '../../vacancy/showFullRow'
import getVacancyClients from '../../fetchingData/Vacancy/getVacancyClients'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'
import {
	addMouseUpTrigger,
	closeModal
} from '../../helper'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import storage from '../../Storage'


let flag = false

class Indicator {
	constructor() {
		this.el = el('span.row__indicator indicator.decline',
			this.span = el('span', '4'))
	}

	update(data) {
		setAttr(this.el, {
			classList: `row__indicator indicator ${data.number === 0 ? 'empty': data.class}`
		})

		setAttr(this.span, {
			innerText: data.number === 0 ? '' : data.number
		})
	}
}
export default class RowVacancy {
	constructor() {
		this.data = {}
		this.active = false
		this.productNamesArr = []
		// this.updated = false
		this.el = el("div.row.no-open",
			el('div.f-container',
				this.terms = el('div.row__terms.row__cell hot'),
				el('div.row__labels-2.row__cell',
					this.labelsLayer = el('div.row__labels-2-layer.no-open',
						el('i.label.attention__label.no-open',
							this.vacancyName = el('span.no-open'),
							this.vacancyNumbers = el('span.no-open')),
						this.numberPeople = el('span.number-of-people.attention-number.no-open'))),
				this.indicators = place(list('div.row__indicators.row__cell', Indicator)),
				this.archive = place(el('div.row__archive row__cell',
					this.archiveText = el('p'))),
				el('div.row__name-2.row__cell',
					el('p.row__fullname.no-open',
						this.employer = el('a.no-open', {
							href: '#'
						})),
					this.manager = place(el('i.tag.manager-tag'))),
				el('div.row__vacancies.row__cell',
					this.typeVacancy = el('i.label.green__label',
						this.typeVacancyName = el('span')),
					this.jobsText = el('p', 'Поля')),
				el('div.row__notes.row__cell',
					this.term = el('p')),
			),
			this.vacancyClientsTable = place(TableVacancyClient, 'vacancy-row')
		)

		this.el.addEventListener('click', (e) => {

			if (e.target.classList.contains('no-open')) {
				return
			}

			if (storage.isSet(this.data.id_vacancy)) {
				let data = storage.getState(this.data.id_vacancy)
				this.vacancyClientsTable.update(true, data)
				if (data.data.length !== 0) {
					this.active = true
				} else {
					this.active = false
				}
			}

			if (!storage.isSet(this.data.id_vacancy)) {
				getVacancyClients(this.data.id_vacancy)
					.then(res => {
						if (res) {
							// console.log(res)
							storage.setState(this.data.id_vacancy, {
								id: this.data.id_vacancy,
								data: res
							})
							this.vacancyClientsTable.update(true, {
								id: this.data.id_vacancy,
								data: res
							})
							showFullRow(this.el, e)
							this.active = true
						} else {
							storage.setState(this.data.id_vacancy, {
								id: this.data.id_vacancy,
								data: []
							})
							this.active = false
						}
					})
			}

			if (this.active) {
				showFullRow(this.el, e)
			}

		})

		this.labelsLayer.addEventListener('click', (e) => {
			getVacancyModalInfo(this.data.id_vacancy).then(res => {
				getWorkModalFeedback({
					id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
					loading: true,
					str: 'vacancies',
					other: 1
				})
				getWorkModalTasks({id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id})
			})

			MicroModal.show('modal-3', {
				onClose: modal => {
					getVacancyList()
				},
				onShow: (modal, node) => {


					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')

					if (!flag) {
						wrapper.addEventListener('mouseup', addMouseUpTrigger)
						wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
						modalClose.addEventListener('click', function () {
							MicroModal.close(modal.id)
						})
						flag = true
					}
				}
			})
		})

		document.addEventListener('storageupdate', (e) => {

			if (e.detail.id === this.data.id_vacancy) {
					let data = storage.getState(this.data.id_vacancy)
					data.data.forEach(el => {
						if(el.vacancy.id === e.detail.clientId) {
							let res = el.status_history.find(el => el.id_status === e.detail.statusId)
							if(res){
								res.date = new Date().toLocaleDateString()
							} else {
								el.status_history.push({id_status: e.detail.statusId, date: new Date().toLocaleDateString()})
							}
						}
					})
					this.vacancyClientsTable.update(true, data)
			}

		})


		document.addEventListener('storagedelete', (e) => {
			if (e.detail.id === this.data.id_vacancy) {
				let data = storage.getState(this.data.id_vacancy)
				this.vacancyClientsTable.update(true, data)
			}
		})


	}

	update(data, index, items, context) {


		this.indicatorsArr = data.status.map((el, i) => {
			return {
				number: el,
				class: context.classes[i]
			}
		})

		data.archive !== '0' ? (
			this.archive.update(true), 
			this.indicators.update(false),
			setAttr(this.archiveText, {
				innerText: 'Архив - ' + data.archive_date
			})
		) : 
		(
			this.indicators.update(true, this.indicatorsArr),
			this.archive.update(false)
		)

		// let custom = 'data-custom' + items[items.length - 1]['id_vacancy'] + '-open'


		// console.log(custom)

		setAttr(this.el, {
			"data-id_vacancy": data.id_vacancy,

		})

		setAttr(this.labelsLayer, {
			'data-custom-open': `modal-3`
		})

		setAttr(this.el, {
			classList: data.archive !== '0' ? 'row no-open archive-row' : 'row no-open'
		})

		setAttr(this.employer, {
			innerText: data.employer
		})
		data.manager ? (
			this.manager.update(true),
			setAttr(this.manager.el, {
				innerText: data.manager,
				style: {
					'background-color': `#${data.manager_color }`
				}
			})) : this.manager.update(false)

		setAttr(this.term, {
			innerText: data.start_work ? `${data.start_work} - ${data.finish_work} (${data.period} мес)` : ''
		})

		setAttr(this.numberPeople, {
			innerText: `${data.total_man !== "0" ? 'М'+data.total_man : ''} ${data.total_woman !== "0" ? 'Ж'+data.total_woman : ''}`
		})


		// `${data.total_man ? 'М'+data.total_man}` 

		setAttr(this.vacancyName, {
			innerText: data.name + ' - '
		})

		setAttr(this.vacancyNumbers, {
			innerText: data.total_client
		})

		setAttr(this.typeVacancy, {
			classList: data.type_vacancy === '1' ? 'label hot__label' : data.type_vacancy === '2' ? 'label green__label' : 'label blue__label'
		})

		setAttr(this.typeVacancyName, {
			innerText: data.type_vacancy === '1' ? 'Сезонная' : data.type_vacancy === '2' ? 'Практика' : 'Рабочая'
		})

		const prod = data.type_production.split(',')

		context.productsData.forEach(el => {
			prod.forEach((elem, ind) => {
				if(el.id === elem) {
					this.productNamesArr[ind] = el.name
				}
			})
		})

		setAttr(this.jobsText, {
			innerText: this.productNamesArr.join(', ')
		})

		// this.indicators.update(this.indicatorsArr)

		this.data = data
	}


}