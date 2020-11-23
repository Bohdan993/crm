import  DateAndTerms from '../../Components/Vacancy/DateAndTermsPopup'
import {list, mount} from '../../../../libs/libs'
import {datePopup} from '../../../view/vacancy'

const popup = new DateAndTerms()

if(datePopup) {
	mount(datePopup, popup)
}


const mountDateAndTermsPopup = () => {
if(datePopup) {

				

				// if(sessionStorage.getItem('sortFilterVacancy')) { 
				// 		filters = filters.map(filter => {
				// 		let checked = JSON.parse(sessionStorage.getItem('sortFilterVacancy')) === filter.id
				// 		return {
				// 			id: filter.id,
				// 			name: filter.name,
				// 			prefix: 'sorting-',
				// 			checked
				// 		}
				// 	})
				// } else {
				// 	filters = filters.map(filter => {
				// 	return {
				// 				id: filter.id,
				// 				name: filter.name,
				// 				prefix: 'sorting-'
				// 			}
				// 	})
				// }

				// popup.update(filters);
	}
}




export default  mountDateAndTermsPopup // to ../../index.js