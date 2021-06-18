import fetch from '../fetchingDataClass'
import { toastr } from '../../../../libs/libs'


const changeClientStatus = async ({
 id = '',
 status = ''
} = {}) => {

			try {
				const clients = await fetch.getResourse(`/vacancies/set_status/?id=${id}&status=${status}`)

				if(clients.success === true) {
					toastr.success(`ID клиента ${id}`, 'Успешно изменен статус клиента', {closeButton: false})
					return clients.client
				} else {
					throw new Error('Не возможно изменить статус')
				}
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return false
			}

			

}


export default changeClientStatus //to ../../../vacancy/switchRowStatuses