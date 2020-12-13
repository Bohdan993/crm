import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'


const copyVacancy = async ({
 vacancy = '',
} = {}) => {

			try {
				const data = await fetch.getResourse(`/vacancies/clone_vacancy/?id=${vacancy}`)
				if(data.success === true) {
					toastr.success(`ID вакансии ${data.id}`, 'Вакансия успешно скопирована', {closeButton: false})
				} else {
					throw new Error('Не удалось создать копию вакансии')
				}

				return Promise.resolve(data.id)
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}

			

}


export default copyVacancy //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
																//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight