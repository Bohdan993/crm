import StagesOfVacanciesPopup from '../../Components/Vacancy/StagesOfVacanciesPopup'
import {list, mount} from '../../../../libs/libs'

const stagesPopup = document.querySelector('#status-popup')

const popup = list("form", StagesOfVacanciesPopup, 'id', 'vacancy')



if(stagesPopup) {
	mount(stagesPopup, popup)
}


const getStatusesVacancyPopup = () => {

				// if(sessionStorage.getItem('statusFilterVacancy')) { 
				// 		statuses = statuses.map(status => {
				// 		let checked = !!~JSON.parse(sessionStorage.getItem('statusFilterVacancy')).split(',').indexOf(status.id)
				// 		return {
				// 			id: status.id,
				// 			name: status.name,
				// 			icon: status.id_group,
				// 			prefix: 'status-chbx-',
				// 			checked
				// 		}
				// 	})
				// } else {
				// 	statuses = statuses.map(status => {
				// 		return {
				// 			id: status.id,
				// 			name: status.name,
				// 			icon: status.id_group,
				// 			prefix: 'status-chbx-',
				// 		}
				// 	})
				// }

				

				localStorage.setItem('statusesVacancy', JSON.stringify(statuses))
				popup.update(statuses)


}




export default getStatusesVacancyPopup // to ../index.js