import SidebarPopupInterface from '../SidebarPopupInterface'


export default class StagesOfVacanciesPopup extends SidebarPopupInterface {
    constructor(type = 'employer') {
        super(type)
        this.type = type
    }

    update(data, index, items, context) {
        super.update(data, index, items, context)
        this.filter(data.id, 'status', 'stagesOfVacancies')
    }


    filter(id, str, storageKey) {
        super.filter(id, str, storageKey)
    }
}


