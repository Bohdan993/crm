import fetch from '../../fetchingDataClass'
import { toastr } from '../../../../../libs/libs'


const addTask = async ({
	id,
	str = 'employers'
} = {}) => {
			try {
				const tasks = await fetch.getResourse(`/${str}/create_section/?id=${id}&target=task`)
				if(tasks.success === true) {
					toastr.success(`ID работодателя ${id}`, 'Успешно удалена задача', {closeButton: false})
				} else {
					toastr.error(`Не возможно удалить задачу`, 'Возникла ошибка', {closeButton: true})
				}

			} catch(e) {
				console.error(e)
			}
}


export default addTask //to ../../../Components/TaskComponent