import {el, setAttr} from '../../../../libs/libs'

export default class ManagerPopup {
	constructor(){
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: 'chbx'
			}),
			this.label = el('label' ,{
				for: 'chbx'
			}, this.tag = el('i.tag.manager-tag'))
			)
	}

	 update(data, index, items, context) {
	 		// console.log(data)
			this.data = data
			this.data.index = index
			this.input.id = 'manager-chbx-' + data.id
			setAttr(this.tag, {
				innerText: data.name
			})
			setAttr(this.label, {
				for: 'manager-chbx-' + data.id,
				innerHTML: `<i class="tag manager-tag" style="background-color:${'#' + data.color}">${data.name.split(/\s+/).map(word => word[0].toUpperCase()).join('')}</i>${data.name}`
			})
	}
}
