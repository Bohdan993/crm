import  SortingPopup from '../../Components/SortingPopup'
import {list, mount} from '../../../../libs/libs'

const sortPopup = document.querySelector('#selecting-popup')
let filters = [
	{
		id: 'date',
		name: 'По дате начала работы'
	},{
		id: 'country',
		name: 'По странам'
	},{
		id: 'manager',
		name: 'По менеджерам'
	}
]


const popup = list("form", SortingPopup, 'id', 'vacancy')

if(sortPopup) {
	mount(sortPopup, popup)
}


const mountSortingVacancyPopup = () => {
if(sortPopup) {

				

				if(sessionStorage.getItem('sortFilterVacancy')) { 
						filters = filters.map(filter => {
						let checked = JSON.parse(sessionStorage.getItem('sortFilterVacancy')) === filter.id
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




export default  mountSortingVacancyPopup // to ../../index.js