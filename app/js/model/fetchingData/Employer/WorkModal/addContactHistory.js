import fetch from '../../fetchingDataClass'
import getWorkModalContactHistory from './getWorkModalContactHistory'
import {toastr} from '../../../../../libs/libs'


const addContactHistory = async ({
                                     id_contact,
                                     message,
                                     date,
                                     type_arrow,
                                     id_login,
                                     id_type,
                                     id_employer,
                                     count
                                 } = {}) => {

    try {

        if (id_login === '0') {
            throw new Error('Потрібно вибрати менеджера')
        }
        if (id_type === '0') {
            throw new Error('Потрібно вибрати тип контакту')
        }

        if (message === '') {
            throw new Error('Зміст не повинен бути пустим')
        }

        const contacts = await fetch.getResourse(`/employers/contact/?id_contact=${id_contact}&message=${message}&date=${date}&type_arrow=${type_arrow}&id_login=${id_login}&id_type=${id_type}&id_employer=${id_employer}`)

        if (contacts.success === true) {
            toastr.success(`ID роботодавця ${id_employer}`, 'Успішно створений контакт', {closeButton: false})
            getWorkModalContactHistory({id: id_employer, adding: true, p: 1, t: count})
        } else {
            throw new Error('Не можливо створити контакт')
        }

        return Promise.resolve('ok')
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }


}


export default addContactHistory //to ../../../Components/Employer/WorkModal/ContactHistoryModal