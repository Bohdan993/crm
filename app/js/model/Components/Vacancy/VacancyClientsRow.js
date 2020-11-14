


import {el, setAttr, place, list} from '../../../../libs/libs'



const dataArr = [
{
	class: 'choosen',
	text: 'Подготовка CV'
},
{
	class: 'choosen',
	text: 'CV отправлено'
},
{
	class: 'ready',
	text: 'Утвержден'
},
{
	class: 'ready',
	text: 'Контракт подписан'
},
{
	class: 'wait',
	text: 'Подан в визовый центр'
},
{
	class: 'department',
	text: 'Получил разрешение'
},
{
	class: 'department',
	text: 'Забрал разрешение'
},
{
	class: 'department',
	text: 'Билеты куплены'
},
{
	class: 'busy',
	text: 'Трудоустроен'
}]


class CellStatusSlider {
	constructor(){
		this.el = el('p.status')
	}

	update(data){
		setAttr(this.el, {
			classList: `status ${data.class}`,
			innerText: data.text
		})
	}
}



class LanguageStars {
	constructor(){
		this.el = el('i.ico.s-star')
	}

	update(data){
	}
}


class Language {
	constructor(){
		this.el = el('i.label.blue__label', 
			this.languageName = el('span.language'),
			this.languageStars = list('span.language-stars', LanguageStars)
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
	constructor(){
		this.data = {}
		this.el = el("div.table-full__row.f-container",
				el('div.table-full__cell.row__cell.cell-names', 
					this.name = el('a', {
						href: '#'
					}),
					this.group = place(el('span.row__indicator.indicator.department', 
						this.groupNum = el('span')))),
				el('div.table-full__cell.row__cell.cell-status', 
					el('div.cell-status__left', 
						this.statusSlider = list('div.cell-status__slider', CellStatusSlider)),
						el('div.cell-status__controls.choosen',
							el('div.cell-status__control-left', 
								el('i.ico.rotate-left')),
							el('div.cell-status__control-right',
								el('i.ico'))
							),
					el('div.cell-status__right',
						this.phone = place(el('i.ico.s-phone-red')),
						this.documents = place(el('i.ico.s-documents')),
						this.anket = place(el('i.ico.s-anket')),
						el('div.tag.manager-tag.purple-tag'))),
				el('div.table-full__cell.row__cell.cell-exp', 
					this.labelCourse = place(el('i.label',
						this.labelCourseText = el('span'))),
					this.speciality = el('p'),
					this.language = list('div.language__wrapper', Language),
					
					),
				el('div.table-full__cell.row__cell.cell-notes', 
					this.notes = el('input', {
						type: 'text'
					}))
			)

	}

	update(data, index, items, context){
		console.log(data)
		this.statusSlider.update(dataArr)

		setAttr(this.name, {
			innerText: data.main.snp
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
				innerText: `${data.education ? data.education.form === '1' ? 'Д' : 'З' : ''} ${data.education ? data.education.course : ""}`
			})
			) : this.labelCourse.update(false) : null

		this.data = data
	}

}