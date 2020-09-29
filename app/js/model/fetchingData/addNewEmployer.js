import fetch from './fetchingDataClass'
import getEmployersList from './getEmployersList'
import { sidebarEmployer } from '../../view'
import { toastr }from '../../../libs/libs'
import employerListAddEvent from '../CustomEvents/EmployerListAddEvent'



const addNewEmployer = () => {
		if(sidebarEmployer) {


		sidebarEmployer.addEventListener('click', async function(){
			try {
				const employer = await fetch.getResourse('/employers/create')
				getEmployersList()
				// console.log(employer)
				// console.log(data)

				employerListAddEvent.detail.id = String(employer.id)
				document.dispatchEvent(employerListAddEvent)


				toastr.success(`ID работодателя ${employer.id}`, 'Успешно создан работодатель', {closeButton: false})
			} catch(e) {
				console.error(e)
			}

		

      
		})
	}
}


export default addNewEmployer