import fetch from '../../fetchingDataClass'
import getWorkModalManufacturyType from './getWorkModalManufacturyType'
import { toastr } from '../../../../../libs/libs'


const deleteManufacturyType = async (id, id_employer) => {
			try {
				const production = await fetch.getResourse(`/employers/delete_section/?section=${id}&target=production`)
				if(id_employer) {
					getWorkModalManufacturyType(id_employer, false)
					if(production.success === true) {
						toastr.success(`ID работодателя ${id_employer}`, 'Успешно удален тип производства', {closeButton: false})
					} else {
						toastr.error(`Не возможно удалить тип производства`, 'Возникла ошибка', {closeButton: true})
					}
				}
			} catch(e) {
				console.error(e)
			}
}


export default deleteManufacturyType //to ../../../Components/Employer/WorkModal/WorkModalManufacturyType