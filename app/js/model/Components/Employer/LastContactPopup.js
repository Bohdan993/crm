import SidebarPopupRadioInterface from './SidebarPopupRadioInterface'


export default class LastContactPopup extends SidebarPopupRadioInterface {
	constructor(){
		super()
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)
		this.filter(data.id, 'last_contact', 'lastContactFilter')
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}


