import fetch from '../fetchingDataClass'
import CountryPopup from '../../Components/CountryPopup'
import {list, mount} from '../../../../libs/libs'

const countryPopup = document.querySelector('#country-popup .flex-form')



const part1 = list("fieldset", CountryPopup,  'id', 'employer')
const part2 = list("fieldset", CountryPopup,  'id', 'employer')




// const popup = list("form", CountryPopup, 'id', 'employer')

// console.log(popup)

if(countryPopup) {
	mount(countryPopup, part1)
	mount(countryPopup, part2)
}


const getCountryPopup = async () => {
	// console.log('dd')
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

				
				// console.log(countries)


				const end = countries.length
				const middle = Math.ceil(end/2)

				const cont1 = countries.slice(0, middle)
				const cont2 = countries.slice(middle, end)


			


				localStorage.setItem('countries', JSON.stringify(countries))
	
				part1.update(cont1)
				part2.update(cont2)


		} catch (e) {
			console.error(e)
		}
	}

}




export default getCountryPopup // to ../index.js