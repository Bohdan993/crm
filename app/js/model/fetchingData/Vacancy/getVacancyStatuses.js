import fetch from '../fetchingDataClass'
// import StagesOfVacanciesPopup from '../../Components/Vacancy/StagesOfVacanciesPopup'
// import {list, mount} from '../../../../libs/libs'

// const stagesPopup = document.querySelector('#status-popup')

// const popup = list("form", StagesOfVacanciesPopup, 'id', 'vacancy')



// if(stagesPopup) {
// 	mount(stagesPopup, popup)
// }


const getStatusesVacancyPopup = async () => {
// if(countryPopup) {
		try {
				const data = await fetch.getResourse('/vacancies/get_other/?s=5')
				// console.log(data)
				let statuses = data.data.status

				localStorage.setItem('statusesVacancy', JSON.stringify(statuses))
				// popup.update(statuses)

		} catch (e) {
			console.error(e)
		}
	// }

}




export default getStatusesVacancyPopup // to ../index.js