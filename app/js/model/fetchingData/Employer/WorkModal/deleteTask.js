import fetch from '../../fetchingDataClass'
import getWorkModalTasks from './getWorkModalTasks'
import { toastr } from '../../../../../libs/libs'


const deleteTask = async ({
	id, 
	id_employer,
	str = 'employers'
	} = {}) => {
			try {

				const tasks = await fetch.getResourse(`/employers/delete_section/?section=${id}&target=task`)
				if(tasks.success === true) {
					toastr.success(`ID работодателя ${id_employer}`, 'Успешно удалена задача', {closeButton: false})
					getWorkModalTasks({id: id_employer})
				} else {
					toastr.error(`Не возможно удалить задачу`, 'Возникла ошибка', {closeButton: true})
				}

			} catch(e) {
				console.error(e)
			}
}


export default deleteTask //to ../../../Components/Task