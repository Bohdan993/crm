import  ArchiveActive from '../../Components/Vacancy/ActiveArchiveComponent'
import { archiveActive } from '../../../view/vacancy'
import {list, mount} from '../../../../libs/libs'


const arcAct = new ArchiveActive()


let data = [
			{
				type: 'checkbox',
				id: 'current-chbx',
				checked: true,
				text: 'Текущие',
				filter: 1
			},
			{
				type: 'checkbox',
				id: 'archive-chbx',
				checked: false,
				text: 'Архивные',
				filter: 1
			}
		]

const mountActiveArchive = () => {

	if(archiveActive) {
		mount(archiveActive, arcAct)
	}

	let sessionActive = sessionStorage.getItem('activeVacancyFilter')
	let sessionArchive = sessionStorage.getItem('archiveVacancyFilter')

	if(sessionActive && sessionArchive) { 
					data = data.map((status, ind) => {
	 				let checked = !!JSON.parse(sessionArchive)
	 				let checked2 = !!JSON.parse(sessionActive)
	 				return {
						id: status.id,
						type: status.type,
						text: status.text,
						filter: status.filter,
						checked: ind === 0 ? checked2 : checked
	 				}
	 			})
	 		}

		arcAct.update(data)
}




export default  mountActiveArchive // to ../../index.js