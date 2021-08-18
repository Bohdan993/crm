import fetch from '../../fetchingDataClass'
import {
    toastr
} from '../../../../../libs/libs'


const archiveVacancy = async ({
                                  vacancy = '',
                                  type = 0
                              } = {}) => {

    try {
        const data = await fetch.getResourse(`/vacancies/archive/?id=${vacancy}&type=${type}`)
        if (data.success === true) {
            toastr.success(`ID вакансії ${vacancy}`, `${type === 0 ? 'Вакансія успішно заархівована' : 'Вакансія' +
                ' успішно розархівована'}`, {
                closeButton: false
            })
        } else {
            throw new Error('Не вдалося заархівувати вакансію')
        }

        return Promise.resolve('ok')

    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {
            closeButton: true
        })
        return Promise.resolve('fail')
    }


}


export default archiveVacancy //to ../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft
//to ../../../Components/Vacancy/VacancyModal/ModalRowLayerRight