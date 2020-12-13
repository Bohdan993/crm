import {el, setAttr, place, list} from '../../../../libs/libs'
import switchRowStatuses from '../../vacancy/switchRowStatuses'
import { initVacancyTooltip } from '../../initToottips'
import { save } from '../../helper'
import storage from '../../Storage'


const tooltipContentFunc = ({
	firstStatus = '',
	secondStatus = '',
	thirdStatus = '',
	fourthStatus = '',
	fifthStatus = '',
	sixthStatus = '',
	seventhStatus = '',
	eighthStatus = '',
	ninethStatus = ''
} = {}) => {
	return `<div class="row-popup" id="status-change-popup">
                    <form>
                        <div class="input-group">
                            <p class="status choosen"><span>Подготовка CV</span></p>
                            <time>${firstStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status choosen"><span>CV отправлено</span></p>
                            <time>${secondStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status ready"><span>Утвержден</span></p>
                            <time>${thirdStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status ready"><span>Контракт подписан</span></p>
                            <time>${fourthStatus}</time>
                        </div>
                        <div class="input-group">
                         <p class="status wait"><span>Подан в визовый центр</span></p>
                         <time>${fifthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department"><span>Получил разрешение</span></p>
                            <time>${sixthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department"><span>Забрал разрешение</span></p>
                            <time>${seventhStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status department"><span>Билеты куплены</span></p>
                            <time>${eighthStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="status busy"><span>Трудоустроен</span></p>
                            <time>${ninethStatus}</time>
                        </div>
                        <div class="input-group">
                            <p class="del-status status delete"><span>Исключить из вакансии</span></p>
                        </div>
                    </form>
                </div>`
} 


const dataArr = [
{
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
}]


class CellStatusSlider {
	constructor(){
		this.el = el('p.status.no-open')
	}

	update(data){
		setAttr(this.el, {
			classList: `status no-open ${data.class}`,
			innerText: data.text
		})
	}
}



class LanguageStars {
	constructor(){
		this.el = el('i.ico.s-star.no-open')
	}

	update(data){
	}
}


class Language {
	constructor(){
		this.el = el('i.label.blue__label.no-open', 
			this.languageName = el('span.language.no-open'),
			this.languageStars = list('span.language-stars.no-open', LanguageStars)
		)
	}


	update(data) {
			setAttr(this.languageName,{
				innerText: data.addr
			})
			this.languageStars.update(Array(data.level).fill(0))
	}
}

export default class RowVacancyClient {
	constructor(type){
		this.type = type
		this.timesArr = []
		this.save = save.bind(this)
		this.data = {}
		this.context = ''
		let $this = this
		this.el = el("div.table-full__row.f-container.no-open", {
			'data-count': '2'
		},
				el('div.table-full__cell.row__cell.cell-names.no-open', 
					this.name = el('a.no-open', {
						href: '#'
					}),
					this.group = place(el('span.row__indicator.indicator.department.no-open', 
						this.groupNum = el('span.no-open')))),
				el('div.table-full__cell.row__cell.cell-status.no-open', 
					this.statusLeft = el('div.cell-status__left.no-open', 
						this.statusSlider = list(`div.cell-status__slider.no-open.${this.type}`, CellStatusSlider),
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
						this.manager = place(el('div.tag.manager-tag.purple-tag.no-open')))),
				el('div.table-full__cell.row__cell.cell-exp.no-open', 
					this.labelCourse = place(el('i.label.no-open',
					this.labelCourseText = el('span.no-open'))),
					this.speciality = el('p.no-open'),
					this.language = list('div.language__wrapper.no-open', Language),
					
					),
				el('div.table-full__cell.row__cell.cell-notes.no-open', 
					this.notes = el('input.no-open', {
						type: 'text'
					}))
			)


		this.vacancyTooltipInstance = initVacancyTooltip(this.statusSlider.el)
		this.statusSlider.el.addEventListener('click', function (e) {3
			switchRowStatuses.call(this, $this.statusLeft, $this.data.vacancy.id, $this.context)
		}, {once: true})


		this.notes.addEventListener('change', e => {
			// console.log(storage)
			this.save({
				id: $this.data.vacancy.id, 
				value: this.notes.value.trim(), 
				field: 'note',
				target: 'client'
			})

			storage.updateStatePartialData({
				id: $this.context,
				key: 'data',
				field: 'vacancy',
				fieldKey: 'id',
				targetKey: 'note',
				prop: $this.data.vacancy.id,
				data: this.notes.value.trim()
			})

			
		})

		

	}

