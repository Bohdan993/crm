import fetch from '../fetchingDataClass'
import { 
	VacancyPopupType,
	TypeManufactury
} from '../../Components/Vacancy/TypeWorkPopup'
import {list, mount} from '../../../../libs/libs'

// if(managersTemplate) {
// 		managersTemplate.style.display = 'block';
// }

const typeWorkPopup = document.querySelector('#type-work-popup form')
// const typeWorkPopupGroup = typeWorkPopup.querySelector('.form-group')



let checkboxData = [
	{
		id: 'season-chbx',
		label: 'Сезонная',
		name: 'season',
		str: 'type_vacancy',
		filter: 'v-vacancyTypeFilter'
	},
	{
		id: 'practice-chbx',
		label: 'Практика',
		name: 'practics',
		str: 'type_vacancy',
		filter: 'v-vacancyTypeFilter'
	},
	{
		id: 'work-chbx',
		label: 'Рабочая',
		name: 'job',
		str: 'type_vacancy',
		filter: 'v-vacancyTypeFilter'
	}
]


const popupPart1 = new VacancyPopupType()
const popupPart2 = new TypeManufactury('vacancy')
// const popupPart2 = list('div.form-group', TypeManufactury, 'id', 'vacancy')
// const popupPart3 = list("fieldset", TypeManufactury, 'id', 'vacancy')


if(typeWorkPopup) {
	mount(typeWorkPopup, popupPart1)
	mount(typeWorkPopup, popupPart2)
}

const getVacancyWorkType = async () => {
if(typeWorkPopup) {

			const data = await fetch.getResourse('/vacancies/get_other/?s=2')
			let production = data.data.production
			// console.log(data)

			// if(sessionStorage.getItem('vacancyTypeFilter')) { 
			// 			part1Data = part1Data.map(data => {
			// 			let checked = !!~JSON.parse(sessionStorage.getItem('vacancyTypeFilter')).split(',').indexOf(data.name)
			// 			return {
			// 				label: data.label,
			// 				id: data.id,
			// 				name: data.name,
			// 				str: 'vacancy_type',
			// 				filter: 'vacancyTypeFilter',
			// 				checked
			// 			}
			// 		})
			// 	} else {
			// 		part1Data = part1Data.map(data=> {
			// 			return {
			// 				label: data.label,
			// 				id: data.id,
			// 				name: data.name,
			// 				str: 'vacancy_type',
			// 				filter: 'vacancyTypeFilter',
			// 			}
			// 		})
			// 	}

				

			// if(sessionStorage.getItem('typeManufacturyFilter')) { 
			// 			production = production.map(product => {
			// 			let checked = !!~JSON.parse(sessionStorage.getItem('typeManufacturyFilter')).split(',').indexOf(product.id)
			// 			return {
			// 				id: product.id,
			// 				name: product.name,
			// 				prefix: 'type-manufactury-chbx-',
			// 				checked
			// 			}
			// 		})
			// 	} else {
			// 			production = production.map(product => {
			// 			return {
			// 				id: product.id,
			// 				name: product.name,
			// 				prefix: 'type-manufactury-chbx-',
			// 			}
			// 		})
			// 	}
			// const end = production.length
			// const middle = Math.ceil(end/2)

			// const prod1 = production.slice(0, middle)
			// const prod2 = production.slice(middle, end)

			popupPart1.update(checkboxData)
			popupPart2.update(production)
			// popupPart3.update(prod2)


}
}




export default getVacancyWorkType