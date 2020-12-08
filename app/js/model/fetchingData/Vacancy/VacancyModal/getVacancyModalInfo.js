import fetch from '../../fetchingDataClass'
import getVacancyClients from '../getVacancyClients'
import Task from '../../../Components/TaskComponent'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/Loader'
import ClientsComponent from '../../../Components/Vacancy/VacancyModal/ClientsComponent'
import TermsComponent from '../../../Components/Vacancy/VacancyModal/TermsComponent'
import DemandComponent from '../../../Components/Vacancy/VacancyModal/DemandsComponent'
import {list, mount, place} from '../../../../../libs/libs'
import {modalLayerRight, modalLayerLeft, demandsRow, termsRow, sidebarVacancyForm, vacancyModalSidebarNotes, clientsRow} from '../../../../view'
import storage from '../../../Storage'
import  ModalRowLayerLeft from '../../../Components/Vacancy/VacancyModal/ModalRowLayerLeft'
import  ModalRowLayerRight from '../../../Components/Vacancy/VacancyModal/ModalRowLayerRight'



const state = {}

const managerSelectWrap = sidebarVacancyForm ? sidebarVacancyForm.querySelector('.manager-select-wrap') : null

const loader = place(Loader)
const loader2 = place(Loader)



const demand = new DemandComponent()
const terms = new TermsComponent()
const task = new Task('vacancy')
const note = new Note('vacancy')
const select = new ManagerSelect('vacancy')
const deleteComponent = new Delete('vacancy')
const clients = new ClientsComponent()
const mrll = new ModalRowLayerLeft()
const mrlr = new ModalRowLayerRight()



if(demandsRow) {
	mount(demandsRow, demand)
}

if(termsRow) {
	mount(termsRow, terms)
}

if(managerSelectWrap) {
	mount(managerSelectWrap, select)
}

if(sidebarVacancyForm) {
	mount(sidebarVacancyForm, task)
	mount(sidebarVacancyForm, loader2)
	
}

if(clientsRow) {
	mount(clientsRow, clients)
}


if(vacancyModalSidebarNotes) {
	mount(vacancyModalSidebarNotes, note)
}

if(modalLayerLeft) {
	mount(modalLayerLeft, mrll)
}

if(modalLayerRight) {
	mount(modalLayerRight, mrlr)
	}

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
			if(storage.isSet(id)) {
				clients.update(storage.getState(id))
			} 


			// console.log(storage)

			if(!storage.isSet(id)) {
				getVacancyClients(id)
					.then(res => {
						if(res) {
							storage.setState(id, {id, data: res})
							clients.update({id, data: res})
						} else {
							storage.setState(id, {id, data: []})
							clients.update({id, data: []})
						}
					})
			}
		// console.log(data)
		// const sourseData = await fetch.getResourse('/employers/get_other/?s=5')

		const mainPart = data.data ? data.data.main : []
		// const source = sourseData.data.source
		// source.unshift({id: 0, name: 'Отсутствует'})
		const tasks = mainPart.task
		const notes = mainPart.employer ? mainPart.employer.note : ''
		const id_manager = mainPart.employer ? mainPart.employer.id_manager : '0'
		const employer = mainPart.employer ? mainPart.employer : {}
		const employerContext = mainPart.employer ? 'employer' : 'nulledEmployer'
		const id_employer = mainPart.id_employer
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


		const vacancyEmployerData = {
			id: mainPart.id_employer,
			data: mainPart.employer
		}

		const employerData = {
			idEmp: mainPart.id_employer,
			idVac: id,
			employer
		}

		const notesData = {
			notes,
			id: mainPart.id_employer
		}

		const managersData = {
			id_manager,
			id: id_employer
		}


		const tasksData = {
			tasks,
			id
		}

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
		mrll.update(employerData, employerContext)
		mrlr.update(employerData, employerContext)
		select.update(managersData)
		task.update(tasksData)
		note.update(notesData)
		// deleteComponent.update(deleteData)

		// loader2.update(false)
		loader.update(false)


		sessionStorage.setItem('currVacancyName', JSON.stringify(mainPart.name))
		// sessionStorage.setItem('vacancyNegFeedback', JSON.stringify(badFeedback))

		sessionStorage.setItem('currVacancyEmployer', JSON.stringify(vacancyEmployerData))

		state.id = id
	}catch(e) {
		console.error(e)
	}


}


export default getVacancyModalInfo 		//to ../Components/Vacancy/VacancyRow.js
