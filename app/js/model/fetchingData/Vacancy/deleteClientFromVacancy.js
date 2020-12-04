import fetch from '../fetchingDataClass'
import { toastr } from '../../../../libs/libs'


const deleteClientFromVacancy = async ({
 id = ''
} = {}) => {

			try {
				const clients = await fetch.getResourse(`/vacancies/delete_client/?id=${id}`)
				if(clients.success === true) {
					toastr.success(`ID клиента ${id}`, 'Успешно удален клиент', {closeButton: false})
				} else {
					throw new Error('Не возможно удалить клиента')
				}

				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}

			

}


export default deleteClientFromVacancy //to ../../../vacancy/switchRowStatuses