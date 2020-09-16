import fetch from './fetchingDataClass'
import IntermediariesPopup, { RadioGroup } from '../Components/Employer/IntermediariesPopup'
import {list, mount} from '../../../libs/libs'

// if(managersTemplate) {
// 		managersTemplate.style.display = 'block';
// }

const intermediariesPopup = document.querySelector('#intermediaries-popup form')



const popup = list("div", IntermediariesPopup, 'id')
const radioGroup = new RadioGroup()

if(intermediariesPopup) {
	mount(intermediariesPopup, radioGroup)
	mount(intermediariesPopup, popup)
}

const getIntermediariesPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=2')
			const intermediaries = data.data.intermediaries

			popup.update(intermediaries);
	} catch (e) {
		console.error(e)
	}

	// initSidebarTooltip('.managers-filter-wrapper', managersTemplate)

}




export default getIntermediariesPopup