import SidebarPopupRadioInterface from '../SidebarPopupRadioInterface'


export default class SortingPopup extends SidebarPopupRadioInterface {
	constructor(){
		super()
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)
		this.filter(data.id, 'sort', 'sortFilter')
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}


