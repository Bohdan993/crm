import fetch from './fetchingDataClass'
import EmployerList from '../Components/Employer/EmployerList'
import Loader from '../Components/Loader'
import {el, mount, place, toastr} from '../../../libs/libs'
import Numbers from '../Components/Employer/SidebarNumbersComponent'
import {employerStatNums} from '../../view'
import {uniq, EmptyError} from '../helper'

const employersWrapper = document.querySelector('.employer-rows-wrapper')
let globalEmployers = []
let cachedEmployers = []
const loader = place(Loader)
const empList = new EmployerList()
const numbers = new Numbers()



if(employersWrapper) {
mount(employersWrapper, empList);
mount(employersWrapper, loader)
}


if(employerStatNums) {
	mount(employerStatNums, numbers)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }


// let flag = false

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
	sort = JSON.parse(sessionStorage.getItem('sortFilter')) || '',
	scroll = false,
	filtered = false
} = {}) => { 
	let flag = false
	// console.log('employerList')
	if(employersWrapper) {
		loader.update(true)

	try {
			// const delay = await sleep(5000)
			const data = await fetch.getResourse(`/employers/get_all/?p=${p}&t=${t}&search=${search}&filter=country:${country}|production:${production}|contact:${contact}
				|manager:${manager}|intermediaries:${intermediaries}|intermediary:${intermediary}|vacancy_active:${vacancy_active}|vacancy_type:${vacancy_type}|vacancy_term:${vacancy_term}|last_contact:${last_contact}&sort=${sort}`)
			const employers = data.data

			if(search === '' && country === '' && production === ''   
				&& contact === ''  && manager === ''  && intermediary === ''   
				&& intermediaries === '' && vacancy_active === '' 
				&& vacancy_type === '' && vacancy_term === ''
				&& last_contact === '' 
				) {
					flag = true
				}


			// console.log(filtered)
			// console.log(flag)

			const total = data.total
			const totalR = data.total_r

			if(data.success) {

				// console.log(data.success)

				if(!employers) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}

				const numsData = {
					total, 
					totalR
				}

				if(scroll) {
						globalEmployers = uniq([
					...globalEmployers,
					...employers
					], 'id_employer')

					cachedEmployers = uniq([
					...cachedEmployers,
					...globalEmployers
					], 'id_employer')

					empList.update(cachedEmployers)
				} else {
					globalEmployers = employers
					cachedEmployers.length && !filtered ? empList.update(cachedEmployers) : 
					!flag ? 
					empList.update(employers) :
					(empList.update(uniq([
					...employers,
					...cachedEmployers
					], 'id_employer')))
				}


				// console.log(employers.length)
				// console.log(p)
				// let uniq = function(xs, id) {
			 //    let seen = {};
			 //    return xs.filter(function(x) {
			 //        let key = JSON.stringify(x[id]);
			 //        return !(key in seen) && (seen[key] = x[id]);
			 //    });
			 //  }

				// console.log('globalEmployers', globalEmployers)
				// console.log('cachedEmployers', cachedEmployers)
				numbers.update(numsData)
				loader.update(false)

			} else {
				loader.update(false)

				if(scroll) {
					empList.update(globalEmployers)
					
					return Array(1)
				} else {
					// console.log(globalEmployers)
					empList.update([])
					throw new EmptyError('Список работодателей пуст')
				}
			}
		
			return employers
	} catch (e) {

		if(e.name === 'EmptyError') {
			toastr.warning(`${e.message}`)
			return
		}

		toastr.error(`${e.message}`, '' ,{timeOut: 0, extendedTimeOut: 0})
		return
	}
}



}





export default getEmployersList // to ../initTooltips.js
																// to ../Components/Employer/SidebarPopupInterface.js
																// to ../Components/Employer/ManagerPopup.js
																// to ../initWorkPopup.js

