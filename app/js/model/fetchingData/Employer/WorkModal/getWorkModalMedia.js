import fetch from '../../fetchingDataClass'
import WorkModalMedia from '../../../Components/Employer/WorkModal/WorkModalMedia'

import Loader from '../../../Components/Employer/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}

const media = document.querySelector('.row.media')



const loader = place(Loader)

export const workModalMedia = new WorkModalMedia()




if(media) {
	mount(media, workModalMedia)
	mount(media, loader)
}





const getWorkModalMedia = async (id = '1', loading = true) => {

	if(media) {

		if(loading) {
			loader.update(true)
			workModalMedia.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=4`) //&p=1&t=6
			const otherPart = data.data.other
			console.log(data)
			const media = {id: id, data: otherPart.media }

			// if(state.id !== id) {
				workModalMedia.update(media)
			// }

			if(loading) {
				loader.update(false)
				workModalMedia.removeHiddenClass()
			} else {
				workModalMedia.progress.update(false)
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}

}


export default getWorkModalMedia 		//to ../../../Components/EmployersRow.js