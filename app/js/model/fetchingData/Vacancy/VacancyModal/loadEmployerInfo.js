import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'
// import getVacancyList from '../getVacancyList'


const loadEmployerInfo = async ({
 vacancy = '',
 employer  = ''
} = {}) => {

			try {
				const employers = await fetch.getResourse(`/vacancies/change_employer/?vacancy=${vacancy}&employer=${employer}`)
				if(employers.success === true) {
					// getVacancyList()
					toastr.success(`ID вакансии ${vacancy}`, 'Данные о работодателе успешно загружены', {closeButton: false})
				} else {
					throw new Error('Не возможно загрузить информацию о работодателе')
				}

				return Promise.resolve(employers.data)
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}

			

}


export default loadEmployerInfo //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
																//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight