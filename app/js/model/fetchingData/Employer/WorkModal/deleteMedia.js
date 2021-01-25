import fetch from '../../fetchingDataClass'
import getWorkModalMedia from './getWorkModalMedia'
import { toastr } from '../../../../../libs/libs'


const deleteMedia = async ({
	idimg, 
	idemp, 
	w = 1000
}) => {
			try {
				const medias = await fetch.getResourse(`/employers/delete_media/?id=${idimg}`)

				if(medias.success === true) {
					toastr.success(`ID работодателя ${idemp}`, 'Успешно удалена картинка', {closeButton: false})
					getWorkModalMedia({id: idemp, deleating: true, w})
				} else {
					throw new Error('Не возможно удалить картинку')
				}


			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}
}


export default deleteMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia