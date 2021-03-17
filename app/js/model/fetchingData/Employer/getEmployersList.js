import fetch from '../fetchingDataClass'
import EmployerList from '../../Components/Employer/EmployerList'
import Loader from '../../Components/Loader'
import {
	el,
	mount,
	place,
	toastr
} from '../../../../libs/libs'
import Numbers from '../../Components/Employer/SidebarNumbersComponent'
import {
	employerStatNums
} from '../../../view'
import {
	uniq,
	EmptyError
} from '../../helper'

import storage from '../../Storage/globalEmployers'

let countCallEmployersFunction =  0;
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


const getEmployersList = async({
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
	sort = JSON.parse(sessionStorage.getItem('sortFilter')) || 'date',
	scroll = false,
	added = false,
	deleated = false,
	t = '50',
	id = ''
} = {}) => {
	// console.log(filtered)

	let sorted = false
	let filtered = false
	countCallEmployersFunction++

	countCallEmployersFunction === 1 ? sessionStorage.setItem('page', JSON.stringify(1)) : null

	if (employersWrapper) {
		loader.update(true)

		try {
			
			if (search !== '' || country !== '' || production !== '' ||
				contact !== '' || manager !== '' || intermediary !== '' ||
				intermediaries !== '' || vacancy_active !== '' ||
				vacancy_type !== '' || vacancy_term !== '' ||
				last_contact !== '' 
				// && sort === ''
			) {
				filtered = true
			}


			console.log(`%cFILTERED=${filtered}`, 'color: red; font-size: 40px;')


			if(sort !== '') {
				sorted = true
				t = countCallEmployersFunction > 1 && !scroll ? +JSON.parse(sessionStorage.getItem('page')) * 50 || '50' : '50'
			}

			if (deleated) {
				storage.deletePartialState(id, 'id_employer')
				empList.update(storage.getState())
				return
			}

			const data = await fetch.getResourse(`/employers/get_all/?p=${p}&t=${t}&search=${search}&filter=country:${country}|production:${production}|contact:${contact}
				|manager:${manager}|intermediaries:${intermediaries}|intermediary:${intermediary}|vacancy_active:${vacancy_active}|vacancy_type:${vacancy_type}|vacancy_term:${vacancy_term}|last_contact:${last_contact}&sort=${sort}`)
			const employers = data.data
			const numsData = {
					total: data.total,
					totalR: data.total_r
				}

			sessionStorage.setItem('employersFiltered', JSON.stringify(filtered))

			if (data.success) {

				if (!employers) {
					throw new Error('Что то пошло не так, работодателей не найдено, обновите страницу, пожалуйста')
				}

				if (scroll) {

					storage.setState(employers, 'id_employer')
					empList.update(storage.getState())

				} else if (added) {

					storage.setState(employers, 'id_employer', 'top')
					empList.update(storage.getState())

				} else {

					if (!inited) {
						storage.initState(employers)
						inited = true
					}

					if(storage.getState().length && storage.getState().length < 50 && !filtered) {
						empList.update(employers)
					} else {
						empList.update(storage.getState())
					}

					if(sorted || filtered) {
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
						success: data.success
					}
				} else if (sorted) {
					empList.update([])

					return Array(1)
				} else {
					empList.update([])
					throw new EmptyError('Список работодателей пуст')
				}
			}

			return {employers, success: data.success}

		} catch (e) {

			if (e.name === 'EmptyError') {
				toastr.warning(`${e.message}`)
				return
			}


			console.log(e)

			toastr.error(`${e.message}`, '', {
				timeOut: 0,
				extendedTimeOut: 0
			})

			return
		}
	}


}


export default getEmployersList // to ../initTooltips.js
// to ../Components/Employer/SidebarPopupInterface.js
// to ../Components/Employer/ManagerPopup.js
// to ../initWorkPopup.js