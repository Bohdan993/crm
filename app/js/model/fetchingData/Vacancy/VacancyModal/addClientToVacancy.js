import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'


const addClientToVacancy = async ({
 vacancy = '',
 client = ''
} = {}) => {

			try {
				const clients = await fetch.getResourse(`/vacancies/set_client/?vacancy=${vacancy}&client=${client}`)
				if(clients.success === true) {
					toastr.success(`ID вакансии ${vacancy}`, 'Успешно создан новый клиент', {closeButton: false})
				} else {
					throw new Error('Не возможно создать клиента')
				}
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}

			

}


export default addClientToVacancy //to ../../../Components/Employer/WorkModal/ContactHistoryModal