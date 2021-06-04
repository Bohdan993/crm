import {
	el,
	setAttr,
	list
} from '../../../../libs/libs'
import RowVacancyClient from './VacancyClientsRow'


function firstRow(title) {
	return el('div.table-full__row.no-open',
		el('p.table-full__title.no-open', title),
		el('div.table-full__placeholder.first.no-open'),
		el('div.table-full__placeholder.second.no-open'),
		el('div.table-full__placeholder.third.no-open'))
}


function isObjEmpty(obj) {
	return Object.keys(obj).length == 0
}


export default class TableVacancyClient {
	constructor(type) {
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
				this.choosenList = list('div.table-full__layer.no-open', RowVacancyClient, 'id_trainees', this.type)),

			this.readyRow = el('div.table-full__ready.ready.no-open',
				firstRow('Готовятся к подаче'),
				this.readyList = list('div.table-full__layer.no-open', RowVacancyClient, 'id_trainees', this.type)),

			this.waitRow = el('div.table-full__wait.wait.no-open',
				firstRow('Ждут разрешения'),
				this.waitList = list('div.table-full__layer.no-open', RowVacancyClient, 'id_trainees', this.type)),

			this.departmentRow = el('div.table-full__department.department.no-open',
				firstRow('Готовятся к отъезду'),
				this.departmentList = list('div.table-full__layer.no-open', RowVacancyClient, 'id_trainees', this.type)),

			this.busyRow = el('div.table-full__busy.busy.no-open',
				firstRow('Трудоустроены'),
				this.busyList = list('div.table-full__layer.no-open', RowVacancyClient, 'id_trainees', this.type)),
		)
	}

	update(data, context) {

		data.data && data.data.forEach(el => {
			if (el.vacancy.id_status === '1' || el.vacancy.id_status === '2') {
				this.choosenObj[el.id_trainees] = el
			} else if (el.vacancy.id_status === '3' || el.vacancy.id_status === '4') {
				this.readyObj[el.id_trainees] = el
			} else if (el.vacancy.id_status === '5') {
				this.waitObj[el.id_trainees] = el
			} else if (el.vacancy.id_status === '6' || el.vacancy.id_status === '7' || el.vacancy.id_status === '8') {
				this.departmentObj[el.id_trainees] = el
			} else if (el.vacancy.id_status === '9') {
				this.busyObj[el.id_trainees] = el
			}
		})

		const choosenValues = Object.values(this.choosenObj)
		const readyValues = Object.values(this.readyObj)
		const waitValues = Object.values(this.waitObj)
		const departmentValues = Object.values(this.departmentObj)
		const busyValues = Object.values(this.busyObj)


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


		this.choosenList.update(choosenValues, {
			id: data.id,
			parent: this.choosenRow
		})
		this.readyList.update(readyValues, {
			id: data.id,
			parent: this.readyRow
		})
		this.waitList.update(waitValues, {
			id: data.id,
			parent: this.waitRow
		})
		this.departmentList.update(departmentValues, {
			id: data.id,
			parent: this.departmentRow
		})
		this.busyList.update(busyValues, {
			id: data.id,
			parent: this.busyRow
		})


		// console.log(context)

		console.log(context)

		if (this.type === 'vacancy-modal') {
			context && setAttr( context.choosenClientsCount, {
				innerText: choosenValues.length
			})
			context && setAttr(context.readyClientsCount, {
				innerText: readyValues.length
			})
			context && setAttr(context.waitClientsCount, {
				innerText: waitValues.length
			})
			context && setAttr(context.departmentClientsCount, {
				innerText: departmentValues.length
			})
			context && setAttr(context.busyClientsCount, {
				innerText: busyValues.length
			})
		}


		this.choosenObj = {}
		this.readyObj = {}
		this.waitObj = {}
		this.departmentObj = {}
		this.busyObj = {}

		this.data = data
	}

}