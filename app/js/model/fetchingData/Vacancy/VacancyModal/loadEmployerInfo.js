import fetch from '../../fetchingDataClass'
import {
    toastr
} from '../../../../../libs/libs'


const loadEmployerInfo = async ({
                                    vacancy = '',
                                    employer = '',
                                    t = 4
                                } = {}) => {

    try {
        const employers = await fetch.getResourse(`/vacancies/change_employer/?vacancy=${vacancy}&employer=${employer}&t=${t}`)
        if (employers.success === true) {
            const data = {
                id: employer,
                data: employers.data
            }
            sessionStorage.setItem('currVacancyEmployer', JSON.stringify(data))
            toastr.success(`ID вакансії ${vacancy}`, 'Дані про роботодавця успішно завантажені', {
                closeButton: false
            })
        } else {
            throw new Error('Не можливо завантажити інформацію про роботодавця')
        }

        return Promise.resolve(employers.data)
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {
            closeButton: true
        })
        return Promise.resolve('fail')
    }


}


export default loadEmployerInfo //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight