import fetch from '../fetchingDataClass'
import {list, mount, toastr} from '../../../../libs/libs'


const getVacancyClients = async (id) => {

		try {
				const data = await fetch.getResourse(`/vacancies/get_clients/?vacancy=${id}`)
				if(data.success === true) {
					const clients = data.data.client
					return clients
				}
				else {
					throw new Error('Не возможно загрузить список клиентов')
				}
		} catch (e) {
			console.error(e)
		}
	

}




export default getVacancyClients