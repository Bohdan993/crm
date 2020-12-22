import fetch from '../../fetchingDataClass'
import WorkModal from '../../../Components/Employer/WorkModal/WorkModal'
import Task from '../../../Components/TaskComponent'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'
import {sidebarEmployerForm, workModalSidebarNotes, employerDelete} from '../../../../view'



const state = {}

const commonInfo = document.querySelector('.row.common-info ')
const managerSelectWrap = sidebarEmployerForm ? sidebarEmployerForm.querySelector('.manager-select-wrap') : null

const loader = place(Loader)
const loader2 = place(Loader)
// const workModal = place(new WorkModal())
const workModal = new WorkModal()


const task = new Task('employer')
const note = new Note('employer')
const select = new ManagerSelect('employer')
const deleteComponent = new Delete('employer')

if(commonInfo) {
	mount(commonInfo, workModal);
	mount(commonInfo, loader)
}

if(sidebarEmployerForm) {
	mount(sidebarEmployerForm, task)
	mount(sidebarEmployerForm, loader2)
	
}

if(managerSelectWrap) {
	mount(managerSelectWrap, select)
}

if(workModalSidebarNotes) {
	mount(workModalSidebarNotes, note)
}

if(employerDelete) {
	mount(employerDelete, deleteComponent)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }



const getWorkModalInfo = async (id = '1') => {

	if(commonInfo) {
		loader.update(true)
		workModal.setHiddenClass()
	}

	if(sidebarEmployerForm) {
		loader2.update(true)
	}

try {
		const data = await fetch.getResourse(`/employers/get/?id=${id}&section=1`)
		// console.log(data)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')

		const mainPart = data.data.main
		const source = sourseData.data.source
		source.unshift({id: 0, name: 'Отсутствует'})
		const tasks = mainPart.task
		const notes = mainPart.note ? mainPart.note : ''
		const id_manager = mainPart.id_login
		const date = mainPart.date
		const badFeedback = mainPart.total_bad_feedback


		// console.log(badFeedback)

		const tasksData = {
			tasks,
			id
		}

		const notesData = {
			notes,
			id
		}


		const deleteData = {
			date, 
			id
		}

		const managersData = {
			id_manager,
			id
		}

		mainPart.source = source


		workModal.update(mainPart)
		task.update(tasksData)
		select.update(managersData)
		note.update(notesData)
		deleteComponent.update(deleteData)

		loader2.update(false)
		loader.update(false)
		workModal.removeHiddenClass()

		sessionStorage.setItem('currEmployerName', JSON.stringify(mainPart.name))
		sessionStorage.setItem('employerNegFeedback', JSON.stringify(badFeedback))
		sessionStorage.setItem('currActiveManagerId', JSON.stringify(id_manager))
		
		state.id = id

	}
	catch(e) {
		console.error(e)
	}


}


export default getWorkModalInfo 		//to ../Components/EmployersRow.js
