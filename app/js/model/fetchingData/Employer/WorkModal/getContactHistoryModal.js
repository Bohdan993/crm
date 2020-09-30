import fetch from '../../fetchingDataClass'
import ContactHistoryModal from '../../../Components/Employer/WorkModal/ContactHistoryModal'

import {list, mount, place} from '../../../../../libs/libs'

const state = {}

const contactHistory = document.querySelector('.contact-history-modal')


const contactHistoryModal = new ContactHistoryModal()




if(contactHistory) {
	mount(contactHistory, contactHistoryModal)
}





const getContactHistoryModal = async () => {

	if(contactHistory) {
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=1`)
			const otherPart = data.data.other
			// console.log(data2)
			const production = {id: id, data: otherPart.production }

			// if(state.id !== id) {
				workModalManufacturyType.update(production)
			// }

			if(loading) {
				loader.update(false)
				workModalManufacturyType.removeHiddenClass()
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}

}


export default getWorkModalManufacturyType 		//to ../../../Components/EmployersRow.js