import fetch from '../../fetchingDataClass'
import WorkModalContactHistory from '../../../Components/Employer/WorkModal/WorkModalContactHistory'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}
let globalContacts = []
let globalID = ''
const contactHistory = document.querySelector('.row.contacts-history')


const loader = place(Loader)




const workModalContactHistory = new WorkModalContactHistory()





if(contactHistory) {
	mount(contactHistory, workModalContactHistory)
	mount(contactHistory, loader)
}





const getWorkModalContactHistory = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing,
	deleating, 
	adding,
} = {}) => {

	if(contactHistory) {

		if(loading) {
			loader.update(true)
			workModalContactHistory.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=2&p=${p}&t=${t}`)
			const otherPart = data.data.other
			// console.log(otherPart)
			// console.log(data2)

			if(globalID !== id) {
				globalContacts = [
					...otherPart.contact_history 
				]
			} else {

				if(loading) {
						globalContacts = [
						...otherPart.contact_history 
					]
				}

				if(showing) {
						globalContacts = [
						...globalContacts,
						...otherPart.contact_history
					]
				}

				if(deleating) {
						globalContacts = [
						...otherPart.contact_history 
					]
				}

				if(adding) {
						globalContacts = [
						...otherPart.contact_history 
					]
				}
			}


			// const contacts = {
			// 	id: id, 
			// 	data: otherPart.contact_history 
			// }

			const contacts = {
				id: id, 
				data: globalContacts, 
				total: data.data.total !== undefined ? data.data.total.contact_history : otherPart.contact_history.length, 
				loading, 
				deleating, 
				adding, 
				showing
			}

			// if(state.id !== id) {
				workModalContactHistory.update(contacts)
			// }

			if(loading) {
				loader.update(false)
				workModalContactHistory.removeHiddenClass()
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}	

	globalID = id

}


export default getWorkModalContactHistory 		//to ../../../Components/EmployersRow.js