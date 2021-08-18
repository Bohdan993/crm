import fetch from '../../fetchingDataClass'
import getWorkModalManufacturyType from './getWorkModalManufacturyType'
import {toastr} from '../../../../../libs/libs'


const addManufacturyType = async (id) => {
    try {
        const production = await fetch.getResourse(`/employers/create_section/?id=${id}&target=production`)

        if (production.success === true) {
            toastr.success(`ID роботодавця ${id}`, 'Успішно створений тип виробництва', {closeButton: false})
            getWorkModalManufacturyType(id, false, true)
        } else {
            throw new Error('Не можливо створити тип виробництва')
        }

        return Promise.resolve('ok')
    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }
}


export default addManufacturyType //to ../../../Components/Employer/WorkModal/WorkModalManufacturyType