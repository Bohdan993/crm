import {
	el,
	setAttr,
	place,
	list
} from '../../../../libs/libs'
import switchRowStatuses, {
	switchRowStatusesTip
} from '../../vacancy/switchRowStatuses'
import {
	initVacancyTooltip
} from '../../initToottips'
import {
	save,
	uniq
} from '../../helper'
import storage from '../../Storage'


const tooltipContentFunc = ({
	firstStatus = '',
	firstClass = '',
	secondStatus = '',
	secondClass = '',
	thirdStatus = '',
	thirdClass = '',
	fourthStatus = '',
	fourthClass = '',
	fifthStatus = '',
	fifthClass = '',
	sixthStatus = '',
	sixthClass = '',
	seventhStatus = '',
	seventhClass = '',
	eighthStatus = '',
	eighthClass = '',
	ninethStatus = '',
	ninethClass = '',
} = {}) => {
	return `<div class="row-popup" id="status-change-popup">
                    <form>
                        <div class="input-group">
                            <p class="status choosen ${firstClass}"><span>Подготовка CV</span></p>
                            <time class="cv-preparation">${firstStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status choosen ${secondClass}"><span>CV отправлено</span></p>
                            <time class="cv-sent">${secondStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status ready ${thirdClass}"><span>Утвержден</span></p>
                            <time class="approved">${thirdStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status ready ${fourthClass}"><span>Контракт подписан</span></p>
                            <time class="contract-signed">${fourthStatus}</time>
                        </div>
                        <div class="input-group">
                         <p class="status wait ${fifthClass}"><span>Подан в визовый центр</span></p>
                         <time class="submitted-visa-application-center">${fifthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department ${sixthClass}"><span>Получил разрешение</span></p>
                            <time class="got-permission">${sixthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department ${seventhClass}"><span>Забрал разрешение</span></p>
                            <time class="took-away-permission">${seventhStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department ${eighthClass}"><span>Билеты куплены</span></p>
                            <time class="tickets-bought">${eighthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status busy ${ninethClass}"><span>Трудоустроен</span></p>
                            <time class="employed">${ninethStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="del-status status delete"><span>Исключить из вакансии</span></p>
                        </div>
                    </form>
                </div>`
}


const dataArr = [{
		id: '1',
		class: 'choosen',
		text: 'Подготовка CV'
	},
	{
		id: '2',
		class: 'choosen',
		text: 'CV отправлено'
	},
	{
		id: '3',
		class: 'ready',
		text: 'Утвержден'
	},
	{
		id: '4',
		class: 'ready',
		text: 'Контракт подписан'
	},
	{
		id: '5',
		class: 'wait',
		text: 'Подан в визовый центр'
	},
	{
		id: '6',
		class: 'department',
		text: 'Получил разрешение'
	},
	{
		id: '7',
		class: 'department',
		text: 'Забрал разрешение'
	},
	{
		id: '8',
		class: 'department',
		text: 'Билеты куплены'
	},
	{
		id: '9',
		class: 'busy',
		text: 'Трудоустроен'
	}
]


class CellStatusSlider {
	constructor() {
		this.el = el('p.status.no-open')
	}

	update(data) {
		setAttr(this.el, {
			classList: `status no-open ${data.class}`,
			innerText: data.text
		})
	}
}



class LanguageStars {
	constructor() {
		this.el = el('i.ico.s-star.no-open')
	}

}


class Language {
	constructor() {
		this.el = el('i.label.blue__label.no-open',
			this.languageName = el('span.language.no-open'),
			this.languageStars = list('span.language-stars.no-open', LanguageStars)
		)
	}


	update(data) {
		setAttr(this.languageName, {
			innerText: data.addr
		})
		this.languageStars.update(Array(data.level).fill(0))
	}
}

