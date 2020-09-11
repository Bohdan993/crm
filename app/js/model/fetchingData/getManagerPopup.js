import fetch from './fetchingDataClass'
import ManagerPopup from '../Components/ManagerPopup'
import {list, mount} from '../../../libs/libs'




const popup = list("form", ManagerPopup, 'id')
mount(document.querySelector('#managers-popup'), popup)


const getManagerPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=1')
			const managers = data.data.managers
			popup.update(managers);
	} catch (e) {
		console.error(e)
	}


}




export default getManagerPopup