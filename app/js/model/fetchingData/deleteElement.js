import fetch from './fetchingDataClass'
// import getWorkModalFeedback from './getWorkModalFeedback'
import { toastr } from '../../../libs/libs'
// import getEmployersList from './getEmployersList'



const deleteElement = async ({
	str,
	id
} = {}) => {

			try {
				const fields = await fetch.getResourse(`/${str}/delete/?id=${id}`)

				if(fields.success === true) {
					// str === 'employers' ? getEmployersList() : ''
					toastr.success(`ID ${str === 'employers' ? 'работодателя' : 'вакансии'} ${id}`, 'Успешно удалена запись', {closeButton: false})
				} else {
					throw new Error('Не возможно удалить запись')
				}

				return Promise.resolve('ok')
			} catch(e) {

				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}

}


export default deleteElement  //to ../../../Components/DeleteComponent

// import getVacancyList from './Vacancy/getVacancyList'