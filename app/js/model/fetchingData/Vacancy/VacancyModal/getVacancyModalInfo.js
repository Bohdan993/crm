import fetch from '../../fetchingDataClass'

import Task from '../../../Components/TaskComponent'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/Loader'
import TermsComponent from '../../../Components/Vacancy/VacancyModal/TermsComponent'
import DemandComponent from '../../../Components/Vacancy/VacancyModal/DemandsComponent'
import {list, mount, place} from '../../../../../libs/libs'
import {demandsRow, termsRow} from '../../../../view'



const state = {}



const loader = place(Loader)
const loader2 = place(Loader)



const demand = new DemandComponent()
const terms = new TermsComponent()
const task = new Task('vacancy')
const note = new Note('vacancy')
const select = new ManagerSelect('vacancy')
const deleteComponent = new Delete('vacancy')




if(demandsRow) {
	mount(demandsRow, demand)
}

if(termsRow) {
	mount(termsRow, terms)
}

// if(sidebarEmployerForm) {
// 	mount(sidebarEmployerForm, task)
// 	mount(sidebarEmployerForm, loader2)
	
// }

// if(managerSelectWrap) {
// 	mount(managerSelectWrap, select)
// }

// if(workModalSidebarNotes) {
// 	mount(workModalSidebarNotes, note)
// }

// if(employerDelete) {
// 	mount(employerDelete, deleteComponent)
// }
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }



const getVacancyModalInfo = async (id = '1') => {

	// if(commonInfo) {
	// 	loader.update(true)
	// 	workModal.setHiddenClass()
	// }

	// if(sidebarEmployerForm) {
	// 	loader2.update(true)
	// }

try {
		const data = await fetch.getResourse(`/vacancies/get/?id=${id}&section=1`)
		console.log(data)
		// const sourseData = await fetch.getResourse('/employers/get_other/?s=5')

		const mainPart = data.data.main
		// const source = sourseData.data.source
		// source.unshift({id: 0, name: 'Отсутствует'})
		// const tasks = mainPart.task
		// const notes = mainPart.note
		// const id_login = mainPart.id_login
		// const date = mainPart.date
		// const badFeedback = mainPart.total_bad_feedback

		console.log(mainPart)

		const demandsData = {
			id,
			clients: mainPart.total_client,
			men: mainPart.total_man,
			women: mainPart.total_woman,
			languageSkill: mainPart.language_skill,
			workExp: mainPart.experience_work,
			specialReq: mainPart.special_requirement
		}


		const termsData = {
			id,
			startWork: mainPart.start_work,
			period: mainPart.period,
			salary: mainPart.salary,
			residency: mainPart.residency,
			feeding: mainPart.feeding,
			taxes: mainPart.tax,
			workResp: mainPart.responsibilities_work,
			workTime: mainPart.work_time
		}

		// const tasksData = {
		// 	tasks,
		// 	id
		// }

		// const notesData = {
		// 	notes,
		// 	id
		// }


		// const deleteData = {
		// 	date, 
		// 	id
		// }

			// mainPart.source = source

			demand.update(demandsData)
			terms.update(termsData)
		// task.update(tasksData)
		// select.update(id_login)
		// note.update(notesData)
		// deleteComponent.update(deleteData)

		// loader2.update(false)
		loader.update(false)


		sessionStorage.setItem('currVacancyName', JSON.stringify(mainPart.name))
		// sessionStorage.setItem('vacancyNegFeedback', JSON.stringify(badFeedback))

		state.id = id
	}catch(e) {
		console.error(e)
	}


}


export default getVacancyModalInfo 		//to ../Components/Vacancy/VacancyRow.js
