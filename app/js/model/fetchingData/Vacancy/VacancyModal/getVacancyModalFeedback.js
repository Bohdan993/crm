import fetch from '../../fetchingDataClass'
import Feedback from '../../../Components/FeedbackComponent'

import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'

// const state = {}
let globalFeedback = []
let globalID = ''
const feedbackVacancy = document.querySelector('.row.feedback-vacancy')


const loader = place(Loader)
console.log(Feedback)
const feedback = new Feedback('vacancy')
const feedback2 = new Feedback('employer')





if(feedbackVacancy) {
	mount(feedbackVacancy, feedback)
	mount(feedbackVacancy, loader)
}





const getVacancyModalFeedback = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing,
	deleating, 
	adding,
} = {}) => {
	console.log(id)
	if(feedbackVacancy) {

		if(loading) {
			loader.update(true)
			feedback.setHiddenClass().setEmptyLayer()
		}
		
			

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/vacancies/get/?id=${id}&section=2&other=1&p=${p}&t=${t}`)
			const otherPart = data.data.other
			// console.log(otherPart)
			// console.log(data)

			if(globalID !== id) {
				globalFeedback = [
					...otherPart.feedback 
				]
			} else {

				if(loading) {
						globalFeedback = [
						...otherPart.feedback 
					]
				}

				if(showing) {
						globalFeedback = [
						...globalFeedback,
						...otherPart.feedback
					]
				}

				if(deleating) {
						globalFeedback = [
						...otherPart.feedback 
					]
				}

				if(adding) {
						globalFeedback = [
						...otherPart.feedback 
					]
				}
			}


			// const feedbackData = {
			// 	id: id, 
			// 	data: otherPart.feedback 
			// }

			const feedbackData = {
				id: id, 
				// badFeedback: JSON.parse(sessionStorage.getItem('employerNegFeedback')),
				data: globalFeedback, 
				total: data.data.total !== undefined ? data.data.total.feedback : otherPart.feedback.length, 
				loading, 
				deleating, 
				adding, 
				showing
			}

			// console.log(JSON.parse(sessionStorage.getItem('employerNegFeedback')))

			// if(state.id !== id) {
				feedback.update(feedbackData)
			// }

			if(loading) {
				loader.update(false)
				feedback.removeHiddenClass()
			}
			
			// state.id = id
		}
		catch(e) {
			console.error(e)
		}
}	

	globalID = id

}


export default getVacancyModalFeedback   	//to ../../../Components/VacancyRow.js