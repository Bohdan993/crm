import fetch from '../../fetchingDataClass'
import WorkModal from '../../../Components/Employer/WorkModal/WorkModal'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'
import {sidebarEmployerForm, workModalSidebarNotes, employerDelete} from '../../../../view'
import { feedbackEmp, feedbackVac } from './getWorkModalFeedback'
// import negativeFeedbackCountChange from '../../../CustomEvents/negativeFeedbackCountChange'
// import employerFeedbackNameChange from '../../../CustomEvents/employerFeedbackNameChange'

const state = {}

const commonInfo = document.querySelector('.row.common-info ')
const managerSelectWrap = sidebarEmployerForm ? sidebarEmployerForm.querySelector('.manager-select-wrap') : null

const loader = place(Loader)
// const loader2 = place(Loader)
// const workModal = place(new WorkModal())
const workModal = new WorkModal()


const note = new Note('employer')
const select = new ManagerSelect('employer')
const deleteComponent = new Delete('employer')

if(commonInfo) {
	mount(commonInfo, workModal);
	mount(commonInfo, loader)
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

	// if(sidebarEmployerForm) {
	// 	loader2.update(true)
	// }

try {
		const data = await fetch.getResourse(`/employers/get/?id=${id}&section=1`)
		// console.log(data)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')


		// console.log('data', data)

		// console.log('sourceData')

		const mainPart = data.data.main
		const source = sourseData.data.source
		source.unshift({id: 0, name: 'Отсутствует'})
		const notes = mainPart.note ? mainPart.note : ''
		const id_manager = mainPart.id_login
		const date = mainPart.date
		const badFeedback = mainPart.total_bad_feedback

		// negativeFeedbackCountChange.detail.count = String(badFeedback)
		// document.dispatchEvent(negativeFeedbackCountChange)
		// employerFeedbackNameChange.detail.name = String(mainPart.name)
		// document.dispatchEvent(employerFeedbackNameChange)

		// console.log(badFeedback)


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


		workModal.update(mainPart, feedbackEmp)
		select.update(managersData)
		note.update(notesData)
		deleteComponent.update(deleteData)

		// loader2.update(false)
		loader.update(false)
		workModal.removeHiddenClass()

		sessionStorage.setItem('currEmployerName', JSON.stringify(mainPart.name))
		sessionStorage.setItem('currActiveManagerId', JSON.stringify(id_manager))
		
		state.id = id

	}
	catch(e) {
		console.error(e)
	}


}


export default getWorkModalInfo 		//to ../Components/EmployersRow.js

