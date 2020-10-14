import fetch from '../../fetchingDataClass'
import Feedback from '../../../Components/FeedbackComponent'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

// const state = {}
let globalFeedback = []
let globalID = ''
const feedbackEmployer = document.querySelector('.row.feedback-employer')


const loader = place(Loader)




const feedback = new Feedback('employer')





if(feedbackEmployer) {
	mount(feedbackEmployer, feedback)
	mount(feedbackEmployer, loader)
}





const getWorkModalFeedback = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing,
	deleating, 
	adding,
} = {}) => {

	if(feedbackEmployer) {

		if(loading) {
			loader.update(true)
			feedback.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=5&p=${p}&t=${t}`)
			const otherPart = data.data.other
			console.log(otherPart)
			console.log(data)

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
				data: globalFeedback, 
				total: data.data.total !== undefined ? data.data.total.feedback : otherPart.feedback.length, 
				loading, 
				deleating, 
				adding, 
				showing
			}

			// if(state.id !== id) {
				feedback.update(feedbackData)
			// }

			if(loading) {
				loader.update(false)
				feedback.removeHiddenClass()
			}
			
			// state.id = id
		}catch(e) {
			console.error(e)
		}
}	

	globalID = id

}


export default getWorkModalFeedback 		//to ../../../Components/EmployersRow.js