import {el, setAttr, place, list} from '../../../../libs/libs'
import RowVacancyClient from './VacancyClientsRow'


function firstRow(title){
	return el('div.table-full__row',
					el('p.table-full__title', title),
					el('div.table-full__placeholder.first'),
					el('div.table-full__placeholder.second'),
					el('div.table-full__placeholder.third'))
}


export default class TableVacancyClient {
	constructor(){
		this.data = {}
		this.choosenArr = []
		this.readyArr = []
		this.waitArr = []
		this.departmentArr = []
		this.busyArr = []
		this.el = el("div.row__full-info.table-full",
			el('div.table-full__choosen.choosen',
				firstRow('Отобраны'),
				this.choosenList = list('div.table-full__layer', RowVacancyClient)),
				
			el('div.table-full__ready.ready',
				firstRow('Готовятся к подаче'),
				this.readyList = list('div.table-full__layer', RowVacancyClient)),
				
			el('div.table-full__wait.wait',
				firstRow('Ждут разрешения'),
				this.waitList = list('div.table-full__layer', RowVacancyClient)),

			el('div.table-full__department.department',
				firstRow('Готовятся к отъезду'),
				this.departmentList = list('div.table-full__layer', RowVacancyClient)),
	
			el('div.table-full__busy.busy',
				firstRow('Трудоустроены'),
				this.busyList = list('div.table-full__layer', RowVacancyClient)),

			)



	}

	update(data, r, t, y){
		console.log(data, r, t, y)
		data && data.forEach(el => {
			// el.vacancy.id_status = '5'
			if(el.vacancy.id_status === '1' || el.vacancy.id_status === '2') {
				this.choosenArr.push(el)
			} else if (el.vacancy.id_status === '3' || el.vacancy.id_status === '4') {
				this.readyArr.push(el)
			} else if (el.vacancy.id_status === '5')  {
				this.waitArr.push(el)
			} else if (el.vacancy.id_status === '6' || el.vacancy.id_status === '7' || el.vacancy.id_status === '8') {
				this.departmentArr.push(el)
			} else if(el.vacancy.id_status === '9') {
				this.busyArr.push(el)
			}
		})

		this.choosenList.update(this.choosenArr)
		this.readyList.update(this.readyArr)
		this.waitList.update(this.waitArr)
		this.departmentList.update(this.departmentArr)
		this.busyList.update(this.busyArr)

		this.data = data
	}

}