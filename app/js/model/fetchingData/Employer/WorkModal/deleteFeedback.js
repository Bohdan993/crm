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
				const feedbacks = await fetch.getResourse(`/${str}/delete_feedback/?id=${id}`)

				if(feedbacks.success === true) {
					toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален отзыв', {closeButton: false})
					getWorkModalFeedback({id: id_employer, p: 1, t: count, deleating: true, other, str: string})
				} else {
					throw new Error('Не возможно удалить отзыв')
				}

				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}
}


export default deleteFeedback //to ../../../Components/Employer/WorkModal/ContactHistoryModal