import fetch from './fetchingDataClass'
import WorkModal from '../Components/WorkModal'
import Loader from '../Components/Loader'
import {list, mount, place} from '../../../libs/libs'



const commonInfo = document.querySelector('.row.common-info ')

const loader = place(Loader)
const workModal = place(new WorkModal())



if(commonInfo) {
	mount(commonInfo, workModal);
	mount(commonInfo, loader)
}
const sleep = (ms) => {
	return new Promise(res => {
		setTimeout(function(){
			res('ok')
		}, ms)
	})
}


let flag = false


const getWorkModalInfo = async (id = '1') => {
	if(commonInfo) {
		loader.update(true)
		workModal.update(false)
	}

try {
		const delay = await sleep(4000)
		const data = await fetch.getResourse(`/employers/get/?id=${id}`)
		const mainPart = data.data.main
		workModal.update(true, mainPart)
		loader.update(false)
	}catch(e) {
		console.error(e)
	}


}


export default getWorkModalInfo