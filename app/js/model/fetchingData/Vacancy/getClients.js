import fetch from '../fetchingDataClass'
import { toastr }from '../../../../libs/libs'
const getClientsVacancy = async () => {
	// if(true) {
		try{
			const data = await fetch.getResourse('/vacancies/get_other/?s=4')
			
			if(data.success === true) {
				let clients = data.data.client
				localStorage.setItem('clientsVacancy', JSON.stringify(clients))
			} else {
				throw new Erroe('Не возможно загрузить список клиентов')
			}
		} catch(e) {
			toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
		}
	// }
}

export default getClientsVacancy // to ../../index.js