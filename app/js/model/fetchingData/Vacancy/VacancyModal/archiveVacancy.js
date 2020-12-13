import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'


const archiveVacancy = async ({
 vacancy = '',
} = {}) => {

			try {
				const data = await fetch.getResourse(`/vacancies/archive/?id=${vacancy}`)
				if(data.success === true) {
					toastr.success(`ID вакансии ${vacancy}`, 'Вакансия успешно заархивирована', {closeButton: false})
				} else {
					throw new Error('Не удалось заархивировать вакансию')
				}

				return Promise.resolve('ok')

			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}

			

}


export default archiveVacancy //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
																//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight