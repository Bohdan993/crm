import SidebarPopupInterface from '../SidebarPopupInterface'


export default class StagesOfVacanciesPopup extends SidebarPopupInterface {
	constructor(){
		super()
	}

	update(data, index, items, context) {
		super.update(data, index, items, context)
		this.filter(data.id, 'country', 'stagesOfVacancies')
	}


	filter(id, str, storageKey){
		super.filter(id, str, storageKey)
	}
}


