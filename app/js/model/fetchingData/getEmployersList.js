import fetch from './fetchingDataClass'
import EmployerList from '../Components/Employer/EmployerList'
import Loader from '../Components/Employer/Loader'
import {el, mount, place} from '../../../libs/libs'
import { toastr }from '../../../libs/libs'


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

const getEmployersList = async ({
	search = '', 
	country = '',
	production = '',
	contact = '',
	manager = '',
	intermediary = '',
	intermediaries = '',
	vacancy_active = '',
	vacancy_type = '',
	vacancy_term = '',
	last_contact = ''
} = {}) => { 

	if(employersWrapper) {
		loader.update(true)

	try {
			// const delay = await sleep(8000)
			const data = await fetch.getResourse(`/employers/get_all/?p=1&t=50&search=${search}&filter=country:${country}`)
			const employers = data.data

			// console.log(data)

			if(data.success) {

				if(!employers) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}

					empList.update(employers);
					loader.update(false)

			} else {
				empList.update([]);
				loader.update(false)
				return
			}
		
			return employers[employers.length - 1]
	} catch (e) {
		// console.error(e)
		toastr.error(`${e.message}`, '' ,{timeOut: 0, extendedTimeOut: 0})
	}
}

}





export default getEmployersList // to ../initTooltips.js

export {
	empList
}