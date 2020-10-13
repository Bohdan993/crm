import fetch from '../../fetchingDataClass'
import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../../../libs/libs'


const deleteFeedback = async ({
	id, 
	id_employer, 
	count
} = {}) => {
			try {
				const contacts = await fetch.getResourse(`/employers/delete_feedback/?id=${id}`)
				getWorkModalFeedback({id: id_employer, p: 1, t: count, deleating: true})
				toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален отзыв', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default deleteFeedback //to ../../../Components/Employer/WorkModal/ContactHistoryModal