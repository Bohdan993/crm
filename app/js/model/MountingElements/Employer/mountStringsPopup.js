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
        name: 'answerphone', //*comment* Значение поля которое отправляется на сервер
        str: 'marks',
        filter: 'marksFilter',
        //*comment* str: "Ключ поля которое будет отпралятся на сервер",
        //*comment* filter: "Ключ по которому хранится фильтр в SessionStorage. Нужен для того, чтобы при перезагрузке страницы фильтр не сбрасывался.
        //*comment* Он будет одинаковый у всех объектов в этом массиве"

    },
    {
        id: 'no-eng-chbx',
        label: 'Не знает англ',
        name: 'not_english',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'no-answer-chbx',
        label: 'Недозвон',
        name: 'not_ringing',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'email-send-chbx',
        label: 'Отправил email',
        name: 'send_email',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'partner-chbx',
        label: 'Партнер',
        name: 'partner',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'recall-chbx',
        label: 'Перезвон',
        name: 'return_call',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'dont-call-chbx',
        label: 'Не звонить',
        name: 'not_call',
        str: 'marks',
        filter: 'marksFilter',
    },
    {
        id: 'dont-mark-chbx',
        label: 'Нет меток',
        name: 'not_mark',
        str: 'marks',
        filter: 'marksFilter',
    },
]



const strings = new StringsPopup()


if (managersPopup) {
    mount(managersPopup, strings)
}

const mountStringsPopup = () => {

    if (managersPopup) {


        if (sessionStorage.getItem('stringsFilter')) {
            stringsData = stringsData.map(data => {
                let checked = !!~JSON.parse(sessionStorage.getItem('stringsFilter')).split(',').indexOf(data.name)
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'marks',
                    filter: 'marksFilter', //*comment* Тут нужно подставить правильное название ключа,которое ты
                    // прописывал для каждого объекта в массиве stringsData
                    checked
                }
            })
        } else {
            stringsData = stringsData.map(data => {
                return {
                    label: data.label,
                    id: data.id,
                    name: data.name,
                    str: 'marks',
                    filter: 'marksFilter', //*comment* Тут нужно подставить правильное название ключа,которое ты прописывал для каждого объекта в массиве stringsData
                }
            })
        }


        strings.update(stringsData)


    }
}




export default mountStringsPopup