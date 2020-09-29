import {el, setAttr, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'




class WorkModalManufacturyTypeRow {
	constructor(){


		this.el = el('div.modal-row__manufactury-type-row', 
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
				this.textArea = el('input.info-area', {
					type: 'text'
				})
				)
			)


	}


	update(data){
		console.log(data)

		this.textArea.value = data.name
	}
}


export default class WorkModalManufacturyType {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'Тип производства'),
			el('div.add-item', el('span', '+'), 'добавить тип производства')
			)
		
		this.modalLayer = el('div.modal-row__layer.empty-layer')


		this.el = el('div.manufactury-type__layer',
				this.controls,
				this.list = list(this.modalLayer, WorkModalManufacturyTypeRow, 'id')
			)
	}

	 update(data, index, items, context) {

	 		// console.log(data)
	 		
			
	
	 		// console.log(data)
	
			this.list.update(data)
			// this.input.id = 'country-chbx-' + data.id
			// setAttr(this.label, {
			// 	for: 'country-chbx-' + data.id,
			// 	innerText: data.name
			// })

			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalLayer)
			//

			this.data = data
			this.data.index = index
	}

	 onremount() {
        console.log("remounted App");
    }


}

Object.assign(WorkModalManufacturyType.prototype , hiddenClassMixin)