import fetch from '../../fetchingDataClass'
import Task from '../../../Components/TaskComponent'

// import Loader from '../../../Components/Loader'
import {list, mount, place} from '../../../../../libs/libs'
import {sidebarEmployerForm, sidebarVacancyForm} from '../../../../view'


const task = new Task('employer')
const task2 = new Task('vacancy')


if (sidebarEmployerForm) {
    mount(sidebarEmployerForm, task)
}

if (sidebarVacancyForm) {
    mount(sidebarVacancyForm, task2)
}


const getWorkModalTasks = async ({
                                     id = '1',
                                     p = 1,
                                     t = 5,
                                     loading,
                                     showing,
                                     deleating,
                                     adding,
                                 } = {}) => {


    try {

        const data = await fetch.getResourse(`/employers/get/?id=${id}&section=2&other=6`)

        if (data.success) {

            const tasks = data.data.other.task

            const tasksData = {
                tasks,
                id
            }


            if (sidebarEmployerForm) {
                task.update(tasksData)
            }


            if (sidebarVacancyForm) {
                task2.update(tasksData)
            }

        } else {
            if (sidebarVacancyForm) {
                task2.update([])
            }
        }


    } catch (e) {
        console.error(e)
    }
// }	

}


export default getWorkModalTasks 		//to ../../../Components/EmployersRow.js