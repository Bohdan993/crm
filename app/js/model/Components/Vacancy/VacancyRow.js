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
import {
	addMouseUpTrigger,
	closeModal,
	getAllUrlParams,
	updateURL,
	close
} from '../../helper'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import storage from '../../Storage'
import vacancyStorage from '../../Storage/globalVacancies'
import vacancyModalCloseEvent from './../../CustomEvents/vacancyModalCloseEvent';


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
		this.el = el("div.row.no-open",
			el('div.f-container',
				this.terms = el('div.row__terms.row__cell hot'),
				el('div.row__labels-2.row__cell',
					this.labelsLayer = el('div.row__labels-2-layer.no-open',
						this.label = el('i.label.no-open',
							this.vacancyName = el('span.no-open'),
							this.vacancyNumbers = el('span.no-open')),
						this.numberPeople = el('span.number-of-people.no-open'))),
				this.indicators = place(list('div.row__indicators.row__cell', Indicator)),
				this.archive = place(el('div.row__archive row__cell',
					this.archiveText = el('p'))),
				el('div.row__name-2.row__cell',
					el('p.row__fullname.no-open',
						this.employer = el('a.no-open', {
							href: '#',
							target: "_blank"
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


		this.elClickHandler = (e) => {

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

		}

		this.labelsLayerClickHandler = (e) => {

			let id_vacancy = getAllUrlParams().id
			let url = `#id=${this.data.id_vacancy}`


			updateURL(url)

			getVacancyModalInfo(this.data.id_vacancy).then(res => {

				getWorkModalFeedback({
					id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
					loading: true,
					str: 'vacancies',
					other: 1
				})

				getWorkModalTasks({
					id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id
				})
			})

			MicroModal.show('modal-3', {
				onClose: modal => {
					document.dispatchEvent(vacancyModalCloseEvent)
					updateURL(window.location.pathname)

					const wrapper = modal.querySelector('.my-modal-wrapper')
					const modalClose = modal.querySelector('.modal__close')

					wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
					wrapper.removeEventListener('mousedown', this.closeModal)
					modalClose.removeEventListener('click', this.close)
				},
				onShow: (modal, node) => {
					if (!id_vacancy) {
						const wrapper = modal.querySelector('.my-modal-wrapper')
						const modalClose = modal.querySelector('.modal__close')


						this.addMouseUpTrigger = addMouseUpTrigger
						this.closeModal = closeModal.bind(null, modal.id)
						this.close = close.bind(null, modal.id)

						wrapper.addEventListener('mouseup', this.addMouseUpTrigger)
						wrapper.addEventListener('mousedown', this.closeModal)
						modalClose.addEventListener('click', this.close)


					}
				}
			})


		}

		this.storagedeupdateHandler = (e) => {

			if (e.detail.id === this.data.id_vacancy) {
				let data = storage.getState(this.data.id_vacancy)
				data.data.forEach(el => {
					if (el.vacancy.id === e.detail.clientId) {
						let res = el.status_history.find(el => el.id_status === e.detail.statusId)
						if (res) {
							res.date = new Date().toLocaleDateString()
						} else {
							el.status_history.push({
								id_status: e.detail.statusId,
								date: new Date().toLocaleDateString()
							})
						}
					}
				})


				

				const countObj = {
					decline: this.declineCount,
					choose: 0,
					ready: 0,
					wait: 0,
					department: 0,
					busy: 0
				}

				const statusesArr = data.data.map(el => {
					return el.vacancy.id_status
				})

				statusesArr.forEach(el => {
					if (el === '1' || el === '2') {
						countObj.choose++
					} else if (el === '3' || el === '4') {
						countObj.ready++
					} else if (el === '5') {
						countObj.wait++
					} else if (el === '6' || el === '7' || el === '8') {
						countObj.department++
					} else if (el === '9') {
						countObj.busy++
					}
				})

				const indicatorsArr = Object.values(countObj).map((el, i) => {
					return {
						number: el,
						class: this.context.classes[i]
					}
				})


				

				this.vacancyClientsTable.update(true, data)
				this.indicators.update(true, indicatorsArr)

				
				vacancyStorage.setPartialState(this.data.id_vacancy, 'id_vacancy', 'status', Object.values(countObj))
				// console.log(vacancyStorage.getPartialState(this.data.id_vacancy, 'id_vacancy', 'status'))
			}

		}

		this.storagedeleteHandler = (e) => {

			if (e.detail.id === this.data.id_vacancy) {
				let data = storage.getState(this.data.id_vacancy)
				this.declineCount++

				const countObj = {
					decline: this.declineCount,
					choose: 0,
					ready: 0,
					wait: 0,
					department: 0,
					busy: 0
				}

				const statusesArr = data.data.map(el => {
					return el.vacancy.id_status
				})

				statusesArr.forEach(el => {
					if (el === '1' || el === '2') {
						countObj.choose++
					} else if (el === '3' || el === '4') {
						countObj.ready++
					} else if (el === '5') {
						countObj.wait++
					} else if (el === '6' || el === '7' || el === '8') {
						countObj.department++
					} else if (el === '9') {
						countObj.busy++
					}
				})

				const indicatorsArr = Object.values(countObj).map((el, i) => {
					return {
						number: el,
						class: this.context.classes[i]
					}
				})
				this.vacancyClientsTable.update(true, data)
				this.indicators.update(true, indicatorsArr)
				vacancyStorage.setPartialState(this.data.id_vacancy, 'id_vacancy', 'status', Object.values(countObj))


				console.log('DELETE HANDLER', vacancyStorage.getPartialState(this.data.id_vacancy, 'id_vacancy', 'status'))
			}
		}


		this.vacancylistupdateeventHandler = vacancylistupdateeventHandler.bind(this)

		this.el.addEventListener('click', this.elClickHandler)
		this.labelsLayer.addEventListener('click', this.labelsLayerClickHandler)

	}

	update(data, index, items, context) {
		this.indicatorsArr = data.status.map((el, i) => ({
			number: el,
			class: context.classes[i]
		}))


		this.declineCount = data.status[0]
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

		setAttr(this.el, {
			"data-id_vacancy": data.id_vacancy,

		})

		setAttr(this.terms, {
			style: {
				background: data.color_attention || '#e37373'
			}
		})

		setAttr(this.labelsLayer, {
			'data-custom-open': `modal-3`
		})

		setAttr(this.label, {
			style: {
				'background-color': data.archive !== '0' ? '#99CCCC' : '#FF9966'
			}

		})

		setAttr(this.el, {
			classList: data.archive !== '0' ? 'row no-open archive-row' : 'row no-open'
		})

		setAttr(this.employer, {
			innerText: data.employer,
			href: `index.html#id=${data.id_employer}`
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
			innerText: `${data.total_man !== "0" ? 'М'+data.total_man : ''} ${data.total_woman !== "0" ? 'Ж'+data.total_woman : ''}`,
			style: {
				'color': data.archive !== '0' ? '#99CCCC' : '#FF9966'
			}
		})


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
				if (el.id === elem) {
					this.productNamesArr[ind] = el.name
				}
			})
		})

		setAttr(this.jobsText, {
			innerText: this.productNamesArr.join(', ')
		})


		this.data = data
		this.data.index = index
		this.context = context
	}


	onmount() {
		document.addEventListener('vacancylistupdateevent', this.vacancylistupdateeventHandler)
		document.addEventListener('storagedelete', this.storagedeleteHandler)
		document.addEventListener('storageupdate', this.storagedeupdateHandler)
		document.addEventListener('clientaddtovacancyevent', this.vacancylistupdateeventHandler)
	}


	onunmount() {
		document.removeEventListener('vacancylistupdateevent', this.vacancylistupdateeventHandler)
		document.removeEventListener('storagedelete', this.storagedeleteHandler)
		document.removeEventListener('storageupdate', this.storagedeupdateHandler)
		document.removeEventListener('clientaddtovacancyevent', this.vacancylistupdateeventHandler)
	}


}


function vacancylistupdateeventHandler(e) {
	if (this.data.id_vacancy === e.detail.id) {
		this.update(...vacancyStorage.getState().filter(x => x.id_vacancy === e.detail.id), this.data.index, '_', this.context)
	}
}