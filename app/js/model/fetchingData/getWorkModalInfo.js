import fetch from './fetchingDataClass'
import WorkModal from '../Components/Employer/WorkModal/WorkModal'
import Loader from '../Components/Employer/Loader'
import {list, mount, place} from '../../../libs/libs'

const state = {}

const commonInfo = document.querySelector('.row.common-info ')

const loader = place(Loader)
// const workModal = place(new WorkModal())
const workModal = new WorkModal()



if(commonInfo) {
	mount(commonInfo, workModal);
	mount(commonInfo, loader)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }



const getWorkModalInfo = async (id = '1') => {

	if(commonInfo) {
		loader.update(true)
		workModal.setHiddenClass()
		// workModal.update(false)
	}

try {
		// const delay = await sleep(3000)
		const data = await fetch.getResourse(`/employers/get/?id=${id}`)
		const mainPart = data.data.main
		console.log(data.data.main)
		// if(state.id !== id) {
			workModal.update(mainPart)
		// }
		loader.update(false)
		workModal.removeHiddenClass()
		state.id = id
	}catch(e) {
		console.error(e)
	}


}


export default getWorkModalInfo 		//to ../Components/EmployersRow.js