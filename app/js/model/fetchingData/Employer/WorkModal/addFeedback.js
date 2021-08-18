import fetch from '../../fetchingDataClass'
import getWorkModalFeedback from './getWorkModalFeedback'
import {toastr} from '../../../../../libs/libs'


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
    try {
        if (feedback === '') {
            throw new Error('Введіть текст відгуку')
        }
        if (type_feedback === '') {
            throw new Error('Потрібно вибрати тип відгуку')
        }
        if (date === '') {
            throw new Error('Введіть дату створення відгуку')
        }
        if (type_author === '1' && !id_author) {
            throw new Error('Виберіть автора відгуку')
        }
        const feedbacks = await fetch.getResourse(`/${str}/?id_feedback=${id_feedback}&feedback=${feedback}&type_feedback=${type_feedback}&id_author=${id_author}&type_author=${type_author}&type_arrow=${type_arrow}&date=${date}&id_employer=${id_employer}`)

        if (feedbacks.success === true) {
            toastr.success(`ID роботодавця ${id_employer}`, 'Успішно створений новий відгук', {closeButton: false})
            getWorkModalFeedback({id: id_employer, adding: true, p: 1, t: count, other, str: string})
        } else {
            throw new Error('Не можливо додати відгук')
        }

        return Promise.resolve('ok')
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }


}


export default addFeedback //to ../../../Components/FeedbackComponent