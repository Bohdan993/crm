










import fetch from './fetchingDataClass'
import TypeManufacturyPopup from '../Components/TypeManufacturyPopup'
import {list, mount} from '../../../libs/libs'




const part1 = list("fieldset", TypeManufacturyPopup, 'id')
const part2 = list("fieldset", TypeManufacturyPopup, 'id')
mount(document.querySelector('#type-manufactury-popup .flex-form'), part1)
mount(document.querySelector('#type-manufactury-popup .flex-form'), part2)


const getManufacturyTypePopup = async () => {
		console.log(new TypeManufacturyPopup())
	try {
			const data = await fetch.getResourse('/employers/get_other/?s=3')
			const production = data.data.production

			const end = production.length
			const middle = Math.ceil(end/2)

			const prod1 = production.slice(0, middle)
			const prod2 = production.slice(middle, end)


			part1.update(prod1)
			part2.update(prod2)

	} catch (e) {
		console.error(e)
	}


}




export default getManufacturyTypePopup