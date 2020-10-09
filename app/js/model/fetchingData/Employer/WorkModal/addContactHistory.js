import fetch from '../../fetchingDataClass'
import getWorkModalContactHistory from './getWorkModalContactHistory'
import { toastr } from '../../../../../libs/libs'


const addContactHistory = async ({
	id_contact, 
	message, 
	date, 
	type_arrow, 
	id_login, 
	id_type, 
	id_employer,
	count
} = {}) => {
			// console.log(id_employer, message)
			try {
				if(id_login === '') {
					throw new Error('Нужно выбрать менеджера')
				}
				if(id_type === '') {
					throw new Error('Нужно выбрать тип контакта')
				}
				const contacts = await fetch.getResourse(`/employers/contact/?id_contact=${id_contact}&message=${message}&date=${date}&type_arrow=${type_arrow}&id_login=${id_login}&id_type=${id_type}&id_employer=${id_employer}`)
				getWorkModalContactHistory({id:id_employer , adding: true, p: 1, t: count})
				// console.log(production)

				toastr.success(`ID работодателя ${id_employer}`, 'Успешно создан контакт', {closeButton: false})
				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e.message)
			}

			return Promise.resolve('fail')

}


export default addContactHistory //to ../../../Components/Employer/WorkModal/ContactHistoryModal