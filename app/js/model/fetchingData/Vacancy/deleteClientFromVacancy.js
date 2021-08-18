import fetch from '../fetchingDataClass'
import {toastr} from '../../../../libs/libs'


const deleteClientFromVacancy = async ({
                                           id = ''
                                       } = {}) => {

    try {
        const clients = await fetch.getResourse(`/vacancies/delete_client/?id=${id}`)
        if (clients.success === true) {
            toastr.success(`ID клієнта ${id}`, 'Успішно видалений клієнт', {closeButton: false})
        } else {
            throw new Error('Не можливо видалити клієнта')
        }

        return Promise.resolve('ok')
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }


}


export default deleteClientFromVacancy //to ../../../vacancy/switchRowStatuses