import fetch from '../../fetchingDataClass'
import getWorkModalFeedback from './getWorkModalFeedback'
import {toastr} from '../../../../../libs/libs'


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

        if (feedbacks.success === true) {
            toastr.success(`ID роботодавця ${id_employer}`, 'Успішно видалений відгук', {closeButton: false})
            getWorkModalFeedback({id: id_employer, p: 1, t: count, deleating: true, other, str: string})
        } else {
            throw new Error('Не можливо видалити відгук')
        }

        return Promise.resolve('ok')
    } catch (e) {
        toastr.error(e, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }
}


export default deleteFeedback //to ../../../Components/Employer/WorkModal/ContactHistoryModal