export default class RowVacancyClient {
	constructor(type) {
		this.type = type
		this.timesArr = []
		this.save = save.bind(this)
		this.data = {}
		this.context = ''
		this.el = el("div.table-full__row.f-container.no-open",
			el('div.table-full__cell.row__cell.cell-names.no-open',
				this.name = el('a.no-open', {
					href: '#',
					target: "_blank"
				}),
				this.group = place(el('span.row__indicator.indicator.department.no-open',
					this.groupNum = el('span.no-open')))),
			el('div.table-full__cell.row__cell.cell-status.no-open',
				this.statusLeft = el('div.cell-status__left.no-open',
					this.statusSlider = list(`div.cell-status__slider.no-open.${this.type}`, CellStatusSlider, 'id'),
					this.statusArrows = el('div.cell-status__controls.choosen.no-open',
						el('div.cell-status__control-left.no-open',
							el('i.ico.s-arr-left.no-open')),
						el('div.cell-status__control-right.no-open',
							el('i.ico.s-arr-right.no-open'))
					)),
				el('div.cell-status__right.no-open',
					this.phone = place(el('i.ico.s-phone-red.no-open')),
					this.documents = place(el('i.ico.s-documents.no-open')),
					this.anket = place(el('i.ico.s-anket.no-open')),
					this.manager = place(el('div.tag.manager-tag.no-open')))),
			el('div.table-full__cell.row__cell.cell-exp.no-open',

				el('div.table-full__cell-wrapper.row__cell-wrapper.cell-exp-wrapper.no-open',
					this.educationBlock = place(el('div.no-open.prof-education',
						this.labelCourse = place(el('i.label.no-open',
							this.labelCourseText = el('span.no-open'))),
						this.speciality = place(el('p.no-open'))
					)),
					this.language = place(list('div.language__wrapper.no-open', Language, 'name')),
					this.driver = place(el('div.tag.driver-tag.dirty-green-tag.no-open'))
					),
					
			),
			el('div.table-full__cell.row__cell.cell-notes.no-open',
				this.notes = el('input.no-open', {
					type: 'text'
				}))
		)


		this.notes.addEventListener('change', e => {

			this.save({
				id: this.data.vacancy.id,
				value: this.notes.value.trim(),
				field: 'note',
				target: 'client'
			})

			storage.updateStatePartialData({
				id: this.context.id,
				key: 'data',
				field: 'vacancy',
				fieldKey: 'id',
				targetKey: 'note',
				prop: this.data.vacancy.id,
				data: this.notes.value.trim()
			})

		})



	}

