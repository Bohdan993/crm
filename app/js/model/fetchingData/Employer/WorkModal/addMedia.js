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

const addMedia = async (id, data) => {
			try {
				const medias = await fetch.postResourse(`/employers/upload_media/?id=${id}`, data, config)
				getWorkModalMedia(id, false)
				toastr.success(`ID работодателя ${id}`, 'Успешно загружена картинка', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default addMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia