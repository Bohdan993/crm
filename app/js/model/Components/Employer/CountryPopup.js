import {el, setAttr} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/getEmployersList'

let checkedCountries = []

export default class CountryPopup {
	constructor(){
		this.el = el('div.input-group', 
			this.input = el('input', {
				type: 'checkbox',
				id: 'chbx'
			}),
			this.label = el('label' ,{
				for: 'chbx'
			})
			)
	}

	 update(data, index, items, context) {
	 		// console.log(data)
		
			setAttr(this.input, {
				id: 'country-chbx-' + data.id,
			})
			setAttr(this.label, {
				for: 'country-chbx-' + data.id,
				innerText: data.name
			})

			this.filterCountry(data.id)


			this.data = data
			this.data.index = index
	}


	filterCountry(id){
		this.input.addEventListener('change', filterCountry)

		function filterCountry(e){
			if(this.checked) {
				checkedCountries.push(id)
				getEmployersList({country: checkedCountries.join(',')})
			} else {
				checkedCountries = checkedCountries.filter(el => el !== id)
				getEmployersList({country: checkedCountries.join(',')})
			}
		}
		
	}


}

