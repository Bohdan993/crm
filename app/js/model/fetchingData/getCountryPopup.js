import fetch from './fetchingDataClass'
import CountryPopup from '../Components/Employer/CountryPopup'
import {list, mount, tippy} from '../../../libs/libs'

const countryPopup = document.querySelector('#country-popup')

// console.log(countryPopup._tippy)
const popup = list("form", CountryPopup, 'id')

if(countryPopup) {
	mount(countryPopup, popup)
}


const getCountryPopup = async () => {
if(countryPopup) {
		try {
				const data = await fetch.getResourse('/employers/get_other/?s=4')
				let countries = data.data.country
				countries.sort((a, b) => {
					return a.name.localeCompare(b.name)
				})

				if(sessionStorage.getItem('countryFilter')) { 
						countries = countries.map(country => {
						let checked = !!~JSON.parse(sessionStorage.getItem('countryFilter')).split(',').indexOf(country.id)
						return {
							id: country.id,
							name: country.name,
							icon: country.icon,
							checked
						}
					})
				}

				localStorage.setItem('countries', JSON.stringify(countries))
	
				popup.update(countries);
		} catch (e) {
			console.error(e)
		}
	}

}




export default getCountryPopup