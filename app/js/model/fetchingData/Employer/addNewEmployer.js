import fetch from '../fetchingDataClass'
import getEmployersList from '../getEmployersList'
import { sidebarEmployer } from '../../../view'
import { toastr }from '../../../../libs/libs'
import employerListAddEvent from '../../CustomEvents/EmployerListAddEvent'



const addNewEmployer = () => {
		if(sidebarEmployer) {


		sidebarEmployer.addEventListener('click', async function(){
	
			try {
				const employer = await fetch.getResourse('/employers/create')

				if(employer.success === true) {
					toastr.success(`ID работодателя ${employer.id}`, 'Успешно создан работодатель', {closeButton: false})
					getEmployersList()
				} else {
					throw new Error('Не возможно cоздать работодателя')
				}

				employerListAddEvent.detail.id = String(employer.id)
				document.dispatchEvent(employerListAddEvent)

			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
			}

		})
	}
}


export default addNewEmployer