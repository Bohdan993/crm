import {
	el,
	setAttr
} from '../../../../../libs/libs'

export default class ShowLessBtn {
	constructor() {
		this.el = el('button.show-less', this.text = el('span'))
	}

	update(data) {
		setAttr(this.text, {
			innerText: data
		})
	}
}