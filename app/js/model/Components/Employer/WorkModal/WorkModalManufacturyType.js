import {el, setAttr, svg} from '../../../../../libs/libs';

export default class WorkModalManufacturyType {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'Тип производства'),
			el('div.add-item', 'добавить тип производства', el('span', '+'))
			)

		this.modalRow = el('div.modal-row__manufactury-type-row', 
			el('div.input-group.modal-row__manufactury-type-select.native-select', 
				el('select.info-area', {
					value: ''
					}, 
					el('option','Выбрать',{
						disabled: true,
						selected: true,
						value: ''
					}),
					el('option','Коровы',{
						value: ''
					}),
					el('option','Цветы',{
						value: ''
					}),
					)
				),
			el('div.input-group', 
				el('span.delete-manufactury-type'),
				el('input.info-area', {
					type: 'text'
				})
				)
			)
		
		this.modalLayer = el('div.modal-row__layer')


		this.el = el('div.manufactury-type__layer',
				this.controls,
				this.modalLayer
			)
	}

	 update(data, index, items, context) {
	 		// console.log(data)
			this.data = data
			this.data.index = index
			// this.input.id = 'country-chbx-' + data.id
			// setAttr(this.label, {
			// 	for: 'country-chbx-' + data.id,
			// 	innerText: data.name
			// })
	}
}

