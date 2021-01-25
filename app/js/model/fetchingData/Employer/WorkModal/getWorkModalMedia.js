import fetch from '../../fetchingDataClass'
import WorkModalMedia from '../../../Components/Employer/WorkModal/WorkModalMedia'

import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}
let globalMedia = []
let globalID = ''
const media = document.querySelector('.row.media')



const loader = place(Loader)

export const workModalMedia = new WorkModalMedia()




if(media) {
	mount(media, workModalMedia)
	mount(media, loader)
}





const getWorkModalMedia = async ({
	id = '1', 
	loading, 
	w = 1000,
	deleating, 
	adding,
	showing,
	showingLess
} = {}) => {
	if(media) {

		if(loading) {
			loader.update(true)
			workModalMedia.setHiddenClass().setEmptyLayer()
		}
		
		

	try {


			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=4&width_image=${w}`) //&p=1&t=6
			const otherPart = data.data.other
			// console.log(otherPart.media)

			if(globalID !== id) {
				globalMedia = [
					...otherPart.media
				]
			}else {

				if(loading || showingLess || deleating || adding) {
						globalMedia = [
						...otherPart.media
					]
				}

				if(showing) {
						globalMedia = [
						...globalMedia,
						...otherPart.media
					]
				}

			}

			console.log(data.data.total !== undefined ? data.data.total.media : otherPart.media.length)
			// console.log(data.data.total)
			// console.log(data.data.total.media)
			// console.log(otherPart.media.length)


			const media = {
				id: id, 
				data: globalMedia, 
				total: data.data.total !== undefined ? data.data.total.media : otherPart.media.length, 
				loading, 
				deleating, 
				showingLess,
				adding, 
				showing
			}


			workModalMedia.update(media)

			if(loading) {
				loader.update(false)
				workModalMedia.removeHiddenClass()
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}
	globalID = id
}


export default getWorkModalMedia 		//to ../../../Components/EmployersRow.js