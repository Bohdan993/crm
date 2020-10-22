import fetch from '../fetchingDataClass'
// import WorkModal from '../Components/Employer/WorkModal/WorkModal'
// import Task from '../Components/TaskComponent.js'
import Loader from '../../Components/Employer/Loader'
import {list, mount, place} from '../../../../libs/libs'
// import {sidebarEmployerForm} from '../../../view'

const state = {}

// const commonInfo = document.querySelector('.row.common-info ')

// const loader = place(Loader)
// const loader2 = place(Loader)
// // const workModal = place(new WorkModal())
// const workModal = new WorkModal()
// const task = new Task('employer')


// if(commonInfo) {
// 	mount(commonInfo, workModal);
// 	mount(commonInfo, loader)
// }

// if(sidebarEmployerForm) {
// 	mount(sidebarEmployerForm, task)
// 	mount(sidebarEmployerForm, loader2)
// }
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }



const getVacancyModalInfo = async (id = '1') => {

	if(commonInfo) {
		loader.update(true)
		workModal.setHiddenClass()
	}

	if(sidebarEmployerForm) {
		loader2.update(true)
	}

try {
		const data = await fetch.getResourse(`/vacancies/get/?id=${id}&section=1`)
		console.log(data)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')
		// console.log(data.data.main.name)
		const mainPart = data.data.main
		const source = sourseData.data.source
		const tasks = mainPart.task

		const tasksData = {
			tasks,
			id
		}

		mainPart.source = source
		// if(state.id !== id) {
			workModal.update(mainPart)
			task.update(tasksData)
		// }
		loader2.update(false)
		loader.update(false)
		workModal.removeHiddenClass()

		sessionStorage.setItem('currEmployerName', JSON.stringify(data.data.main.name))

		state.id = id
	}catch(e) {
		console.error(e)
	}


}


export default getVacancyModalInfo 		//to ../../Components/Vacancy/VacancyRow.js