import fetch from './fetchingDataClass'
import IntermediariesPopup, { RadioGroup } from '../Components/Employer/IntermediariesPopup'
import {list, mount} from '../../../libs/libs'

// if(managersTemplate) {
// 		managersTemplate.style.display = 'block';
// }

const intermediariesPopup = document.querySelector('#intermediaries-popup form')


let radioGroupData = [{
	id: '1',
	label: 'Показать',
	'data-id': 'show-rbtn'
},{
	id: '0',
	label: 'Исключить',
	'data-id': 'remove-rbtn'
}]


const popup = list("div", IntermediariesPopup, 'id')
const radioGroup = list(".input-group.radio-group-type-1", RadioGroup, 'id')

if(intermediariesPopup) {
	mount(intermediariesPopup, radioGroup)
	mount(intermediariesPopup, popup)
}

const getIntermediariesPopup = async () => {
if(intermediariesPopup) {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=2')
			let intermediaries = data.data.intermediaries
			// console.log(intermediaries)

			

			if(sessionStorage.getItem('intermediariesFilter')) { 
						intermediaries = intermediaries.map(intermediary => {
						let checked = !!~JSON.parse(sessionStorage.getItem('intermediariesFilter')).split(',').indexOf(intermediary.id)
						return {
							id: intermediary.id,
							name: intermediary.name,
							checked
						}
					})
				} else {
					intermediaries = intermediaries.map(intermediary=> {
						return {
							id: intermediary.id,
							name: intermediary.name,
						}
					})
				}

				

				if(sessionStorage.getItem('intermediaryFilter')) { 
						radioGroupData = radioGroupData.map(data => {
						let checked = JSON.parse(sessionStorage.getItem('intermediaryFilter')) === data.id
						return {
							id: data.id,
							label: data.label,
							'data-id': data['data-id'],
							checked
						}
					})
				} else {
					radioGroupData = radioGroupData.map(data=> {
						return {
							id: data.id,
							label: data.label,
							'data-id': data['data-id'],
						}
					})
				}

			localStorage.setItem('intermediaries', JSON.stringify(intermediaries))

			popup.update(intermediaries)
			radioGroup.update(radioGroupData)
	} catch (e) {
		console.error(e)
	}

}
}




export default getIntermediariesPopup