import fetch from './fetchingDataClass'
// import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../libs/libs'


const saveFieldsData = async ({
	str,
	id,
	value, 
	field, 
	target, 
	id_target
} = {}) => {
			try {
				const fields = await fetch.getResourse(`/${str}/save/?id=${id}&value=${value}&field=${field}&target=${target}&id_target=${id_target}`)
				console.log(fields)
				toastr.success(`ID ${str === 'employers' ? 'работодателя' : 'вакансии'} ${id}`, 'Успешно сохранено поле', {closeButton: false})
			} catch(e) {
				toastr.error(e.message)
			}

}


export default saveFieldsData //to ../../../Components/Employer/WorkModal/WorkModal
															//to ../../../Components/Vacancy/VacancyModal/DemandsComponent
															//to ../../../Components/Vacancy/VacancyModal/TermsComponent
															//to ../../../Components/TaskComponent
															//to ../../../Components/ModalSidebarNoteComponent