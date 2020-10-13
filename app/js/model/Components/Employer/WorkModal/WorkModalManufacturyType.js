import {el, setAttr, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import Option from '../../OptionComponent'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import saveFieldsData from '../../../fetchingData/Employer/WorkModal/saveFieldsData'
import addManufacturyType from '../../../fetchingData/Employer/WorkModal/addManufacturyType'



class WorkModalManufacturyTypeRow {
	constructor(){


		this.el = el('div.modal-row__manufactury-type-row', 
			el('div.input-group.modal-row__manufactury-type-select.native-select', 
					this.select = list('select.info-area', Option)
				),
			el('div.input-group', 
				el('span.delete-manufactury-type'),
				this.textArea = el('input.info-area', {
					type: 'text'
				})
				)
			)

			this.defaultOption = {
				id: 0,
				name: 'Выбрать'
			}

	}


	update(data){
		// console.log(data)
		let arr = JSON.parse(localStorage.getItem('type_manufactury'))
		arr.unshift(this.defaultOption)
		this.select.update(arr)
		this.textArea.value = data.name
	}
}


export default class WorkModalManufacturyType {
	constructor(){
		this.data = {}
		this.controls = el('div.modal-row__controls',
			el('p', 'Тип производства'),
			this.addItem = el('div.add-item', el('span', '+'), 'добавить тип производства', {
				'data-id': '111'
			})
			)

		this.modalRowWrapper = el('div.modal-row__manufactury-type-wrapper')
		this.modalLayer = el('div.modal-row__layer.empty-layer', 
			this.list = list(this.modalRowWrapper, WorkModalManufacturyTypeRow, 'id')
		)


		this.el = el('div.manufactury-type__layer',
				this.controls,
				this.modalLayer,
				// this.showMore = place(ShowMoreBtn)
		)
		
		// this.modalLayer = el('div.modal-row__layer.empty-layer')


		// this.el = el('div.manufactury-type__layer',
		// 		this.controls,
		// 		this.list = list(this.modalLayer, WorkModalManufacturyTypeRow, 'id')
		// 	)

		this.addItem.addEventListener('click', (e) => {
			addManufacturyType(this.data.id)
		})
	}

	 update(data, index, items, context) {

	 		// if(data.id !== this.data.id) {
		 		this.list.update(data.data)
				//Вызов функций которые зависят от инстанса класса
				 checkIfWrapperIsEmpty(this.modalRowWrapper)
				//
	 		// }
	
			
			this.data = data
			this.data.index = index
	}


}

Object.assign(WorkModalManufacturyType.prototype , hiddenClassMixin)