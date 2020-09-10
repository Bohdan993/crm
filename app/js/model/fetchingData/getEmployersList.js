import fetch from './fetchingDataClass'
import RowEmployer from '../Components/EmployerRow'
import {list, mount} from '../../../libs/libs'
import initWorkPopup from '../initWorkPopup'



const row = list("div.rows.worker-rows", RowEmployer);
mount(document.querySelector('.rows-wrapper'), row);

const getEmployersList = async () => { 
	try {
			const data = await fetch.getResourse('/employers/get_all')
			const employers = data.data
			
			row.update(employers);

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