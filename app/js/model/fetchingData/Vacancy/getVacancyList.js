

import fetch from '../fetchingDataClass'
import VacancyList from '../../Components/Vacancy/VacancyList'
import Loader from '../../Components/Loader'
import {el, mount, place, toastr} from '../../../../libs/libs'



const vacanciesWrapper = document.querySelector('.vacancy-rows-wrapper')
let globalVacancies = []
const loader = place(Loader)
const vacancyList = new VacancyList()

let uniq = function(xs) {
	    let seen = {};
	    return xs.filter(function(x) {
	        let key = JSON.stringify(x.id_vacancy);
	        return !(key in seen) && (seen[key] = x.id_vacancy);
	    });
		}



if(vacanciesWrapper) {
mount(vacanciesWrapper, vacancyList);
mount(vacanciesWrapper, loader)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }


let flag = false

const getVacancyList = async ({
	t = +JSON.parse(sessionStorage.getItem('page')) * 50 || '50',
	// t = '50',
	p = '1',
	search = JSON.parse(sessionStorage.getItem('searchVacancy')) || '', 
	country = JSON.parse(sessionStorage.getItem('countryFilterVacancy')) || '',
	manager = JSON.parse(sessionStorage.getItem('managerFilterVacancy')) || '',
	sort = JSON.parse(sessionStorage.getItem('sortFilterVacancy')) || '',
	archive = '0',
	active = '1',
	type_vacancy = JSON.parse(sessionStorage.getItem('v-vacancyTypeFilter')) || '',
	type_production = JSON.parse(sessionStorage.getItem('typeManufacturyVacancyFilter')) || '',
	job_start = JSON.parse(sessionStorage.getItem('jobStartFilter')) || '',
	job_period = JSON.parse(sessionStorage.getItem('jobPeriodFilter')) || '',
	status = JSON.parse(sessionStorage.getItem('stagesOfVacancies')) || '',

	scroll = false
} = {}) => { 

	console.log(type_vacancy)
	if(vacanciesWrapper) {
		loader.update(true)

	try {
			// const delay = await sleep(5000)
			const data = await fetch.getResourse(`/vacancies/get_all/?p=${p}&t=${t}&search=${search}&filter=manager:${manager}|archive:${archive}|active:${active}|country:${country}|type_vacancy:${type_vacancy}|type_production:${type_production}|job_start:${job_start}|job_period:${job_period}|status:${status}&sort=${sort}`)
			const vacanciesData = data.data
			console.log(data)
			if(data.success) {

				if(!vacanciesData) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}

				if(scroll) {
						globalVacancies = uniq([
					...globalVacancies,
					...vacanciesData
					])
					vacancyList.update(globalVacancies)
				} else {
					globalVacancies = vacanciesData
					vacancyList.update(vacanciesData)
				}
				loader.update(false)

			} else {
				vacancyList.update([])
				loader.update(false)
				return
			}
		
			// return vacanciesData[vacanciesData.length - 1]
			// globalVacancies = []
			return vacanciesData
	} catch (e) {
		console.error(e)
		// toastr.error(`${e.message}`, '' ,{timeOut: 0, extendedTimeOut: 0})
	}
}



}




export default getVacancyList // to ../initTooltips.js
																// to ../Components/Employer/SidebarPopupInterface.js
																// to ../Components/Employer/ManagerPopup.js
																// to ../initWorkPopup.js

