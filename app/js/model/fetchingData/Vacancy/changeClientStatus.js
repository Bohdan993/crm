import fetch from '../fetchingDataClass'
import {toastr} from '../../../../libs/libs'


const changeClientStatus = async ({
                                      id = '',
                                      status = ''
                                  } = {}) => {

    try {
        const clients = await fetch.getResourse(`/vacancies/set_status/?id=${id}&status=${status}`)

        if (clients.success === true) {
            toastr.success(`ID клієнта ${id}`, 'Успішно змінений статус клієнта', {closeButton: false})
            return clients.client
        } else {
            throw new Error('Не можливо змінити статус')
        }
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return false
    }


}


export default changeClientStatus //to ../../../vacancy/switchRowStatuses