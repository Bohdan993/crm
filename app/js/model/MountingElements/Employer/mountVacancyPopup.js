import {
    CheckBoxVacancyEarlier,
    VacancyPopupType,
    VacancyPopupTerm
} from '../../Components/Employer/VacancyPopupComponent'
import {mount} from '../../../../libs/libs'


const vacanciesPopup = document.querySelector('#vacancies-popup form')


let checkBoxData = {
    id: 'vacancy-earlier-chbx',
    label: 'Раніше надавали вакансії',
    name: '1'
}


let part1Data = [
    {
        id: 'season-chbx',
        label: 'Сезонна',
        name: 'season',
        str: 'vacancy_type',
        filter: 'vacancyTypeFilter'
    },
    {
        id: 'practice-chbx',
        label: 'Практика',
        name: 'practics',
        str: 'vacancy_type',
        filter: 'vacancyTypeFilter'
    },
    {
        id: 'work-chbx',
        label: 'Робоча',
        name: 'job',
        str: 'vacancy_type',
        filter: 'vacancyTypeFilter'
    },
    {
        id: 'holydays-chbx',
        label: 'Канікули',
        name: 'holydays',
        str: 'vacancy_type',
        filter: 'vacancyTypeFilter'
    }
]

let part2Data = [
    {
        id: '3mnth-chbx',
        label: 'до 3 міс',
        name: '0-3',
        str: 'vacancy_term',
        filter: 'vacancyTermFilter'
    },
    {
        id: '3-6mnth-chbx',
        label: '3 - 6 міс',
        name: '3-6',
        str: 'vacancy_term',
        filter: 'vacancyTermFilter'
    },
    {
        id: '6-9mnth-chbx',
        label: '6 - 9 міс',
        name: '6-9',
        str: 'vacancy_term',
        filter: 'vacancyTermFilter'
    },
    {
        id: '9-12mnth-chbx',
        label: '9 - 12 міс',
        name: '9-12',
        str: 'vacancy_term',
        filter: 'vacancyTermFilter'
    },
    {
        id: '12mnth-chbx',
        label: '12 +',
        name: '12',
        str: 'vacancy_term',
        filter: 'vacancyTermFilter'
    }
]

const checkBox = new CheckBoxVacancyEarlier()
const popupPart1 = new VacancyPopupType()
const popupPart2 = new VacancyPopupTerm()


if (vacanciesPopup) {
    mount(vacanciesPopup, checkBox)
    mount(vacanciesPopup, popupPart1)
    mount(vacanciesPopup, popupPart2)
}

const mountVacancyPopup = () => {
    if (vacanciesPopup) {

        if (sessionStorage.getItem('vacancyTypeFilter')) {
            part1Data = part1Data.map(data => {
                let checked = !!~JSON.parse(sessionStorage.getItem('vacancyTypeFilter')).split(',').indexOf(data.name)
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'vacancy_type',
                    filter: 'vacancyTypeFilter',
                    checked
                }
            })
        } else {
            part1Data = part1Data.map(data => {
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'vacancy_type',
                    filter: 'vacancyTypeFilter',
                }
            })
        }


        if (sessionStorage.getItem('vacancyTermFilter')) {
            part2Data = part2Data.map(data => {
                let checked = !!~JSON.parse(sessionStorage.getItem('vacancyTermFilter')).split(',').indexOf(data.name)
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'vacancy_term',
                    filter: 'vacancyTermFilter',
                    checked
                }
            })
        } else {
            part2Data = part2Data.map(data => {
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'vacancy_term',
                    filter: 'vacancyTermFilter',
                }
            })
        }


        if (sessionStorage.getItem('vacancyActiveFilter')) {
            let checked = JSON.parse(sessionStorage.getItem('vacancyActiveFilter')) === checkBoxData.name
            checkBoxData = {
                ...checkBoxData,
                checked
            }
        }

        checkBox.update(checkBoxData)
        popupPart1.update(part1Data)
        popupPart2.update(part2Data)


    }
}


export default mountVacancyPopup