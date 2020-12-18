

import fetch from '../fetchingDataClass'
import VacancyList from '../../Components/Vacancy/VacancyList'
import Loader from '../../Components/Loader'
import {el, mount, place, toastr} from '../../../../libs/libs'
import Numbers from '../../Components/Vacancy/SidebarNumbersComponent'
import {sidebarStatNumsVacancy} from '../../../view'
import {uniq, EmptyError} from '../../helper'


const vacanciesWrapper = document.querySelector('.vacancy-rows-wrapper')
let globalVacancies = []
let cachedVacancies = []
const loader = place(Loader)
const vacancyList = new VacancyList()
const numbers = new Numbers()




if(vacanciesWrapper) {
	mount(vacanciesWrapper, vacancyList);
	mount(vacanciesWrapper, loader)
}

if(sidebarStatNumsVacancy) {
	mount(sidebarStatNumsVacancy, numbers)
}
// const sleep = (ms) => {
// 	return new Promise(res => {
// 		setTimeout(function(){
// 			res('ok')
// 		}, ms)
// 	})
// }


// let flag = false

const getVacancyList = async ({
	t = +JSON.parse(sessionStorage.getItem('pageVacancy')) * 50 || '50',
	p = '1',
	search = JSON.parse(sessionStorage.getItem('searchVacancy')) || '', 
	country = JSON.parse(sessionStorage.getItem('countryFilterVacancy')) || '',
	manager = JSON.parse(sessionStorage.getItem('managerFilterVacancy')) || '',
	sort = JSON.parse(sessionStorage.getItem('sortFilterVacancy')) || '',
	archive = JSON.parse(sessionStorage.getItem('archiveVacancyFilter')) || '0',
	active = JSON.parse(sessionStorage.getItem('activeVacancyFilter')) || '1',
	type_vacancy = JSON.parse(sessionStorage.getItem('v-vacancyTypeFilter')) || '',
	type_production = JSON.parse(sessionStorage.getItem('typeManufacturyVacancyFilter')) || '',
	job_start = JSON.parse(sessionStorage.getItem('jobStartFilter')) || '',
	job_period = JSON.parse(sessionStorage.getItem('jobPeriodFilter')) || '',
	status = JSON.parse(sessionStorage.getItem('stagesOfVacancies')) || '',
	scroll = false,
	filtered = false
} = {}) => { 
	let flag = false
	// console.log(type_vacancy)
	if(vacanciesWrapper) {
		loader.update(true)

	try {
			// const delay = await sleep(5000)
			const data = await fetch.getResourse(`/vacancies/get_all/?p=${p}&t=${t}&search=${search}&filter=manager:${manager}|archive:${archive}|active:${active}|country:${country}|type_vacancy:${type_vacancy}|type_production:${type_production}|job_start:${job_start}|job_period:${job_period}|status:${status}&sort=${sort}`)
			const vacanciesData = data.data


			if(search === '' && country === '' && manager === ''   
				&& sort === ''  && archive === '0'  && active === '1'   
				&& type_vacancy === '' && type_production === '' 
				&& job_start === '' && job_period === ''
				&& status === '' 
				) {
					flag = true
				}

			const numsData = {
				total: data.total_work,
				totalN: data.need_employers,
				totalC: data.current_vacancy
			}

			if(data.success) {

				if(!vacanciesData) {
					throw new Error('Что то пошло не так, вакансий не найдено, обновите страницу, пожалуйста')
				}

				if(scroll) {
						globalVacancies = uniq([
					...globalVacancies,
					...vacanciesData
					], 'id_vacancy')

						cachedVacancies = uniq([
					...cachedVacancies,
					...globalVacancies
					], 'id_vacancy')


					vacancyList.update(cachedVacancies)
				} else {
					globalVacancies = vacanciesData
					cachedVacancies.length && !filtered ? vacancyList.update(cachedVacancies) : 
					!flag ? 
					vacancyList.update(vacanciesData) :
					(vacancyList.update(uniq([
					...vacanciesData,
					...cachedVacancies
					], 'id_vacancy')))
				}
				numbers.update(numsData)
				loader.update(false)

			} else {

				loader.update(false)

				if(scroll) {
					vacancyList.update(globalVacancies)
					return Array(1)
				} else {
					vacancyList.update([])
					throw new EmptyError('Список вакансий пуст')

				}
			}
		
			return vacanciesData
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




export default getVacancyList // to ../initTooltips.js
																// to ../Components/Employer/SidebarPopupInterface.js
																// to ../Components/Employer/ManagerPopup.js
																// to ../initWorkPopup.js

