import fetch from '../../fetchingDataClass'
import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../../../libs/libs'


const deleteFeedback = async ({
	str = 'employers',
	id, 
	id_employer, 
	count,
	other,
	string
} = {}) => {
			try {
				const contacts = await fetch.getResourse(`/${str}/delete_feedback/?id=${id}`)
				getWorkModalFeedback({id: id_employer, p: 1, t: count, deleating: true, other, str: string})
				toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален отзыв', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default deleteFeedback //to ../../../Components/Employer/WorkModal/ContactHistoryModal