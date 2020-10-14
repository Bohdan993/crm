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
	}

try {
		const data = await fetch.getResourse(`/employers/get/?id=${id}`)
		const sourseData = await fetch.getResourse('/employers/get_other/?s=5')
		// console.log(data.data.main.name)
		const mainPart = data.data.main
		const source = sourseData.data.source


		mainPart.source = source
		// if(state.id !== id) {
			workModal.update(mainPart)
		// }
		loader.update(false)
		workModal.removeHiddenClass()

		sessionStorage.setItem('currEmployerName', JSON.stringify(data.data.main.name))

		state.id = id
	}catch(e) {
		console.error(e)
	}


}


export default getWorkModalInfo 		//to ../Components/EmployersRow.js