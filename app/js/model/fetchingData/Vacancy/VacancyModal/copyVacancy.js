import fetch from '../../fetchingDataClass'
import {toastr} from '../../../../../libs/libs'


const copyVacancy = async ({
                               vacancy = '',
                           } = {}) => {

    try {
        const data = await fetch.getResourse(`/vacancies/clone_vacancy/?id=${vacancy}`)
        if (data.success === true) {
            toastr.success(`ID вакансії ${data.id}`, 'Вакансія успішно скопійована', {closeButton: false})
        } else {
            throw new Error('Не вдалося створити копію вакансії')
        }

        return Promise.resolve(data.id)
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }


}


export default copyVacancy //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight