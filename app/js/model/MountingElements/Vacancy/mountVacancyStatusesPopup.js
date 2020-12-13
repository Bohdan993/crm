import StagesOfVacanciesPopup from '../../Components/Vacancy/StagesOfVacanciesPopup'
import {list, mount} from '../../../../libs/libs'

const stagesPopup = document.querySelector('#status-popup')

const popup = list("form", StagesOfVacanciesPopup, 'id', 'vacancy')



let data = [
	{
		id: '1',
		name: 'Недоборы'
	},
	{
		id: '2',
		name: 'Отобраны'
	},
	{
		id: '3',
		name: 'Готовятся к подаче'
	},
	{
		id: '4',
		name: 'Ждут разрешения'
	},
	{
		id: '5',
		name: 'Готовятся к отъезду'
	},
	{
		id: '6',
		name: 'Трудоустроены'
	}
]




const mountVacancyStatusesPopup = () => {
					if(stagesPopup) {
						mount(stagesPopup, popup)
					}

				if(sessionStorage.getItem('stagesOfVacancies')) { 
						data = data.map(status => {
						let checked = !!~JSON.parse(sessionStorage.getItem('stagesOfVacancies')).split(',').indexOf(status.id)
						return {
							id: status.id,
							name: status.name,
							checked
						}
					})
				}

				popup.update(data)


}




export default mountVacancyStatusesPopup // to ../index.js