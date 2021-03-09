import fetch from './fetchingDataClass'
import { toastr } from '../../../libs/libs'
import storage from '../Storage/globalEmployers'


const deleteElement = async ({
	str,
	id
} = {}) => {

			try {
				const fields = await fetch.getResourse(`/${str}/delete/?id=${id}`)
				if(fields.success === true) {
					// str === 'employers' ? getEmployersList() : ''
					toastr.success(`ID ${str === 'employers' ? 'работодателя' : 'вакансии'} ${id}`, 'Успешно удалена запись', {closeButton: false})
					// str === 'employers' ? storage : ''
				} else {
					throw new Error('Не возможно удалить запись')
				}

				return Promise.resolve({status: 'ok', id})
			} catch(e) {
				
				toastr.error(e.message, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve({status: 'fail'})
			}

}


export default deleteElement  //to ../../../Components/DeleteComponent
