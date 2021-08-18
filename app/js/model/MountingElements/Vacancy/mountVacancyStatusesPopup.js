import StagesOfVacanciesPopup from '../../Components/Vacancy/StagesOfVacanciesPopup'
import {list, mount} from '../../../../libs/libs'

const stagesPopup = document.querySelector('#status-popup')

const popup = list("form", StagesOfVacanciesPopup, 'id', 'vacancy')


let data = [
    {
        id: '1',
        name: 'Недобори'
    },
    {
        id: '2',
        name: 'Відібрані'
    },
    {
        id: '3',
        name: 'Готуються до подачі'
    },
    {
        id: '4',
        name: 'Чекають рішення'
    },
    {
        id: '5',
        name: 'Готуються до виїзду'
    },
    {
        id: '6',
        name: 'Працевлаштовані'
    }
]


const mountVacancyStatusesPopup = () => {
    if (stagesPopup) {
        mount(stagesPopup, popup)
    }

    if (sessionStorage.getItem('stagesOfVacancies')) {
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