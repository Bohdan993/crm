import fetch from '../../fetchingDataClass'
import getWorkModalContactHistory from './getWorkModalContactHistory'
import { toastr } from '../../../../../libs/libs'


const deleteContactHistory = async ({id, id_employer, count} = {}) => {
			try {
				const contacts = await fetch.getResourse(`/employers/delete_contact/?id=${id}`)
	
				if(contacts.success === true) {
					toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален контакт', {closeButton: false})
					getWorkModalContactHistory({id: id_employer, p: 1, t: count, deleating: true})
				} else {
					throw new Error('Не возможно удалить контакт')
				}

				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}
}


export default deleteContactHistory //to ../../../Components/Employer/WorkModal/ContactHistoryModal