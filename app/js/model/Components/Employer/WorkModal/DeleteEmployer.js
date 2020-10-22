import {el, setAttr} from '../../../../../libs/libs'

export default class ShowMoreBtn {
	constructor(){
		this.el = el('li.sidebar__filter-item',
			el('div.sidebar__filter-wrapper',
				el('p', 'Удалить'),
				el('time', '20.04.2019'))
			)
	}

	update(data){
	}
}



