import SidebarPopupInterface from './SidebarPopupInterface'


export default class CountryPopup extends SidebarPopupInterface {
	constructor(type = 'employer'){
		super(type)
		this.type = type
	}

	update(data, index, items, context) {
		console.log(data)
		super.update(data, index, items, context)
		if(this.type === 'employer') {
			this.filter(data.id, 'country', 'countryFilter')
		} else {
			this.filter(data.id, 'country', 'countryFilterVacancy')
		}
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}


