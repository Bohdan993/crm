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
	count,
	other, 
	string
} = {}) => {
			console.log(type_feedback, type_author)
			try {
				if(feedback === '') {
					throw new Error('Введите текст отзыва')
				}
				if(type_feedback === '') {
					throw new Error('Нужно выбрать тип отзыва')
				}
				if(date === '') {
					throw new Error('Введите дату добавления отзыва')
				}
				if(type_author === '1' && !id_author) {
					throw new Error('Выберите автора отзыва')
				}
				const feedbacks = await fetch.getResourse(`/${str}/?id_feedback=${id_feedback}&feedback=${feedback}&type_feedback=${type_feedback}&id_author=${id_author}&type_author=${type_author}&type_arrow=${type_arrow}&date=${date}&id_employer=${id_employer}`)
				getWorkModalFeedback({id:id_employer , adding: true, p: 1, t: count, other, str: string})
				// console.log(production)

				toastr.success(`ID работодателя ${id_employer}`, 'Успешно создан новый отзыв', {closeButton: false})
				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e.message)
				return Promise.resolve('fail')
			}

		

}


export default addFeedback //to ../../../Components/FeedbackComponent