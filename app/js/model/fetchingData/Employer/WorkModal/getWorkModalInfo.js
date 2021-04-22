import fetch from '../../fetchingDataClass'
import WorkModal from '../../../Components/Employer/WorkModal/WorkModal'
import Note from '../../../Components/ModalSidebarNoteComponent'
import Delete from '../../../Components/DeleteComponent'
import WorkModalMailing from '../../../Components/Employer/WorkModal/WorkModalMailing'
import ManagerSelect from '../../../Components/ManagerSelectComponent'
import Loader from '../../../Components/Loader'
import WorkModalCreateVacancy from '../../../Components/Employer/WorkModal/WorkModalCreateVacancy'
import {list, mount, place} from '../../../../../libs/libs'
import {sidebarEmployerForm, 
	workModalSidebarNotes, 
	employerDelete, 
	sidebarMailingItem, 
	createVacancyItem,
	modalSwitchers,
	modalParts
} from '../../../../view'
import { feedbackEmp, feedbackVac } from './getWorkModalFeedback'
import { changeActiveClass } from '../../../switchModalParts'
// import negativeFeedbackCountChange from '../../../CustomEvents/negativeFeedbackCountChange'
// import employerFeedbackNameChange from '../../../CustomEvents/employerFeedbackNameChange'

const state = {}

const commonInfo = document.querySelector('.row.common-info ')
const managerSelectWrap = sidebarEmployerForm ? sidebarEmployerForm.querySelector('.manager-select-wrap') : null

const loader = place(Loader)
// const loader2 = place(Loader)
// const workModal = place(new WorkModal())
const workModal = new WorkModal()


const noteEl = new Note('employer')
const select = new ManagerSelect('employer')
const deleteComponent = new Delete('employer')
const mailingComponent = new WorkModalMailing()
const createVacancyComponent = new WorkModalCreateVacancy()

if(commonInfo) {
	mount(commonInfo, workModal);
	mount(commonInfo, loader)
}


if(managerSelectWrap) {
	mount(managerSelectWrap, select)
}

if(workModalSidebarNotes) {
	mount(workModalSidebarNotes, noteEl)
}

if(employerDelete) {
	mount(employerDelete, deleteComponent)
}

if(sidebarMailingItem) {
	mount(sidebarMailingItem, mailingComponent)
}


if(createVacancyItem) {
	mount(createVacancyItem, createVacancyComponent)
}


const getWorkModalInfo = async (id = '1') => {

	if(commonInfo) {
		loader.update(true)
		workModal.setHiddenClass()
	}

	changeActiveClass(modalSwitchers, modalParts, '#employer-data', '[data-part="employer-data"]')

try {
		const data = await fetch.getResourse(`/employers/get/?id=${id}&section=1`)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')



		const mainPart = data.data.main
		const source = sourseData.data.source
		source.unshift({id: 0, name: 'Отсутствует'})
		const note = mainPart.note ? mainPart.note : ''
		const id_manager = mainPart.id_login
		const date = mainPart.date
		const badFeedback = mainPart.total_bad_feedback
		const mailing = mainPart.mailing
		const lastIdVacancy = mainPart.last_id_vacancy



		const notesData = {
			note,
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

		const mailingData = {
			mailing,
			id
		}


		const createVacancyData = {
			lastIdVacancy,
			id
		}

		mainPart.source = source

		
		workModal.update(mainPart, feedbackEmp)
		select.update(managersData)
		noteEl.update(notesData)
		deleteComponent.update(deleteData)
		mailingComponent.update(mailingData)
		createVacancyComponent.update(createVacancyData)

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

