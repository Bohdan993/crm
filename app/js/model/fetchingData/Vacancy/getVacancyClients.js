import fetch from '../fetchingDataClass'
import {
	toastr
} from '../../../../libs/libs'
import {
	EmptyError
} from '../../helper'


const getVacancyClients = async (id, isNewVacancy) => {

	try {
		const data = await fetch.getResourse(`/vacancies/get_clients/?vacancy=${id}`)


		if (data.success === true) {
			const clients = data.data.client
			return clients
		} 

		if (!isNewVacancy) {
			throw new EmptyError('В данной вакансии ещё нет клиентов')
		}

		
	} catch (e) {
		
		if (e.name === 'EmptyError') {
			toastr.warning(e.message, 'Предупреждение', {
				closeButton: true
			})
		} else {
			toastr.error(e.message, 'Возникла ошибка', {
				closeButton: true
			})
		}

		return false
	}


}




export default getVacancyClients