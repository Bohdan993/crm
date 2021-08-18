import fetch from '../../fetchingDataClass'
import getWorkModalMedia from './getWorkModalMedia'
import {toastr} from '../../../../../libs/libs'


const deleteMedia = async ({
                               idimg,
                               idemp,
                               w = 1000
                           }) => {
    try {
        const medias = await fetch.getResourse(`/employers/delete_media/?id=${idimg}`)

        if (medias.success === true) {
            toastr.success(`ID роботодавця ${idemp}`, 'Успішно видалена картинка', {closeButton: false})
            getWorkModalMedia({id: idemp, deleating: true, w})
        } else {
            throw new Error('Не можливо видалити картинку')
        }


    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
    }
}


export default deleteMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia