import fetch from '../../fetchingDataClass'
import getWorkModalMedia, { workModalMedia } from './getWorkModalMedia'
import { toastr } from '../../../../../libs/libs'

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



const addMedia = async (id, data, count, total = 1) => {
			console.log(count)
			try {
				const medias = await fetch.postResourse(`/employers/upload_media/?id=${id}`, data, config)

				if(medias.success === true) {
					toastr.success(`ID работодателя ${id}`, 'Успешно загружена картинка', {closeButton: false})
					getWorkModalMedia({id, adding: true, p: 1, t: count})
				} else {
					throw new Error('Не возможно загрузить картинку')
				}
				workModalMedia.progress.update(false)
				
				
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}
}


export default addMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia