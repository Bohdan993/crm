import fetch from './fetchingDataClass'
import EmployerList from '../Components/EmployerList'
import Loader from '../Components/Loader'
import {el, mount, place} from '../../../libs/libs'
import initWorkPopup from '../initWorkPopup'

const loader = place(Loader)
const empList = new EmployerList()

mount(document.querySelector('.rows-wrapper'), empList);
mount(document.querySelector('.rows-wrapper'), loader)

// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }

const getEmployersList = async () => { 
	loader.update(true)

	try {
			// const delay = await sleep(8000)
			const data = await fetch.getResourse('/employers/get_all')
			const employers = data.data
			empList.update(employers);
			loader.update(false)

			// setTimeout(()=> {
			// 	empList.update([...employers.slice(0, 2), ...employers.slice(5 + 1)]);
			// }, 5000)
		
	} catch (e) {
		console.error(e)
	}

	initWorkPopup()

}



export default getEmployersList

export {
	empList
}