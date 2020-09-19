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
				const data = await getEmployersList()
				// console.log(data)

				employerListAddEvent.detail.id = data.id_employer
				document.dispatchEvent(employerListAddEvent)


				toastr.success(`ID работодателя ${employer.id}`, 'Успешно создан работодатель', {closeButton: false})
			} catch(e) {
				console.error(e)
			}

		

      
		})
	}
}


export default addNewEmployer