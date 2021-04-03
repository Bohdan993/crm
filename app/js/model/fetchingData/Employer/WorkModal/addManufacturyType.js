import fetch from '../../fetchingDataClass'
import getWorkModalManufacturyType from './getWorkModalManufacturyType'
import { toastr } from '../../../../../libs/libs'


const addManufacturyType = async (id) => {
			try {
				const production = await fetch.getResourse(`/employers/create_section/?id=${id}&target=production`)

				if(production.success === true) {
					toastr.success(`ID работодателя ${id}`, 'Успешно создан тип производства', {closeButton: false})
					getWorkModalManufacturyType(id, false, true)
				} else {
					throw new Error('Не возможно создать тип производства')
				}
	
				return Promise.resolve('ok')
			} catch(e) {
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}
}


export default addManufacturyType //to ../../../Components/Employer/WorkModal/WorkModalManufacturyType