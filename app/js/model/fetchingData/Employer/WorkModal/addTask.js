import fetch from '../../fetchingDataClass'
import getWorkModalTasks from './getWorkModalTasks'
import { toastr } from '../../../../../libs/libs'


const addTask = async ({
	id,
	str = 'employers'
} = {}) => {
			try {
				const tasks = await fetch.getResourse(`/employers/create_section/?id=${id}&target=task`)

				if(tasks.success === true) {
					toastr.success(`ID работодателя ${id}`, 'Успешно добавлена задача', {closeButton: false})
					getWorkModalTasks({id})
				} else {
					throw new Error('Не возможно добавить задачу')
				}

				return Promise.resolve('ok')

			} catch(e) {
				toastr.error(e, 'Возникла ошибка', {closeButton: true})
				return Promise.resolve('fail')
			}
}


export default addTask //to ../../../Components/TaskComponent