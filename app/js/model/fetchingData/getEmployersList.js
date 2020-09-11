import fetch from './fetchingDataClass'
import EmployerList from '../Components/EmployerList'
import Loader from '../Components/Loader'
import {el, mount, place} from '../../../libs/libs'


const employersWrapper = document.querySelector('.employer-rows-wrapper')
// import { initRowTooltips } from '../initToottips'

const loader = place(Loader)
const empList = new EmployerList()



if(employersWrapper) {
mount(employersWrapper, empList);
mount(employersWrapper, loader)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }


let flag = false
const getEmployersList = async () => { 
	if(employersWrapper) {
		loader.update(true)
	}
	

	try {
			// const delay = await sleep(8000)
			const data = await fetch.getResourse('/employers/get_all')
			const employers = data.data
			empList.update(employers);
			loader.update(false)
			console.log(employers)
			// setTimeout(()=> {
			// 	empList.update([...employers.slice(0, 2), ...employers.slice(5 + 1)]);
			// }, 5000)
			// if(!flag) {
				// flag = true
			// }
		
			return employers[employers.length - 1]
	} catch (e) {
		console.error(e)
	}

	


	

}


// const getEmployersListForUpdate = async () => { 

// 	try {
// 			const data = await fetch.getResourse('/employers/get_all')
// 			const employers = data.data
// 			empList.update(employers);
// 	} catch (e) {
// 		console.error(e)
// 	}

// 	initWorkPopup()

// }



export default getEmployersList

export {
	empList,
	// getEmployersListForUpdate
}