import fetch from '../fetchingDataClass'
import {
	loader,
	vacancyList
} from '../../MountingElements/Vacancy/mountVacancyList'

import {
	mount,
	toastr
} from '../../../../libs/libs'

import Numbers from '../../Components/Vacancy/SidebarNumbersComponent'
import {
	sidebarStatNumsVacancy
} from '../../../view'
import {
	EmptyError
} from '../../helper'
import storage from '../../Storage/globalVacancies'

import vacanciesListNotFiltered from '../../CustomEvents/vacanciesListNotFilteredEvent'
import vacancyListDataFetchedEvent from '../../CustomEvents/vacancyListDataFetchedEvent'



const vacanciesWrapper = document.querySelector('.vacancy-rows-wrapper')

let inited = false

const numbers = new Numbers()


if (sidebarStatNumsVacancy) {
	mount(sidebarStatNumsVacancy, numbers)
}


function vacancylistdeleteeventHandler(e) {
	const {detail: {id}} = e
	storage.deletePartialState(id, 'id_vacancy')
	vacancyList.update(storage.getState())

	return
}




const getVacancyList = async ({
	t = '50',
	p = '1',
	id = '',
	search = JSON.parse(sessionStorage.getItem('searchVacancy')) || '',
	country = JSON.parse(sessionStorage.getItem('countryFilterVacancy')) || '',
	manager = JSON.parse(sessionStorage.getItem('managerFilterVacancy')) || '',
	archive = +JSON.parse(sessionStorage.getItem('archiveVacancyFilter')) || '',
	active = inited ? +JSON.parse(sessionStorage.getItem('activeVacancyFilter')) : '1',
	type_vacancy = JSON.parse(sessionStorage.getItem('v-vacancyTypeFilter')) || '',
	type_production = JSON.parse(sessionStorage.getItem('typeManufacturyVacancyFilter')) || '',
	job_start = JSON.parse(sessionStorage.getItem('jobStartFilter')) || '',
	job_period = JSON.parse(sessionStorage.getItem('jobPeriodFilter')) || '',
	status = JSON.parse(sessionStorage.getItem('stagesOfVacancies')) || '',
	sort = JSON.parse(sessionStorage.getItem('sortFilterVacancy')) || 'date',
	scroll = false,

	avoidFetch = false,
	sorted = false,
	filtered = false,
} = {}) => {


	function isFiltered() {
		return search !== '' && country !== '' && manager !== '' &&
			archive !== '' && active !== '' &&
			type_vacancy !== '' && type_production !== '' &&
			job_start !== '' && job_period !== '' &&
			status !== ''
	}


	if (vacanciesWrapper) {
		loader.update(true)


		try {

			if (isFiltered()) {
				filtered = true
			}

			if (sort !== '') {
				sorted = true
			}


			const data = !avoidFetch ?
				await fetch.getResourse(`/vacancies/get_all/?p=${p}&t=${t}&search=${search}&filter=manager:${manager}
				|archive:${archive}|active:${active}|country:${country}|type_vacancy:${type_vacancy}
				|type_production:${type_production}|job_start:${job_start}|job_period:${job_period}|status:${status}&sort=${sort}`) :
				storage.getState()

			console.log(data)
			const vacancies = data.data


			const numsData = {
				total: data.total_work,
				totalN: data.need_employers,
				totalC: data.current_vacancy
			}

			storage.hasNextPage = data.exist_next_page || storage.hasNextPage


			if (!filtered && !scroll || filtered && (data.p === 1 || data.p === undefined)) {

				vacanciesListNotFiltered.detail.hasNextPage = (!!data.exist_next_page || (!Array.isArray(data) && !data.success)) ?
					!!data.exist_next_page :
					Array.isArray(data) ?
					!!storage.hasNextPage :
					!!data.exist_next_page

				document.dispatchEvent(vacanciesListNotFiltered)
			}


			if (data.success) {

				if (!vacancies) {
					throw new Error('Что то пошло не так, вакансий не найдено, обновите страницу, пожалуйста')
				}

				if (scroll) {
					if (data.p === 2 && !filtered) {
						storage.clearState()
						storage.setState([...storage.getInitialState(), ...vacancies], 'id_vacancy')
						vacancyList.update(storage.getState())
					}
					storage.setState(vacancies, 'id_vacancy')
					vacancyList.update(storage.getState())
				} else {

					if (sorted || filtered) {
						storage.clearState()
						storage.setState(vacancies, 'id_vacancy')
						vacancyList.update(vacancies)
					}

					if (data.p === 1) {
						storage.initState(vacancies)
						inited = true
					}


				}

				numbers.update(numsData)
				loader.update(false)

			} else {

				loader.update(false)

				if (scroll) {
					vacancyList.update(storage.getState())

					return {
						vacancies: storage.getState(),
						success: data.success,
						hasNextPage: data.exist_next_page
					}

				} else if (sorted) {
					if (!avoidFetch) {
						vacancyList.update([])
						throw new EmptyError('Список вакансий пуст')
					} else {
						vacancyList.update(storage.getInitialState())
					}

					return Array(1)

				} else {
					vacancyList.update([])
					throw new EmptyError('Список вакансий пуст')
				}

			}

			document.dispatchEvent(vacancyListDataFetchedEvent)
			document.addEventListener('vacancylistdeleteevent', vacancylistdeleteeventHandler)
			return {
				vacancies,
				success: data.success,
				hasNextPage: data.exist_next_page
			}




		} catch (e) {

			if (e.name === 'EmptyError') {
				toastr.warning(`${e.message}`)
				return
			}

			toastr.error(`${e.message}`, '', {
				timeOut: 0,
				extendedTimeOut: 0
			})
			return
		}
	}

}


function vacancylistupdatefetcheventHandler(e) {
	getVacancyList({
	})
}

function storageemployeraddHandler(e) {
	// alert('df')
	getVacancyList({
		added: true
	})
}


document.addEventListener('vacancylistupdatefetchevent', vacancylistupdatefetcheventHandler)
document.addEventListener('storageemployeradd', storageemployeraddHandler)



export default getVacancyList // to ../initTooltips.js
// to ../Components/Employer/SidebarPopupInterface.js
// to ../Components/Employer/ManagerPopup.js
// to ../initWorkPopup.js