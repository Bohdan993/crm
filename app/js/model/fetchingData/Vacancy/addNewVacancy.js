import fetch from '../fetchingDataClass'
import getVacancyList from './getVacancyList'
import { sidebarEmployer } from '../../../view'
import { toastr }from '../../../../libs/libs'
// import employerListAddEvent from '../CustomEvents/EmployerListAddEvent'



const addNewVacancy = () => {
		if(sidebarEmployer) {


		sidebarEmployer.addEventListener('click', async function(){
			try {
				const vacancy = await fetch.getResourse('/vacancies/create')


				if(vacancy.success === true) {
					toastr.success(`ID вакансии ${employer.id}`, 'Успешно создана вакансия', {closeButton: false})
					getEmployersList()
				} else {

				}
				
				// console.log(employer)
				// console.log(data)

				// employerListAddEvent.detail.id = String(employer.id)
				// document.dispatchEvent(employerListAddEvent)

			} catch(e) {
				console.error(e)
			}

		

      
		})
	}
}


export default addNewVacancy