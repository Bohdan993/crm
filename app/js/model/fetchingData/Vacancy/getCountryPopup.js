import fetch from '../fetchingDataClass'
import CountryPopup from '../../Components/CountryPopup'
import {list, mount} from '../../../../libs/libs'

const countryPopup = document.querySelector('#country-popup-vacancy')

const popup = list("form", CountryPopup, 'id', 'vacancy')

// console.log(popup)

if(countryPopup) {
	mount(countryPopup, popup)
}


const getCountryVacancyPopup = async () => {
if(countryPopup) {
		try {
				const data = await fetch.getResourse('/vacancies/get_other/?s=3')
				// console.log(data)
				let countries = data.data.country
				countries.sort((a, b) => {
					return a.name.localeCompare(b.name)
				})


				


				if(sessionStorage.getItem('countryFilterVacancy')) { 
						countries = countries.map(country => {
						let checked = !!~JSON.parse(sessionStorage.getItem('countryFilterVacancy')).split(',').indexOf(country.id)
						return {
							id: country.id,
							name: country.name,
							icon: country.icon,
							prefix: 'country-chbx-',
							checked
						}
					})
				} else {
					countries = countries.map(country => {
						return {
							id: country.id,
							name: country.name,
							icon: country.icon,
							prefix: 'country-chbx-',
						}
					})
				}

				

				localStorage.setItem('countriesVacancy', JSON.stringify(countries))
	
				popup.update(countries);
		} catch (e) {
			console.error(e)
		}
	}

}




export default getCountryVacancyPopup // to ../index.js