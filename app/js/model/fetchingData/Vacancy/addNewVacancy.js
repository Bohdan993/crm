import fetch from '../fetchingDataClass'
import getVacancyList from './getVacancyList'
import { sidebarVacancy } from '../../../view'
import { toastr }from '../../../../libs/libs'
import vacancyListAddEvent from '../../CustomEvents/VacancyListAddEvent'



const addNewVacancy = () => {
		if(sidebarVacancy) {


		sidebarVacancy.addEventListener('click', async function(){
			try {
				const vacancy = await fetch.getResourse('/vacancies/create')

				if(vacancy.success === true) {
					toastr.success(`ID вакансии ${vacancy.id}`, 'Успешно создана вакансия', {closeButton: false})
					getVacancyList()
				} else {
					throw new Error('Не возможно cоздать вакансию')
				}


				vacancyListAddEvent.detail.id = String(vacancy.id)
				document.dispatchEvent(vacancyListAddEvent)

			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}

		})
	}
}


export default addNewVacancy