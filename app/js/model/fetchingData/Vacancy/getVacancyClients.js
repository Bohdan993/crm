import fetch from '../fetchingDataClass'
import {
    toastr
} from '../../../../libs/libs'
import {
    EmptyError
} from '../../helper'


const getVacancyClients = async (id, isNewVacancy) => {

    try {
        const data = await fetch.getResourse(`/vacancies/get_clients/?vacancy=${id}`)


        if (data.success === true) {
            const clients = data.data.client
            return clients
        }

        if (!isNewVacancy) {
            throw new EmptyError('В даній вакансії поки що немає клієнтів')
        }


    } catch (e) {

        if (e.name === 'EmptyError') {
            toastr.warning(e.message, 'Попередження', {
                closeButton: true
            })
        } else {
            toastr.error(e.message, 'Виникла помилка', {
                closeButton: true
            })
        }

        return false
    }


}


export default getVacancyClients