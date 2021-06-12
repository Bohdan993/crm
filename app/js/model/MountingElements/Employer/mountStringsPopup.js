import {
    StringsPopup
} from '../../Components/Employer/ManagerPopup'
import {
    mount
} from '../../../../libs/libs'



const managersPopup = document.querySelector('#managers-popup form')

//Пример заполнения этого массива в файле mountVacancyPopup.js

let stringsData = [
    {
        id: 'call-anwer-chbx',
        label: 'Автоответчик',
        name: 'call-anwer', //*comment* Значение поля которое отправляется на сервер
        //*comment* str: "Ключ поля которое будет отпралятся на сервер",
        //*comment* filter: "Ключ по которому хранится фильтр в SessionStorage. Нужен для того, чтобы при перезагрузке страницы фильтр не сбрасывался.
        //*comment* Он будет одинаковый у всех объектов в этом массиве"

    },
    {
        id: 'no-eng-chbx',
        label: 'Не знает англ',
        name: 'no-eng'
    },
    {
        id: 'no-answer-chbx',
        label: 'Недозвон',
        name: 'no-answer'
    },
    {
        id: 'email-send-chbx',
        label: 'Отправил email',
        name: 'email-send'
    },
    {
        id: 'partner-chbx',
        label: 'Партнер',
        name: 'partner'
    },
    {
        id: 'recall-chbx',
        label: 'Перезвон',
        name: 'recall'
    },
    {
        id: 'dont-call-chbx',
        label: 'Не звонить',
        name: 'dont-call'
    },

]



const strings = new StringsPopup()


if (managersPopup) {
    mount(managersPopup, strings)
}

const mountStringsPopup = () => {

    if (managersPopup) {


        // if (sessionStorage.getItem('stringsFilter')) {
        //     stringsData = stringsData.map(data => {
        //         let checked = !!~JSON.parse(sessionStorage.getItem('stringsFilter')).split(',').indexOf(data.name)
        //         return {
        //             label: data.label,
        //             id: data.id,
        //             name: data.name,
        //             str: 'vacancy_type',
        //             filter: 'stringsFilter', //*comment* Тут нужно подставить правильное название ключа,которое ты прописывал для каждого объекта в массиве stringsData
        //             checked
        //         }
        //     })
        // } else {
        //     stringsData = stringsData.map(data => {
        //         return {
        //             label: data.label,
        //             id: data.id,
        //             name: data.name,
        //             str: 'vacancy_type',
        //             filter: 'stringsFilter', //*comment* Тут нужно подставить правильное название ключа,которое ты прописывал для каждого объекта в массиве stringsData
        //         }
        //     })
        // }


        strings.update(stringsData)


    }
}




export default mountStringsPopup