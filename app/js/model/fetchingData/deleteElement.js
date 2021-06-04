import fetch from './fetchingDataClass'
import {
	toastr
} from '../../../libs/libs'


const deleteElement = async ({
	str,
	id
} = {}) => {

	try {
		const fields = await fetch.getResourse(`/${str}/delete/?id=${id}`)
		if (fields.success === true) {
			toastr.success(`ID ${str === 'employers' ? 'работодателя' : 'вакансии'} ${id}`, 'Успешно удалена запись', {
				closeButton: false
			})
		} else {
			throw new Error('Не возможно удалить запись')
		}

		return Promise.resolve({
			status: 'ok',
			id
		})
	} catch (e) {

		toastr.error(e.message, 'Возникла ошибка', {
			closeButton: true
		})
		return Promise.resolve({
			status: 'fail'
		})
	}

}


export default deleteElement //to ../../../Components/DeleteComponent