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
				this.choosenList = list('div', RowVacancyClient)),
				
			el('div.table-full__ready.ready',
				firstRow('Готовятся к подаче'),
				this.readyList = list('div', RowVacancyClient)),
				
			el('div.table-full__wait.wait',
				firstRow('Ждут разрешения'),
				this.waitList = list('div', RowVacancyClient)),

			el('div.table-full__department.department',
				firstRow('Готовятся к отъезду'),
				this.departmentList = list('div', RowVacancyClient)),
	
			el('div.table-full__busy.busy',
				firstRow('Трудоустроены'),
				this.busyList = list('div', RowVacancyClient)),

			)



	}

	update(data, r, t, y){
		console.log(data, r, t, y)
		data.forEach(el => {
			if(el.vacancy.id_status === '1') {
				this.choosenArr.push(el)
			}
		})
		this.choosenList.update(this.choosenArr)
		this.data = data
	}

}