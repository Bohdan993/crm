import {el, setAttr} from '../../../../libs/libs'

export default class Loader {
	constructor(){
		this.el = el('div.lds-ring', [el('div'), el('div'), el('div'), el('div')])
	}

	update(data){

	}
}


class StickyLoader {
	constructor(){
		this.el = el('div.lds-ring.sticky', [el('div'), el('div'), el('div'), el('div')])
	}

	update(data){

	}
}


export {
	StickyLoader
}