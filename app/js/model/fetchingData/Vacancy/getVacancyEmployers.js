import fetch from '../fetchingDataClass'
import {
    toastr
} from '../../../../libs/libs'


const getVacancyEmployers = async () => {
    // if(true) {
    try {
        const data = await fetch.getResourse('/vacancies/get_other/?s=7')

        if (data.success === true) {
            let employers = data.data.employer
            localStorage.setItem('employersVacancy', JSON.stringify(employers))
        } else {
            throw new Erroe('Не можливо завантажити список роботодавців')
        }

    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {
            closeButton: true
        })
    }
    // }
}

export default getVacancyEmployers // to ../../index.js