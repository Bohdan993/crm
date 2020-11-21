


import {el, setAttr, place, list} from '../../../../libs/libs'
import TableVacancyClient from './VacancyClients'
import showFullRow from '../../vacancy/showFullRow'
import getVacancyClients from '../../fetchingData/Vacancy/getVacancyClients'
import { makeCaching } from '../../helper'
// import getWorkModalInfo from '../../fetchingData/getWorkModalInfo'

// import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
// import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
// import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
// import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
// import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'

class Indicator {
	constructor(){
		this.el = el('span.row__indicator indicator.decline', 
							this.span = el('span', '4'))
	}

	update(data){
		setAttr(this.el, {
			classList: `row__indicator indicator ${data.number === 0 ? 'empty': data.class}`
		})

		setAttr(this.span, {
			innerText: data.number === 0 ? '' : data.number
		})
	}
}
export default class RowVacancy {
	constructor(){
		this.data = {}
		this.showed = false
		this.active = false
		this.el = el("div.row.no-open",
				el('div.f-container', 
					el('div.row__terms.row__cell hot'), 
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
							this.employer = el('a.no-open',{
								href: '#'
							})),
						this.manager = el('i.tag.manager-tag')),
					el('div.row__vacancies row__cell',
						this.typeVacancy = el('i.label green__label',
							this.typeVacancyName = el('span')),
						el('p', 'Поля')),
					el('div.row__notes row__cell',
						this.term = el('p')),
					),
				this.vacancyClientsTable = place(TableVacancyClient)
			)

			this.el.addEventListener('click', (e) => {

				if(e.target.classList.contains('no-open')) {
					return
				}

				if(!this.showed) {
					getVacancyClients(this.data.id_vacancy)
					.then(res => {
						this.vacancyClientsTable.update(true, res)
						if(res) {
							showFullRow(this.el, e)
							this.active = true
						} else {
							this.active = false
						}
					})
					this.showed = true
				}

				if(this.active) {
					showFullRow(this.el, e)
				}
				// showFullRow(this.el, e)
			})
	}

	update(data, index, items, context){
		console.log(context)
		console.log(data)

		this.indicatorsArr = data.status.map((el, i) =>{
			return {
				number: el,
				class: context[i]
			}
		})

		data.archive !== '0' ? (this.archive.update(true), setAttr(this.archiveText, {innerText: data.arhive_date})) : this.indicators.update(true, this.indicatorsArr)

		let custom = 'data-custom' + items[items.length - 1]['id_vacancy'] + '-open'

		setAttr(this.el, {
			"data-id_vacancy": data.id_vacancy,
			
		})

		setAttr(this.labelsLayer, {
			[custom]: `modal-3`
		})


		setAttr(this.el, {
			classList: data.archive !== '0' ? 'row no-open archive-row' : 'row no-open'
		})

		setAttr(this.employer, {
			innerText: data.employer
		})

		setAttr(this.manager, {
			innerText: data.manager,
			style: {
				'background-color': `#${data.manager_color }`
			}
		})

		setAttr(this.term, {
			innerText: `${data.start_work} - ${data.finish_work} (${data.period} мес)`
		})

		setAttr(this.numberPeople, {
			innerText: `М${data.total_man} Ж${data.total_woman}`
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

		// this.indicators.update(this.indicatorsArr)

		this.data = data
	}

	

}