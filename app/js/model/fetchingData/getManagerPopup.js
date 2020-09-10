import fetch from './fetchingDataClass'
import ManagerPopup from '../Components/ManagerPopup'
import {initSidebarTooltip} from '../initToottips'
import {managersTemplate} from '../../view'
import {list, mount} from '../../../libs/libs'

if(managersTemplate) {
		managersTemplate.style.display = 'block';
}



const popup = list("form", ManagerPopup)
mount(document.querySelector('#managers-popup'), popup)


const getManagerPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=1')
			const managers = data.data.managers
			popup.update(managers);
	} catch (e) {
		console.error(e)
	}

	initSidebarTooltip('.managers-filter-wrapper', managersTemplate)

}




export default getManagerPopup