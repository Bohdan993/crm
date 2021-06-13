import SidebarPopupRadioInterface from './SidebarPopupRadioInterface'
import {setAttr} from '../../../libs/libs'

export default class SortingPopup extends SidebarPopupRadioInterface {
	constructor(type = 'employer'){
		super(type)
		this.type = type
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)

		if(this.type === 'employer') {
			this.filter(data.id, 'sort', 'sortFilter')
		} else {
			this.filter(data.id, 'sort', 'sortFilterVacancy')
		}
	}


	filter(id, str, storageKey){
		if(this.data.index === 0) {
			setAttr(this.input, {
				'checked': true
			})
		}
		super.filter(id, str, storageKey)
	}
}


