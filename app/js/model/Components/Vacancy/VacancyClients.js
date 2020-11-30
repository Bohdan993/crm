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
		this.choosenObj = {}
		this.readyObj = {}
		this.waitObj = {}
		this.departmentObj = {}
		this.busyObj = {}

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
		console.log(data)
		data && data.forEach(el => {
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


		this.choosenList.update(Object.values(this.choosenObj))
		this.readyList.update(Object.values(this.readyObj))
		this.waitList.update(Object.values(this.waitObj))
		this.departmentList.update(Object.values(this.departmentObj))
		this.busyList.update(Object.values(this.busyObj))

		this.choosenObj = {}
		this.readyObj = {}
		this.waitObj = {}
		this.departmentObj = {}
		this.busyObj = {}

		this.data = data
	}

}