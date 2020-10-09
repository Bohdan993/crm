import fetch from '../../fetchingDataClass'
import getWorkModalContactHistory from './getWorkModalContactHistory'
import { toastr } from '../../../../../libs/libs'


const deleteContactHistory = async ({id, id_employer, count} = {}) => {
			try {
				const contacts = await fetch.getResourse(`/employers/delete_contact/?id=${id}`)
				getWorkModalContactHistory({id: id_employer, p: 1, t: count, deleating: true})
				toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален контакт', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default deleteContactHistory //to ../../../Components/Employer/WorkModal/ContactHistoryModal