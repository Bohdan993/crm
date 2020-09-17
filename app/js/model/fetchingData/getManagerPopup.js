import fetch from './fetchingDataClass'
import ManagerPopup from '../Components/Employer/ManagerPopup'
import {list, mount} from '../../../libs/libs'

const managersPopup = document.querySelector('#managers-popup')
const popup = list("form", ManagerPopup, 'id')
if(managersPopup) {

	mount(document.querySelector('#managers-popup'), popup)
}
const getManagerPopup = async () => {
if(managersPopup) {
		try {
				const data = await fetch.getResourse('/employers/get_other/?s=1')
				const managers = data.data.managers

				popup.update(managers);
		} catch (e) {
			console.error(e)
		}
	}

}




export default getManagerPopup