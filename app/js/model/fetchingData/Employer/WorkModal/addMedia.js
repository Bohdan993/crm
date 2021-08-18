import fetch from '../../fetchingDataClass'
import getWorkModalMedia, {workModalMedia} from './getWorkModalMedia'
import {toastr} from '../../../../../libs/libs'

const config = {
    onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        workModalMedia.progress.update(true)
        workModalMedia.progress.el
            .querySelector(
                ".progress-bar__fill"
            ).style.width = `${percentCompleted}%`;
    }
}


const addMedia = async ({
                            id,
                            data,
                            w = 1000
                        }) => {
    try {
        const medias = await fetch.postResourse(`/employers/upload_media/?id=${id}`, data, config)

        if (medias.success === true) {
            toastr.success(`ID роботодавця ${id}`, 'Успішно завантажене зображення', {closeButton: false})
            getWorkModalMedia({id, adding: true, w})

        } else {
            throw new Error('Не можливо завантажити картинку')
        }

        workModalMedia.progress.update(false)
        return Promise.resolve('ok')

    } catch (e) {
        toastr.error(e.message, 'Виникла помилка', {closeButton: true})
        return Promise.resolve('fail')
    }
}


export default addMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia