import SidebarPopupInterface from './SidebarPopupInterface'


export default class ContactDataPopup extends SidebarPopupInterface {
	constructor(){
		super()
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)
		this.filter(data.id, 'contact', 'contactDataFilter')
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}
