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
		this.el = el("div.row__full-info.table-full",
			el('div.table-full__choosen.choosen',
				firstRow('Отобраны'),
				list('div', RowVacancyClient)),
				
			el('div.table-full__ready.ready',
				firstRow('Готовятся к подаче'),
				list('div', RowVacancyClient)),
				
			el('div.table-full__wait.wait',
				firstRow('Ждут разрешения'),
				list('div', RowVacancyClient)),

			el('div.table-full__department.department',
				firstRow('Готовятся к отъезду'),
				list('div', RowVacancyClient)),
	
			el('div.table-full__busy.busy',
				firstRow('Трудоустроены'),
				list('div', RowVacancyClient)),

			)



	}

	update(data){
		this.data = data
	}

}