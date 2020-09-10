import fetch from './fetchingDataClass'
import RowEmployer from '../Components/EmployerRow'
import Loader from '../Components/Loader'
import {list, mount, place} from '../../../libs/libs'
import initWorkPopup from '../initWorkPopup'

const loader = place(Loader)
const row = list("div.rows.worker-rows", RowEmployer);
mount(document.querySelector('.rows-wrapper'), row);
mount(document.querySelector('.rows-wrapper'), loader)

const sleep = (ms) => {
	return new Promise(res => {
		setTimeout(function(){
			res('ok')
		}, ms)
	})
}

const getEmployersList = async () => { 
	loader.update(true)
	try {
			// const delay = await sleep(8000)
			const data = await fetch.getResourse('/employers/get_all')
			const employers = data.data
			row.update(employers);
			loader.update(false)
		// setTimeout(()=> {
		// 	row.update([...employers.slice(0, 2), ...employers.slice(2 + 1)]);
		// }, 5000)
		
	} catch (e) {
		console.error(e)
	}

	initWorkPopup()

}



export default getEmployersList

export {
	row
}