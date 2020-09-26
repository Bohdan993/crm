import fetch from './fetchingDataClass'
import EmployerList from '../Components/Employer/EmployerList'
import Loader from '../Components/Employer/Loader'
import {el, mount, place} from '../../../libs/libs'
import { toastr }from '../../../libs/libs'


const employersWrapper = document.querySelector('.employer-rows-wrapper')
let globalEmployers = []

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
	// t = +JSON.parse(sessionStorage.getItem('page')) * 50 || '50',
	t = '50',
	p = '1',
	search = JSON.parse(sessionStorage.getItem('search')) || '', 
	country = JSON.parse(sessionStorage.getItem('countryFilter')) || '',
	production = JSON.parse(sessionStorage.getItem('typeManufacturyFilter')) || '',
	contact = JSON.parse(sessionStorage.getItem('contactDataFilter')) || '',
	manager = JSON.parse(sessionStorage.getItem('managerFilter')) || '',
	intermediary = JSON.parse(sessionStorage.getItem('intermediaryFilter')) || '',
	intermediaries = JSON.parse(sessionStorage.getItem('intermediariesFilter')) || '',
	vacancy_active = JSON.parse(sessionStorage.getItem('vacancyActiveFilter')) || '',
	vacancy_type = JSON.parse(sessionStorage.getItem('vacancyTypeFilter')) || '',
	vacancy_term = JSON.parse(sessionStorage.getItem('vacancyTermFilter')) || '',
	last_contact = JSON.parse(sessionStorage.getItem('lastContactFilter')) || '',
	sort = JSON.parse(sessionStorage.getItem('sortFilter')) || ''
} = {}) => { 


	if(employersWrapper) {
		loader.update(true)

	try {
			// const delay = await sleep(5000)
			const data = await fetch.getResourse(`/employers/get_all/?p=${p}&t=${t}&search=${search}&filter=country:${country}|production:${production}|contact:${contact}
				|manager:${manager}|intermediaries:${intermediaries}|intermediary:${intermediary}|vacancy_active:${vacancy_active}|vacancy_type:${vacancy_type}|vacancy_term:${vacancy_term}|last_contact:${last_contact}&sort=${sort}`)
			const employers = data.data
			console.log(employers)
			// console.log(data)
			if(data.success) {

				if(!employers) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}


					globalEmployers = [
					...globalEmployers,
					...employers
				]

			// 	const uniqueArray = globalEmployers.filter((thing,index) => {
			//   return index === globalEmployers.findIndex(obj => {
			//     return JSON.stringify(obj) === JSON.stringify(thing);
			//   });
			// });

			// 	console.log(uniqueArray)

					empList.update(globalEmployers)
					loader.update(false)

			} else {
				empList.update([])
				loader.update(false)
				return
			}
		
			// return employers[employers.length - 1]
			return employers
	} catch (e) {
		toastr.error(`${e.message}`, '' ,{timeOut: 0, extendedTimeOut: 0})
	}
}



}





export default getEmployersList // to ../initTooltips.js
																// to ../Components/Employer/SidebarPopupInterface.js
																// to ../Components/Employer/ManagerPopup.js

export {
	empList
}