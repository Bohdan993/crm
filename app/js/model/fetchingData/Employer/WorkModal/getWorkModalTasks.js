import fetch from '../../fetchingDataClass'
import Task from '../../../Components/TaskComponent'

// import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'
import {sidebarEmployerForm, sidebarVacancyForm} from '../../../../view'



// const loader = place(Loader)

const task = new Task('employer')
const task2 = new Task('vacancy')


if(sidebarEmployerForm) {
	mount(sidebarEmployerForm, task)
}

if(sidebarVacancyForm) {
	mount(sidebarVacancyForm, task2)
}



const getWorkModalTasks = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing,
	deleating, 
	adding,
} = {}) => {

	// if(sidebarEmployerForm) {

		// if(loading) {
		// 	loader.update(true)
		// 	workModalContactHistory.setHiddenClass().setEmptyLayer()
		// }
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=6`)

			console.log('I am loaded', id)
			const tasks = data.data.other.task



			console.log('TASK LIST', tasks)

			const tasksData = {
				tasks,
				id
			}

			// if(globalID !== id) {
			// 	globalContacts = [
			// 		...otherPart.contact_history 
			// 	]
			// } else {

			// 	if(loading) {
			// 			globalContacts = [
			// 			...otherPart.contact_history 
			// 		]
			// 	}

			// 	if(showing) {
			// 			globalContacts = [
			// 			...globalContacts,
			// 			...otherPart.contact_history
			// 		]
			// 	}

			// 	if(deleating) {
			// 			globalContacts = [
			// 			...otherPart.contact_history 
			// 		]
			// 	}

			// 	if(adding) {
			// 			globalContacts = [
			// 			...otherPart.contact_history 
			// 		]
			// 	}
			// }


			// const contacts = {
			// 	id: id, 
			// 	data: otherPart.contact_history 
			// }

			if(sidebarEmployerForm) {
				task.update(tasksData)
			}


			if(sidebarVacancyForm) {
				task2.update(tasksData)
			}
			


		}catch(e) {
			console.error(e)
		}
// }	

}


export default getWorkModalTasks 		//to ../../../Components/EmployersRow.js