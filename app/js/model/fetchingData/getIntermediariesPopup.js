import fetch from './fetchingDataClass'
import {initSidebarTooltip} from '../initToottips'
// import {managersTemplate} from '../../view'
import {list, mount, el, setAttr, svg, place, setChildren} from '../../../libs/libs'

// if(managersTemplate) {
// 		managersTemplate.style.display = 'block';
// }





// const popup = list("form", ManagerPopup)
// mount(document.querySelector('#managers-popup'), popup)


const getIntermediariesPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=2')
			const intermediaries = data.data.intermediaries

			console.log(intermediaries)

			// popup.update(managers);
	} catch (e) {
		console.error(e)
	}

	// initSidebarTooltip('.managers-filter-wrapper', managersTemplate)

}




export default getIntermediariesPopup