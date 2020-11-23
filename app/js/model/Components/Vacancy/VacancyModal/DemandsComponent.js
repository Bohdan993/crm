import {el, setAttr, place} from '../../../../../libs/libs';
import saveFieldsData from '../fetchingData/saveFieldsData'

export default class DemandComponent {
	constructor(){

		this.data = {}
		this.el = el('div.row.demands.modal-row', 
			el('div.modal-row__controls', 
				el('p', 'Требования')),
			el('div.modal-row__layer',
				el('div.demands__top',
					el('div.demands__clients.info-block',
						el('p', 'Кол-во клиентов'),
						el('div.input-group',
							el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__men.info-block',
						el('p', 'М'),
						el('div.input-group',
							el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__women.info-block',
						el('p', 'Ж'),
						el('div.input-group',
							el('input.info-area', {
								type: 'text'
							}))),
					el('div.demands__languages.info-block',
						el('p', 'Уровень владения языками'),
						el('div.input-group',
							el('input.info-area', {
								type: 'text'
							})))),
				el('div.demands__bottom bottom-areas',
					el('div.demands__experiance info-block',
						el('p', 'Опыт работы'),
						el('div.input-group',
							el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.demands__requirements.info-block',
						el('p', 'Особые требования'),
						el('div.input-group',
							el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					)))

	}


	update(data, index, items, context){
	}


}

