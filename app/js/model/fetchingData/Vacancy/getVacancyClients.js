import fetch from '../fetchingDataClass'
import {list, mount, toastr} from '../../../../libs/libs'
import {EmptyError} from '../../helper'
 

const getVacancyClients = async (id) => {

		try {
				const data = await fetch.getResourse(`/vacancies/get_clients/?vacancy=${id}`)
				console.log(data)
				if(data.success === true) {
					const clients = data.data.client
					return clients
				}
				else {
					throw new EmptyError('В данной вакансии ещё нет клиентов')
				}
		} catch (e) {
			if(e.name === 'EmptyError') {
				toastr.warning(e.message, 'Предупреждение', {closeButton: true})
			} else {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}
			
			return false
		}
	

}




export default getVacancyClients