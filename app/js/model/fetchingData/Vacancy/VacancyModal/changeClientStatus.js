import fetch from '../../fetchingDataClass'
import {toastr} from '../../../../../libs/libs'

const changeClientStatus = async ({
                                      id = '1',
                                      status = 1
                                  } = {}) => {


    try {
        const data = await fetch.getResourse(`/vacancies/set_status/?id=${id}&status=${status}`)
        if (data.success === true) {

        } else {
            throw new Error('Не можливо змінити статус клієнта')
        }

    } catch (e) {
        toastr.error(e.message, 'Помилка', {closeButton: false})
    }


}


export default changeClientStatus   	//to ../../../Components/VacancyRow.js