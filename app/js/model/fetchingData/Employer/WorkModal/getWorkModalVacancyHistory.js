import fetch from '../../fetchingDataClass'
import WorkModalVacancyHistory from '../../../Components/Employer/WorkModal/WorkModalVacancyHistory'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

// const state = {}
let globalVacancies = []
let globalID = ''


const vacancyHistory = document.querySelector('.row.vacancies-history')


const loader = place(Loader)




const workModalVacancyHistory = new WorkModalVacancyHistory()





if(vacancyHistory) {
	mount(vacancyHistory, workModalVacancyHistory)
	mount(vacancyHistory, loader)
}





const getWorkModalVacancyHistory = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing
} = {}) => {

	if(vacancyHistory) {

		if(loading) {
			loader.update(true)
			workModalVacancyHistory.setHiddenClass().setEmptyLayer()
		}
		
		

	try {
			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=3&p=${p}&t=${t}`)
			const otherPart = data.data.other

			if(globalID !== id) {
				globalVacancies = [
					...otherPart.vacancy_history 
				]
			} else {

				if(loading) {
						globalVacancies = [
						...otherPart.vacancy_history 
					]
				}

				if(showing) {
						globalVacancies = [
						...globalVacancies,
						...otherPart.vacancy_history
					]
				}

			}

			const vacancies = {
				id: id, 
				data: globalVacancies, 
				total: data.data.total !== undefined ? data.data.total.vacancy_history : otherPart.vacancy_history.length, 
				loading,  
				showing
			}

			// if(state.id !== id) {
				workModalVacancyHistory.update(vacancies)
			// }

			if(loading) {
				loader.update(false)
				workModalVacancyHistory.removeHiddenClass()
			}
			
			// state.id = id
		}catch(e) {
			console.error(e)
		}
}

	globalID = id

}


export default getWorkModalVacancyHistory 		//to ../../../Components/EmployersRow.js