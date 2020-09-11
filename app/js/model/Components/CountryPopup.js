


import {el, setAttr} from '../../../libs/libs'

export default class CountryPopup {
	constructor(){
		this.el = el('div.input-group', 
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
	 		// console.log(data)
			this.data = data
			this.data.index = index
			this.input.id = 'country-chbx-' + data.id
			setAttr(this.label, {
				for: 'country-chbx-' + data.id,
				innerText: data.name
			})
	}
}

