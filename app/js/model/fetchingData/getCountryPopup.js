import fetch from './fetchingDataClass'
import CountryPopup from '../Components/CountryPopup'
import {list, mount} from '../../../libs/libs'




const popup = list("form", CountryPopup, 'id')
mount(document.querySelector('#country-popup'), popup)

const getCountryPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=4')
			const countries = data.data.country
			countries.sort((a, b) => {
				return a.name.localeCompare(b.name)
			})
			popup.update(countries);
	} catch (e) {
		console.error(e)
	}


}




export default getCountryPopup