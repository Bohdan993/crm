import fetch from '../../fetchingDataClass'
import getWorkModalTasks from './getWorkModalTasks'
import {toastr} from '../../../../../libs/libs'


const deleteTask = async ({
                              id,
                              id_employer,
                              str = 'employers'
                          } = {}) => {
    try {

        const tasks = await fetch.getResourse(`/employers/delete_section/?section=${id}&target=task`)
        if (tasks.success === true) {
            toastr.success(`ID роботодавця ${id_employer}`, 'Успішно видалено завдання', {closeButton: false})
            getWorkModalTasks({id: id_employer})
        } else {
            toastr.error(`Не можливо видалити завдання`, 'Виникла помилка', {closeButton: true})
        }

    } catch (e) {
        console.error(e)
    }
}


export default deleteTask //to ../../../Components/Task