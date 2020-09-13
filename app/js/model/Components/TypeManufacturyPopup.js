	import {el, setAttr} from '../../../libs/libs'
  import CountryPopup from './CountryPopup'



  export default class TypeManufacturyPopup extends CountryPopup {
  	constructor(){
  		super()
  	}


  	update(data, index, items) {
  		



  		if(index < Math.ceil(items.length/2)) {

  		}


  		this.data = data
			this.data.index = index

			this.input.id = 'type-manufactury-chbx-' + data.id
			setAttr(this.label, {
				for: 'type-manufactury-chbx-' + data.id,
				innerText: data.name
			})
  	}
  }