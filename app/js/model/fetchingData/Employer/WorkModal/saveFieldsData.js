import fetch from '../../fetchingDataClass'
// import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../../../libs/libs'


const saveFieldsData = async ({
	id,
	value, 
	field, 
	target, 
	id_target
} = {}) => {
			// console.log(id_employer, message)
			try {
				const fields = await fetch.getResourse(`/employers/save/?id=${id}&value=${value}&field=${field}&target=${target}&id_target=${id_target}`)

				toastr.success(`ID работодателя ${id}`, 'Успешно сохранено поле', {closeButton: false})
			} catch(e) {
				toastr.error(e.message)
			}

}


export default saveFieldsData //to ../../../Components/Employer/WorkModal/WorkModal