import fetch from '../../fetchingDataClass'
import {toastr} from '../../../../../libs/libs'
// import getVacancyList from '../getVacancyList'


const addClientToVacancy = async ({
                                      vacancy = '',
                                      client = ''
                                  } = {}) => {

    try {
        const clients = await fetch.getResourse(`/vacancies/set_client/?vacancy=${vacancy}&client=${client}`)
        if (clients.success === true) {
            // getVacancyList()
            toastr.success(`ID вакансії ${vacancy}`, 'Успішно створений новий клієнт', {closeButton: false})
        } else {
            throw new Error('Не можливо створити клієнта')
        }

        return Promise.resolve(clients.client)
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }


}


export default addClientToVacancy //to ../../../Components/Vacancy/VacancyModal/ClientsComponent