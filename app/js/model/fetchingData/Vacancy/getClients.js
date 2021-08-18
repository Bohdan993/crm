import fetch from '../fetchingDataClass'
import {toastr} from '../../../../libs/libs'

const getClientsVacancy = async () => {
    // if(true) {
    try {
        const data = await fetch.getResourse('/vacancies/get_other/?s=4')

        if (data.success === true) {
            let clients = data.data.client
            localStorage.setItem('clientsVacancy', JSON.stringify(clients))
        } else {
            throw new Erroe('Не можливо завантажити список клієнтів')
        }
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
    }
    // }
}

export default getClientsVacancy // to ../../index.js