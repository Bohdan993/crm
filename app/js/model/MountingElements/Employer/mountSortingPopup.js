import SortingPopup from '../../Components/SortingPopup'
import {
	list,
	mount
} from '../../../../libs/libs'

const sortPopup = document.querySelector('#sorting-popup')
let filters = [{
	id: 'date',
	name: 'По внесению'
}, {
	id: 'name',
	name: 'По имени'
}, {
	id: 'contact',
	name: 'По контактам'
}, {
	id: 'vacancy',
	name: 'По вакансиям'
}]


const popup = list("form", SortingPopup, 'id', 'employer')

if (sortPopup) {
	mount(sortPopup, popup)
}


const mountSortingPopup = () => {
	console.log('dfdf')
	if (sortPopup) {



		if (sessionStorage.getItem('sortFilter')) {
			filters = filters.map(filter => {
				let checked = JSON.parse(sessionStorage.getItem('sortFilter')) === filter.id
				return {
					id: filter.id,
					name: filter.name,
					prefix: 'sorting-',
					checked
				}
			})
		} else {
			filters = filters.map(filter => {
				return {
					id: filter.id,
					name: filter.name,
					prefix: 'sorting-'
				}
			})
		}





		popup.update(filters);
	}
}




export default mountSortingPopup // to ../../index.js