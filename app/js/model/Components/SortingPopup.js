import SidebarPopupRadioInterface from './SidebarPopupRadioInterface'


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
		super.filter(id, str, storageKey)
	}
}


