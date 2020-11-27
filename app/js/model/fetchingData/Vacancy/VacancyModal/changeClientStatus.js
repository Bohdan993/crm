import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'

const changeClientStatus = async ({
	id = '1', 
	status = 1
} = {}) => {


	try {
			const data = await fetch.getResourse(`/vacancies/set_status/?id=${id}&status=${status}`)
			if(data.success === true) {

			}
			else {
				throw new Error('Не возможно изменить статут клиента')
			}

		}
		catch(e) {
			toastr.error(e.message, 'Ошибка', {closeButton: false})
		}


}


export default changeClientStatus   	//to ../../../Components/VacancyRow.js