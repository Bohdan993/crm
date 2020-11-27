import {el, setAttr, place} from '../../../../../libs/libs'
import TableVacancyClient from '../VacancyClients'
import showFullClientsRow from '../../../vacancy/showFullClientsRow'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'

export default class ClientsComponent {
	constructor() {
		this.data = {}
		this.el = el('div.clients-layer',
				this.switcher = el('i.switcher', 
					el('i.s-union')),
				el('div.modal-row__controls', 
					el('p', 'Клиенты'),
					el('div.add-item', el('span', '+'), 'добавить клиента'
						)),
					this.modalLayer = el('div.modal-row__layer', 
						el('div.modal-row__clients-row.active',
							el('p', `Гурківський Олександр, Лемешко Аліна, Романов Валентин, Тарасюк Віталій, Бичківська Алла, Червінський Йосип, Шащук Іван, Іванчик Олесандр, Гурківський Олександр, 
								Лемешко Аліна, Романов Валентин, Тарасюк Віталій, Бичківська
								Алла, Червінський Йосип, Шащук Іван, Іванчик Олесандр`)),
						this.vacancyClientsTable = new TableVacancyClient()) 
			)



	}


	update(data) {
		// console.log(data)
		this.vacancyClientsTable.update(data)
	}


	onmount() {
		showFullClientsRow(this.switcher, this.el)
		initOverlayScrollbars(this.modalLayer)
	}
} 
