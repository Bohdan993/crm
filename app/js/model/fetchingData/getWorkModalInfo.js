import fetch from './fetchingDataClass'
import WorkModal from '../Components/Employer/WorkModal/WorkModal'
import Task from '../Components/TaskComponent'
import Note from '../Components/ModalSidebarNoteComponent'
import ManagerSelect from '../Components/ManagerSelectComponent'
import Loader from '../Components/Employer/Loader'
import {list, mount, place} from '../../../libs/libs'
import {sidebarEmployerForm, workModalSidebarNotes} from '../../view'



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
		const data = await fetch.getResourse(`/employers/get/?id=${id}`)
		console.log(data)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')

		const mainPart = data.data.main
		const source = sourseData.data.source
		source.unshift({id: 0, name: 'Отсутствует'})
		const tasks = mainPart.task
		const notes = mainPart.note
		const id_login = mainPart.id_login

		const tasksData = {
			tasks,
			id
		}

		const notesData = {
			notes,
			id
		}

			mainPart.source = source
		// if(state.id !== id) {
			workModal.update(mainPart)
			task.update(tasksData)
			select.update(id_login)
			note.update(notesData)
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


export default getWorkModalInfo 		//to ../Components/EmployersRow.js