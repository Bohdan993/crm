import ArchiveActive from '../../Components/Vacancy/ActiveArchiveComponent'
import {archiveActive} from '../../../view/vacancy'
import {mount} from '../../../../libs/libs'


const arcAct = new ArchiveActive()


let sessionActive = sessionStorage.getItem('activeVacancyFilter')
let sessionArchive = sessionStorage.getItem('archiveVacancyFilter')

let data = [
    {
        type: 'checkbox',
        id: 'current-chbx',
        checked: true,
        text: 'Поточні',
        filter: 1,
        str: 'active',
        storageKey: 'activeVacancyFilter'
    },
    {
        type: 'checkbox',
        id: 'archive-chbx',
        checked: false,
        text: 'Архівні',
        filter: 0,
        str: 'archive',
        storageKey: 'archiveVacancyFilter'
    }
]

const mountActiveArchive = () => {

    if (archiveActive) {
        mount(archiveActive, arcAct)
    }


    if (sessionActive && sessionArchive) {
        data = data.map((status, ind) => {
            let checked = !!JSON.parse(sessionArchive)
            let checked2 = !!JSON.parse(sessionActive)

            return {
                id: status.id,
                type: status.type,
                text: status.text,
                filter: status.filter,
                str: status.str,
                storageKey: status.storageKey,
                checked: ind === 0 ? checked2 : checked
            }
        })
    }

    arcAct.update(data)
}


export default mountActiveArchive // to ../../index.js