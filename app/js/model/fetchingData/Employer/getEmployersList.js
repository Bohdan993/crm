import fetch from '../fetchingDataClass'
import EmployerList from '../../Components/Employer/EmployerList'
import Loader from '../../Components/Loader'
import {
	mount,
	place,
	toastr
} from '../../../../libs/libs'
import Numbers from '../../Components/Employer/SidebarNumbersComponent'
import {
	employerStatNums
} from '../../../view'
import {
	EmptyError
} from '../../helper'

import storage from '../../Storage/globalEmployers'
import employerListNotFiltered from '../../CustomEvents/employerListNotFilteredEvent'
import employerListDataFetchedEvent from '../../CustomEvents/employerListDataFetchedEvent'

const employersWrapper = document.querySelector('.employer-rows-wrapper')


let inited = false

const loader = place(Loader)
const empList = new EmployerList()
const numbers = new Numbers()


if (employersWrapper) {
	mount(employersWrapper, empList);
	mount(employersWrapper, loader)
}


if (employerStatNums) {
	mount(employerStatNums, numbers)
}


function employerlistdeleteeventHandler(e) {
	const {
		detail: {
			id
		}
	} = e
	storage.deletePartialState(id, 'id_employer')
	empList.update(storage.getState())

	return
}





const getEmployersList = async ({
	p = '1',
	t = '50',
	id = '',
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
	sort = JSON.parse(sessionStorage.getItem('sortFilter')) || 'date',
	scroll = false,
	// deleated = false,
	avoidFetch = false,
	sorted = false,
	filtered = false,
} = {}) => {

	function isFiltered() {
		return search !== '' || country !== '' || production !== '' ||
			contact !== '' || manager !== '' || intermediary !== '' ||
			intermediaries !== '' || vacancy_active !== '' ||
			vacancy_type !== '' || vacancy_term !== '' ||
			last_contact !== ''
	}


	if (employersWrapper) {
		loader.update(true)

		try {

			if (isFiltered()) {
				filtered = true
			}

			if (sort !== '') {
				sorted = true
			}


			const data = !avoidFetch ?
				await fetch.getResourse(`/employers/get_all/?p=${p}&t=${t}&search=${search}&filter=country:${country}
				|production:${production}|contact:${contact}|manager:${manager}|intermediaries:${intermediaries}
				|intermediary:${intermediary}|vacancy_active:${vacancy_active}|vacancy_type:${vacancy_type}|vacancy_term:${vacancy_term}
				|last_contact:${last_contact}&sort=${sort}`) :
				storage.getState()


			const employers = data.data

			const numsData = {
				total: data.total,
				totalR: data.total_r
			}


			storage.hasNextPage = data.exist_next_page || storage.hasNextPage

			if (!filtered && !scroll || filtered && (data.p === 1 || data.p === undefined)) {

				employerListNotFiltered.detail.hasNextPage = (!!data.exist_next_page || (!Array.isArray(data) && !data.success)) ?
					!!data.exist_next_page :
					Array.isArray(data) ?
					!!storage.hasNextPage :
					!!data.exist_next_page

				document.dispatchEvent(employerListNotFiltered)
			}

			if (data.success) {

				if (!employers) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}

				if (scroll) {
					if (data.p === 2 && !filtered) {
						storage.clearState()
						storage.setState([...storage.getInitialState(), ...employers], 'id_employer')
						empList.update(storage.getState())
					}
					storage.setState(employers, 'id_employer')
					empList.update(storage.getState())

				} else {
					if (data.p === 1) {
						storage.initState(employers)
						inited = true
					}

					if (sorted || filtered) {
						storage.clearState()
						storage.setState(employers, 'id_employer')
						empList.update(employers)
					}
				}

				numbers.update(numsData)
				loader.update(false)

			} else {

				loader.update(false)

				if (scroll) {
					empList.update(storage.getState())

					return {
						employers: storage.getState(),
						success: data.success,
						hasNextPage: data.exist_next_page
					}

				} else if (sorted) {
					if (!avoidFetch) {
						empList.update([])
						throw new EmptyError('Список работодателей пуст')
					} else {
						empList.update(storage.getInitialState())
					}

					return Array(1)

				} else {
					empList.update([])
					throw new EmptyError('Список работодателей пуст')
				}


			}

			document.dispatchEvent(employerListDataFetchedEvent)
			document.addEventListener('employerlistdeleteevent', employerlistdeleteeventHandler)

			return {
				employers,
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


function employerlistupdateeventHandler(e) {
	getEmployersList({
		avoidFetch: true
	})
}


document.addEventListener('employerslistupdateevent', employerlistupdateeventHandler)

export default getEmployersList // to ../initTooltips.js
// to ../Components/Employer/SidebarPopupInterface.js
// to ../Components/Employer/ManagerPopup.js
// to ../initWorkPopup.js