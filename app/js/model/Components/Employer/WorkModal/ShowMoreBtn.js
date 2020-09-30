import {el, setAttr} from '../../../../../libs/libs'

export default class ShowMoreBtn {
	constructor(){
		this.el = el('button.show-more', this.text = el('span'))
	}

	update(data){
		setAttr(this.text, {
			innerText: data
		})
	}
}


