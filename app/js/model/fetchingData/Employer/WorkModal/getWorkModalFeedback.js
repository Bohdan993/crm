import fetch from '../../fetchingDataClass'
import Feedback from '../../../Components/FeedbackComponent'

import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'

// const state = {}
let globalFeedback = []
let globalID = ''



const feedbackEmployer = document.querySelector('.row.feedback-employer')
const feedbackVacancy = document.querySelector('.row.feedback-vacancy')


const loader = place(Loader)
const loader2 = place(Loader)



const feedbackEmp = new Feedback('employer')
const feedbackVac = new Feedback('vacancy')
const nulledFeedbackData = {
			id: 0, 
			badFeedback: 0,
			data: [], 
			total: 0, 
			loading: true, 
			deleating: false, 
			adding: false, 
			showing: false
		}




if(feedbackEmployer) {
	mount(feedbackEmployer, feedbackEmp)
	mount(feedbackEmployer, loader)
}


if(feedbackVacancy) {
	mount(feedbackVacancy, feedbackVac)
	mount(feedbackVacancy, loader2)
}





const getWorkModalFeedback = async ({
	id = '1', 
	p = 1, 
	t = 5,
	loading,
	showing,
	deleating, 
	adding,
	str = '',
	other = ''
} = {}) => {

	if(feedbackEmployer) {

		if(loading) {
			loader.update(true)
			feedbackEmp.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/${str}/get/?id=${id}&section=2&other=${other}&p=${p}&t=${t}`)
			const otherPart = data.data.other
			console.log(otherPart)
			console.log(data)

			if(globalID !== id) {
				globalFeedback = [
					...otherPart.feedback 
				]
			} else {

				if(loading || deleating || adding) {
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

				// if(deleating) {
				// 		globalFeedback = [
				// 		...otherPart.feedback 
				// 	]
				// }

				// if(adding) {
				// 		globalFeedback = [
				// 		...otherPart.feedback 
				// 	]
				// }
			}


			const feedbackData = {
				id: id, 
				badFeedback: data.data.total !== undefined ? data.data.total.total_bad_feedback : 0,
				data: globalFeedback, 
				total: data.data.total !== undefined ? data.data.total.feedback : otherPart.feedback.length, 
				loading, 
				deleating, 
				adding, 
				showing
			}

			// console.log(JSON.parse(sessionStorage.getItem('employerNegFeedback')))

			// if(state.id !== id) {
				feedbackEmp.update(feedbackData)
			// }

			if(loading) {
				loader.update(false)
				feedbackEmp.removeHiddenClass()
			}
			
			// state.id = id
		}catch(e) {
			console.error(e)
		}
}	

if(feedbackVacancy) {
			if(loading) {
			loader2.update(true)
			feedbackVac.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/${str}/get/?id=${id}&section=2&other=${other}&p=${p}&t=${t}`)
			console.log(str, id, other, p,)


			if(data.data) {


			const otherPart = data.data.other
			console.log(otherPart)
			console.log(data)

			if(globalID !== id) {
				globalFeedback = [
					...otherPart.feedback 
				]
			} else {

				if(loading || deleating || adding) {
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

				// if(deleating) {
				// 		globalFeedback = [
				// 		...otherPart.feedback 
				// 	]
				// }

				// if(adding) {
				// 		globalFeedback = [
				// 		...otherPart.feedback 
				// 	]
				// }
			}



			const feedbackData = {
				id: id, 
				badFeedback: data.data.total !== undefined ? data.data.total.total_bad_feedback : 0,
				data: globalFeedback, 
				total: data.data.total !== undefined ? data.data.total.feedback : otherPart.feedback.length, 
				loading, 
				deleating, 
				adding, 
				showing
			}

				feedbackVac.update(feedbackData)
			} else {
				feedbackVac.update(nulledFeedbackData)
			}


			


			if(loading) {
				loader2.update(false)
				feedbackVac.removeHiddenClass()
			}
			
		}catch(e) {
			console.error(e)
		}
}

	globalID = id

}


export default getWorkModalFeedback 		//to ../../../Components/EmployersRow.js

export {
	feedbackEmp,
	feedbackVac
}