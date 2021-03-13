import fetch from '../../fetchingDataClass'
import WorkModalManufacturyType from '../../../Components/Employer/WorkModal/WorkModalManufacturyType'

import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'

const state = {}

const manufacturyType = document.querySelector('.row.manufactury-type')


const loader = place(Loader)




const workModalManufacturyType = new WorkModalManufacturyType()




if(manufacturyType) {
	mount(manufacturyType, workModalManufacturyType)
	mount(manufacturyType, loader)
}





const getWorkModalManufacturyType = async (id = '1', loading = true, adding = false) => {

	if(manufacturyType) {

		if(loading) {
			loader.update(true)
			workModalManufacturyType.setHiddenClass().setEmptyLayer()
		}
		
		

	try {

			// const delay = await sleep(15000)
			const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=1`)
			const otherPart = data.data.other
			// console.log(data2)
			const production = {id: id, data: otherPart.production }

			console.log(adding)
			// if(state.id !== id) {
				workModalManufacturyType.update(production, {adding})
			// }

			if(loading) {
				loader.update(false)
				workModalManufacturyType.removeHiddenClass()
			}
			
			state.id = id
		}catch(e) {
			console.error(e)
		}
}

}


export default getWorkModalManufacturyType 		//to ../../../Components/EmployersRow.js