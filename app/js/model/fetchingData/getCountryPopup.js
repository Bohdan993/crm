import fetch from './fetchingDataClass'
import CountryPopup from '../Components/CountryPopup'
import {list, mount} from '../../../libs/libs'




const popup = list("form", CountryPopup, 'id')
mount(document.querySelector('#country-popup'), popup)


const getCountryPopup = async () => {

	try {
			const data = await fetch.getResourse('/employers/get_other/?s=4')
			const country = data.data.country
			popup.update(country);
	} catch (e) {
		console.error(e)
	}


}




export default getCountryPopup