	update(data, index, items, context){
		// console.log(this.type)
		// console.log(data)
		this.timesArr = data.status_history

		this.vacancyTooltipInstance.setContent(tooltipContentFunc({
			firstStatus: this.timesArr.filter(el => el.id_status === '1')[0] ? this.timesArr.filter(el => el.id_status === '1')[0].date : '',
			secondStatus: this.timesArr.filter(el => el.id_status === '2')[0] ? this.timesArr.filter(el => el.id_status === '2')[0].date : '',
			thirdStatus: this.timesArr.filter(el => el.id_status === '3')[0] ? this.timesArr.filter(el => el.id_status === '3')[0].date : '',
			fourthStatus: this.timesArr.filter(el => el.id_status === '4')[0] ? this.timesArr.filter(el => el.id_status === '4')[0].date : '',
			fifthStatus: this.timesArr.filter(el => el.id_status === '5')[0] ? this.timesArr.filter(el => el.id_status === '5')[0].date : '',
			sixthStatus: this.timesArr.filter(el => el.id_status === '6')[0] ? this.timesArr.filter(el => el.id_status === '6')[0].date : '',
			seventhStatus: this.timesArr.filter(el => el.id_status === '7')[0] ? this.timesArr.filter(el => el.id_status === '7')[0].date : '',
			eighthStatus: this.timesArr.filter(el => el.id_status === '8')[0] ? this.timesArr.filter(el => el.id_status === '8')[0].date : '',
			ninethStatus: this.timesArr.filter(el => el.id_status === '9')[0] ? this.timesArr.filter(el => el.id_status === '9')[0].date : ''
		}))


		dataArr.forEach(el => {

			if(el.id === '1' || el.id === '2') {
				el.class = 'choosen'
			}
			else if(el.id === '3' || el.id === '4') {
				el.class = 'ready'
			}
			else if(el.id === '5') {
				el.class = 'wait'
			}
			else if(el.id === '6' || el.id === '7' || el.id === '8') {
				el.class = 'department'
			}
			else if(el.id === '9') {
				el.class = 'busy'
			}

			
			if(el.id === data.vacancy.id_status) {
				
				setAttr(this.statusArrows,{
					classList: `cell-status__controls no-open ${el.class}`
				})
				el.class += ' active'
			}
		})

		this.statusSlider.update(dataArr)


		setAttr(this.name, {
			innerText: data.main.snp
		})


		setAttr(this.el, {
			'data-count': '2'
		})

		data.main.task_document === '0' ? this.documents.update(false) : this.documents.update(true)
		data.main.task_phone === '0' ? this.phone.update(false) : this.phone.update(true)
		data.main.task_questionnaire === '0' ? this.anket.update(false) : this.anket.update(true)
		data.main._group !== '0' ? (
			this.group.update(true),
			setAttr(this.groupNum, {
				innerText: data.main._group
			})
			) : this.group.update(false)
		this.language.update(data.language)

	
		this.getItemsFromLocalStorage().managers.forEach(manager => {
			manager.id === data.main.id_manager ? 
			(this.manager.update(true),
				setAttr(this.manager.el, {
					innerText: manager.name.split(' ').map(el => el[0]).join('')
				}) 
				) : this.manager.update(false)
		})

		setAttr(this.notes, {
			value: data.vacancy.note
		})

		setAttr(this.speciality, {
			innerText: data.education ? data.education.prof_specialty ? data.education.prof_specialty : data.education.user_specialty : ''
		})


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

		// console.log(this.data)
	}


	onmount(){
		// switchRowStatuses(this.statusLeft, this.data.vacancy.id, this.context)
	}

	getItemsFromLocalStorage(){

		let managers = JSON.parse(localStorage.getItem('managersVacancy')) || []

		return {
			managers
		}
	}

}