	update(data, index, items, context) {
		let resArr = []
		const statusHistory = data.status_history.sort((a, b) => +a.id_status - +b.id_status)
		

		if(((+statusHistory[statusHistory.length - 1].id_status) - (+statusHistory[0].id_status)) > 1) {
			for(let i = +statusHistory[0].id_status + 1; i < +statusHistory[statusHistory.length - 1].id_status; i++) {
				resArr.push({id_status: `${i}`, date: statusHistory[statusHistory.length - 1].date})
			}

			statusHistory.splice(1,0, ...resArr)
		}

	
		this.timesArr = uniq(statusHistory, 'id_status')
		this.vacancyTooltipInstance = initVacancyTooltip(this.statusSlider.el)

		this.vacancyTooltipInstance.setContent(tooltipContentFunc({
			firstStatus: this.timesArr.filter(el => el.id_status === '1')[0] ? this.timesArr.filter(el => el.id_status === '1')[0].date : '',
			firstClass: this.timesArr.filter(el => el.id_status === '1')[0] ? 'taken' : '',
			secondStatus: this.timesArr.filter(el => el.id_status === '2')[0] ? this.timesArr.filter(el => el.id_status === '2')[0].date : '',
			secondClass: this.timesArr.filter(el => el.id_status === '2')[0] ? 'taken' : '',
			thirdStatus: this.timesArr.filter(el => el.id_status === '3')[0] ? this.timesArr.filter(el => el.id_status === '3')[0].date : '',
			thirdClass: this.timesArr.filter(el => el.id_status === '3')[0] ? 'taken' : '',
			fourthStatus: this.timesArr.filter(el => el.id_status === '4')[0] ? this.timesArr.filter(el => el.id_status === '4')[0].date : '',
			fourthClass: this.timesArr.filter(el => el.id_status === '4')[0] ? 'taken' : '',
			fifthStatus: this.timesArr.filter(el => el.id_status === '5')[0] ? this.timesArr.filter(el => el.id_status === '5')[0].date : '',
			fifthClass: this.timesArr.filter(el => el.id_status === '5')[0] ? 'taken' : '',
			sixthStatus: this.timesArr.filter(el => el.id_status === '6')[0] ? this.timesArr.filter(el => el.id_status === '6')[0].date : '',
			sixthClass: this.timesArr.filter(el => el.id_status === '6')[0] ? 'taken' : '',
			seventhStatus: this.timesArr.filter(el => el.id_status === '7')[0] ? this.timesArr.filter(el => el.id_status === '7')[0].date : '',
			seventhClass: this.timesArr.filter(el => el.id_status === '7')[0] ? 'taken' : '',
			eighthStatus: this.timesArr.filter(el => el.id_status === '8')[0] ? this.timesArr.filter(el => el.id_status === '8')[0].date : '',
			eighthClass: this.timesArr.filter(el => el.id_status === '8')[0] ? 'taken' : '',
			ninethStatus: this.timesArr.filter(el => el.id_status === '9')[0] ? this.timesArr.filter(el => el.id_status === '9')[0].date : '',
			ninethClass: this.timesArr.filter(el => el.id_status === '9')[0] ? 'taken' : '',
		}))


		switchRowStatusesTip.call(this.statusSlider.el, data.vacancy.id, context.id)

		if (this.context.parent !== context.parent) {
			switchRowStatuses.call(this.statusSlider.el, this.statusLeft, data.vacancy.id, context.id)
		}


		dataArr.forEach(el => {

			if (el.id === '1' || el.id === '2') {
				el.class = 'choosen'
			} else if (el.id === '3' || el.id === '4') {
				el.class = 'ready'
			} else if (el.id === '5') {
				el.class = 'wait'
			} else if (el.id === '6' || el.id === '7' || el.id === '8') {
				el.class = 'department'
			} else if (el.id === '9') {
				el.class = 'busy'
			}


			if (el.id === data.vacancy.id_status) {

				setAttr(this.statusArrows, {
					classList: `cell-status__controls no-open ${el.class}`
				})
				el.class += ' active'
			}
		})

		this.statusSlider.update(dataArr)


		setAttr(this.name, {
			innerText: data.main.snp,
			href: `clients#t=${data.id_trainees}`
		})


		data.main.task_document === '0' ? this.documents.update(false) : this.documents.update(true)
		data.main.task_phone === '0' ? this.phone.update(false) : this.phone.update(true)
		data.main.task_questionnaire === '0' ? this.anket.update(false) : this.anket.update(true)
		data.main.manager_abbr ? (
			this.manager.update(true),
			setAttr(this.manager.el, {
				innerText: data.main.manager_abbr,
				title: data.main.manager_name,
				style: {
					'background-color': `#${data.main.manager_color}`
				}
			})
		) : (
			this.manager.update(false)
		)

		data.main.driver ? (
			this.driver.update(true),
			setAttr(this.driver.el, {
				innerText: data.main.driver,
			})

		) : (
			this.driver.update(false)
		)
		data.main._group !== '0' ? (
			this.group.update(true),
			setAttr(this.groupNum, {
				innerText: data.main._group
			})
		) : this.group.update(false)

		data.language = data.language.filter(x => x.addr.toUpperCase() === 'EN')

		data.language.length ? this.language.update(true, data.language) : this.language.update(false)


		setAttr(this.notes, {
			value: data.vacancy.note
		})

		data.education && data.education.form && (
			this.educationBlock.update(true),
			setAttr(this.educationBlock.el, {
				title: `${data.education.name} - ${data.education.user_specialty} ${data.education.prof_specialty ? '(' + data.education.prof_specialty + ')' : ''}`
			})
			)

		data.education && data.education.prof_specialty ? (
			this.speciality.update(true),
			setAttr(this.speciality.el, {
				innerText: data.education.prof_specialty
			})
		) : (
			this.speciality.update(false)
			)

		data.education ? data.education.form || data.education.course ? (
			this.labelCourse.update(true),
			setAttr(this.labelCourse.el, {
				style: {
					'background-color': data.education ? data.education.form === '1' ? '#99cc33' : '#99cccc' : ''
				}
			}),
			setAttr(this.labelCourseText, {
				innerText: `${data.education ? data.education.form === '1' ? 'Д' : 'З' : ''} ${data.education && data.education.course ? data.education.course : ""}`
			})
		) : this.labelCourse.update(false) : null

		this.data = data
		this.context = context
	}


	getItemsFromLocalStorage() {

		let managers = JSON.parse(localStorage.getItem('managersVacancy')) || []

		return {
			managers
		}
	}

}