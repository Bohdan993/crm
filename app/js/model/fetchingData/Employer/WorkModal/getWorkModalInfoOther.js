import fetch from '../../fetchingDataClass'
import WorkModalManufacturyType from '../../../Components/Employer/WorkModal/WorkModalManufacturyType'
import WorkModalContactHistory from '../../../Components/Employer/WorkModal/WorkModalContactHistory'
import WorkModalVacancyHistory from '../../../Components/Employer/WorkModal/WorkModalVacancyHistory'
import WorkModalMedia from '../../../Components/Employer/WorkModal/WorkModalMedia'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}

const manufacturyType = document.querySelector('.row.manufactury-type')
const contactHistory = document.querySelector('.row.contacts-history')
const vacancyHistory = document.querySelector('.row.vacancies-history')
const media = document.querySelector('.row.media')

const loader = place(Loader)
const loader2 = place(Loader)
const loader3 = place(Loader)
const loader4 = place(Loader)


// const workModal = place(new WorkModal())
const workModalManufacturyType = new WorkModalManufacturyType()
const workModalContactHistory = new WorkModalContactHistory()
const workModalVacancyHistory = new WorkModalVacancyHistory()
const workModalMedia = new WorkModalMedia()



if(manufacturyType) {
	mount(manufacturyType, workModalManufacturyType)
	mount(manufacturyType, loader)
}

if(contactHistory) {
	mount(contactHistory, workModalContactHistory)
	mount(contactHistory, loader2)
}

if(vacancyHistory) {
	mount(vacancyHistory, workModalVacancyHistory)
	mount(vacancyHistory, loader3)
}

if(media) {
	mount(media, workModalMedia)
	mount(media, loader4)
}


// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }




const getWorkModalInfoOther = async (id = '1') => {

	if(manufacturyType && contactHistory && vacancyHistory && media) {
		loader.update(true)
		loader2.update(true)
		loader3.update(true)
		loader4.update(true)
		workModalManufacturyType.setHiddenClass().setEmptyLayer()
		workModalContactHistory.setHiddenClass().setEmptyLayer()
		workModalVacancyHistory.setHiddenClass().setEmptyLayer()
		workModalMedia.setHiddenClass().setEmptyLayer()
		// workModal.update(false)
	
	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}`)
			const otherPart = data.data.other
			console.log(otherPart)

			const production = otherPart.production
			const contact = otherPart.contact_history
			const vacancy = otherPart.vacancy_history
			const media = otherPart.media

			// if(state.id !== id) {
				workModalManufacturyType.update(production)
				workModalContactHistory.update(contact)
				workModalVacancyHistory.update(vacancy)
				workModalMedia.update(media)
			// }
			loader.update(false)
			loader2.update(false)
			loader3.update(false)
			loader4.update(false)

			workModalManufacturyType.removeHiddenClass()
			workModalContactHistory.removeHiddenClass()
			workModalVacancyHistory.removeHiddenClass()
			workModalMedia.removeHiddenClass()

			state.id = id
		}catch(e) {
			console.error(e)
		}
}

}


export default getWorkModalInfoOther 		//to ../../../Components/EmployersRow.js