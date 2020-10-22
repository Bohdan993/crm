import fetch from './fetchingDataClass'
import CountryPopup from '../Components/CountryPopup'
import {list, mount} from '../../../libs/libs'

const countryPopup = document.querySelector('#country-popup')


const popup = list("form", CountryPopup, 'id', 'employer')

console.log(popup)

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

				

				localStorage.setItem('countries', JSON.stringify(countries))
	
				popup.update(countries);
		} catch (e) {
			console.error(e)
		}
	}

}




export default getCountryPopup // to ../index.js