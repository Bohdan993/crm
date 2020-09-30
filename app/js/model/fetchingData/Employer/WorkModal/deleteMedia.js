import fetch from '../../fetchingDataClass'
import getWorkModalMedia from './getWorkModalMedia'
import { toastr } from '../../../../../libs/libs'


const deleteMedia = async (idimg, idemp, count) => {
			try {
        console.log(count)
				const medias = await fetch.getResourse(`/employers/delete_media/?id=${idimg}`)
				getWorkModalMedia({id: idemp, p: 1, t: count, deleating: true})
				toastr.success(`ID работодателя ${idemp}`, 'Успешно удалена картинка', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default deleteMedia //to ../../../Components/Employer/WorkModal/WorkModalMedia