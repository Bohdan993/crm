import fetch from '../../fetchingDataClass'
import getWorkModalManufacturyType from './getWorkModalManufacturyType'
import { toastr } from '../../../../../libs/libs'


const addManufacturyType = async (id) => {
			try {
				const production = await fetch.getResourse(`/employers/create_section/?id=${id}&target=production`)
				getWorkModalManufacturyType(id, false, true)
				// console.log(production)

				toastr.success(`ID работодателя ${id}`, 'Успешно создан тип производства', {closeButton: false})
			} catch(e) {
				console.error(e)
			}
}


export default addManufacturyType //to ../../../Components/Employer/WorkModal/WorkModalManufacturyType