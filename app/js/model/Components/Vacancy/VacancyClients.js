import {el, setAttr, place, list} from '../../../../libs/libs'
import RowVacancyClient from './VacancyClientsRow'


function firstRow(title){
	return el('div.table-full__row.no-open',
					el('p.table-full__title.no-open', title),
					el('div.table-full__placeholder.first.no-open'),
					el('div.table-full__placeholder.second.no-open'),
					el('div.table-full__placeholder.third.no-open'))
}


function isObjEmpty(obj){
	return Object.keys(obj).length == 0
}


export default class TableVacancyClient {
	constructor(type){
		this.type = type
		this.data = {}
		this.choosenObj = {}
		this.readyObj = {}
		this.waitObj = {}
		this.departmentObj = {}
		this.busyObj = {}

		this.el = el("div.row__full-info.table-full.no-open",
			this.choosenRow = el('div.table-full__choosen.choosen.no-open',
				firstRow('Отобраны'),
				this.choosenList = list('div.table-full__layer.no-open', RowVacancyClient, undefined, this.type)),
				
			this.readyRow = el('div.table-full__ready.ready.no-open',
				firstRow('Готовятся к подаче'),
				this.readyList = list('div.table-full__layer.no-open', RowVacancyClient, undefined, this.type)),
				
			this.waitRow = el('div.table-full__wait.wait.no-open',
				firstRow('Ждут разрешения'),
				this.waitList = list('div.table-full__layer.no-open', RowVacancyClient, undefined, this.type)),

			this.departmentRow = el('div.table-full__department.department.no-open',
				firstRow('Готовятся к отъезду'),
				this.departmentList = list('div.table-full__layer.no-open', RowVacancyClient, undefined, this.type)),
	
			this.busyRow = el('div.table-full__busy.busy.no-open',
				firstRow('Трудоустроены'),
				this.busyList = list('div.table-full__layer.no-open', RowVacancyClient, undefined, this.type)),

			)



	}

	update(data, r, t, y){
		// console.log(data)
		data.data && data.data.forEach(el => {
			if(el.vacancy.id_status === '1' || el.vacancy.id_status === '2') {
				this.choosenObj[el.main.id_trainees] = el
			} else if (el.vacancy.id_status === '3' || el.vacancy.id_status === '4') {
				this.readyObj[el.main.id_trainees] = el
			} else if (el.vacancy.id_status === '5')  {
				this.waitObj[el.main.id_trainees] = el
			} else if (el.vacancy.id_status === '6' || el.vacancy.id_status === '7' || el.vacancy.id_status === '8') {
				this.departmentObj[el.main.id_trainees] = el
			} else if(el.vacancy.id_status === '9') {
				this.busyObj[el.main.id_trainees] = el
			}
		})


		console.log(isObjEmpty(this.choosenObj))
		console.log(isObjEmpty(this.readyObj))
		console.log(isObjEmpty(this.waitObj))
		console.log(isObjEmpty(this.departmentObj))
		console.log(isObjEmpty(this.busyObj))

		// console.log(this.choosenList)

		setAttr(this.choosenRow, {
			classList: isObjEmpty(this.choosenObj) ? 'table-full__choosen choosen no-open hidden' : 'table-full__choosen choosen no-open'
		})

		setAttr(this.readyRow, {
			classList: isObjEmpty(this.readyObj) ? 'table-full__ready ready no-open hidden' : 'table-full__ready ready no-open'
		})

		setAttr(this.waitRow, {
			classList: isObjEmpty(this.waitObj) ? 'table-full__wait wait no-open hidden' : 'table-full__wait wait no-open'
		})

		setAttr(this.departmentRow, {
			classList: isObjEmpty(this.departmentObj) ? 'table-full__department department no-open hidden' : 'table-full__department department no-open'
		})

		setAttr(this.busyRow, {
			classList: isObjEmpty(this.busyObj) ? 'table-full__busy busy no-open hidden' : 'table-full__busy busy no-open'
		})

		console.log('i am here')

		this.choosenList.update(Object.values(this.choosenObj), data.id)
		this.readyList.update(Object.values(this.readyObj), data.id)
		this.waitList.update(Object.values(this.waitObj), data.id)
		this.departmentList.update(Object.values(this.departmentObj), data.id)
		this.busyList.update(Object.values(this.busyObj), data.id)

		this.choosenObj = {}
		this.readyObj = {}
		this.waitObj = {}
		this.departmentObj = {}
		this.busyObj = {}

		this.data = data
	}

}