import fetch from '../../fetchingDataClass'
import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../../../libs/libs'


const addFeedback = async ({
	str = 'employers/feedback',
	id_feedback, 
	feedback, 
	type_feedback, 
	type_author,
	id_author, 
	type_arrow, 
	date, 
	id_employer,
	count
} = {}) => {
			// console.log(id_employer, message)
			try {
				// if(id_login === '') {
				// 	throw new Error('Нужно выбрать менеджера')
				// }
				// if(id_type === '') {
				// 	throw new Error('Нужно выбрать тип контакта')
				// }
				const contacts = await fetch.getResourse(`/${str}/?id_feedback=${id_feedback}&feedback=${feedback}&type_feedback=${type_feedback}&id_author=${id_author}&type_author=${type_author}&type_arrow=${type_arrow}&date=${date}&id_employer=${id_employer}`)
				getWorkModalFeedback({id:id_employer , adding: true, p: 1, t: count})
				// console.log(production)

				toastr.success(`ID работодателя ${id_employer}`, 'Успешно создан новый отзыв', {closeButton: false})
				// return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e.message)
			}

			// return Promise.resolve('fail')

}


export default addFeedback //to ../../../Components/FeedbackComponent