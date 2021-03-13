import {el, setAttr} from '../../../../../libs/libs'
import saveFieldsData from '../../../fetchingData/saveFieldsData'

function onChangeHandler(e) {

	console.log(this.input.checked)
	saveFieldsData({
		str: 'employers',
		id: this.data.id,
		value: this.input.checked ? '0' : '1',
		field: 'mailing',
		target: 'main',
		id_target: ''
	})
}


export default class WorkModalMailing {
	constructor(){
		this.data = {}
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: 'remove-sending-chbx'
			}),
			this.label = el('label', {
				for: 'remove-sending-chbx'
			}, 'Исключить из рассылки'),
		)

		this.input.addEventListener('change', onChangeHandler.bind(this))
	}

	update(data){

		console.log(data.mailing === '1')
		// setAttr(this.text, {
		// 	innerText: data
		// })



		setAttr(this.input, {
			checked: data.mailing === '1' ? false : true
		})

		this.data = data
	}
}


