import SidebarPopupInterface from './SidebarPopupInterface'


export default class CountryPopup extends SidebarPopupInterface {
	constructor(){
		super()
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)
		this.filter(data.id, 'country', 'countryFilter')
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}


