import {el, setAttr} from '../../../../../libs/libs'
import saveFieldsData from '../../../fetchingData/saveFieldsData'



export default class WorkModalCreateVacancy {
	constructor(){
		this.data = {}
		this.el = el('div.sidebar__filter-wrapper', 
			this.link = el('a', {
				href: '#',
			}, 'Создать вакансию'),
		)
	}


	update(data){

		this.data = data
	}
}


