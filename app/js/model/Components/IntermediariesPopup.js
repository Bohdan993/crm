import {el, setAttr} from '../../../libs/libs'


class RadioGroup {
	constructor() {
			this.el = el('.input-group.radio-group-type-1', 
			el('input#show-rbtn', {
				type: 'radio',
				name: "intermediaries-rbtn"
			}),
			el('label', 'Показать', {
				for: 'show-rbtn'
			}),
			el('input#remove-rbtn', {
				type: 'radio',
				name: "intermediaries-rbtn"
			}),
			el('label', 'Исключить', {
				for: 'remove-rbtn'
			}),
			)
		}

	update(data) {

	}
}

export default class IntermediariesPopup {
	constructor(){
	
		this.el= el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: 'chbx'
			}),
			this.label = el('label' ,{
				for: 'chbx'
			})
			)

	}

	 update(data, index, items, context) {
			this.data = data
			this.data.index = index
			this.input.id = 'manager-chbx-' + data.id
			setAttr(this.label, {
				for: 'manager-chbx-' + data.id,
				innerText: data.name
			})

	}
}


export {
	RadioGroup
}



