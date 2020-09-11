import fetch from './fetchingDataClass'
import getEmployersList from './getEmployersList'
import { sidebarEmployer } from '../../view'
import { toastr }from '../../../libs/libs'
import employerListUpdateEvent from '../CustomEvents/EmployerListUpdateEvent'



const addNewEmployer = () => {
		if(sidebarEmployer) {


		sidebarEmployer.addEventListener('click', async function(){
			try {
				const employer = await fetch.getResourse('/employers/create')
				const data = await getEmployersList()
				// console.log(data)

				employerListUpdateEvent.detail.id = data.id_employer
				document.dispatchEvent(employerListUpdateEvent)


				toastr.success(`ID работодателя ${employer.id}`, 'Успешно создан работодатель')
			} catch(e) {
				console.error(e)
			}

		

      
		})
	}
}


export default addNewEmployer