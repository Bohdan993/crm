import fetch from './fetchingDataClass'
import {
    toastr
} from '../../../libs/libs'


const deleteElement = async ({
                                 str,
                                 id
                             } = {}) => {

    try {
        const fields = await fetch.getResourse(`/${str}/delete/?id=${id}`)
        if (fields.success === true) {
            toastr.success(`ID ${str === 'employers' ? 'роботодавця' : 'вакансії'} ${id}`, 'Успішно видалений запис', {
                closeButton: false
            })
        } else {
            throw new Error('Не можливо видалити запис')
        }

        return Promise.resolve({
            status: 'ok',
            id
        })
    } catch (e) {

        toastr.error(e.message, 'Виникла помилка', {
            closeButton: true
        })
        return Promise.resolve({
            status: 'fail'
        })
    }

}


export default deleteElement //to ../../../Components/DeleteComponent