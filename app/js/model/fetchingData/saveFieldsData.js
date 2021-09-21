import fetch from './fetchingDataClass'
import {toastr} from '../../../libs/libs'


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

        if (fields.success === true) {
            toastr.success(`ID ${str === 'employers' ? 'роботодавця' : target === 'employer' ? 'роботодавця' : 'вакансії'} ${id}`, 'Успішно збережене поле', {closeButton: false})
        } else {
            throw new Error('Не можливо зберегти значення поля')
        }

        return Promise.resolve('ok')

    } catch (e) {
        toastr.error(e.message)
        return Promise.resolve('fail')
    }

}


export default saveFieldsData //to ../../../Components/Employer/WorkModal/WorkModal
//to ../../../Components/Vacancy/VacancyModal/DemandsComponent
//to ../../../Components/Vacancy/VacancyModal/TermsComponent
//to ../../../Components/TaskComponent
//to ../../../Components/ModalSidebarNoteComponent