import fetch from '../../fetchingDataClass'
import WorkModalVacancyHistory from '../../../Components/Employer/WorkModal/WorkModalVacancyHistory'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}

const vacancyHistory = document.querySelector('.row.vacancies-history')


const loader = place(Loader)




const workModalVacancyHistory = new WorkModalVacancyHistory()





if(vacancyHistory) {
	mount(vacancyHistory, workModalVacancyHistory)
	mount(vacancyHistory, loader)
}





const getWorkModalVacancyHistory = async (id = '1', loading = true) => {

	if(vacancyHistory) {

		if(loading) {
			loader.update(true)
			workModalVacancyHistory.setHiddenClass().setEmptyLayer()
		}
		
		

	try {
			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=3`)
			const otherPart = data.data.other
			// console.log(data)
			// console.log(data2)
			const vacancies = {id: id, data: otherPart.vacancy_history }

			// if(state.id !== id) {
				workModalVacancyHistory.update(vacancies)
			// }

			if(loading) {
				loader.update(false)
				workModalVacancyHistory.removeHiddenClass()
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}

}


export default getWorkModalVacancyHistory 		//to ../../../Components/EmployersRow.js