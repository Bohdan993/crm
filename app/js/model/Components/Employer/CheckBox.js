import {
    el,
    setAttr
} from '../../../../libs/libs'

import getEmployersList from '../../fetchingData/Employer/getEmployersList'

export default class CheckBox {
    constructor(type) {
        this.type = type
        this.el = el('div.input-group',
            this.input = el('input', {
                type: 'checkbox',
                id: "#"
            }),
            this.label = el('label', 'Чекбокс', {
                for: '#'
            }),
        )
    }

    update(data, index, items, context) {
        setAttr(this.input, {
            id: data.id,
            checked: data.checked
        })
        setAttr(this.label, {
            for: data.id,
            innerText: data.label
        })

        this.filter(data.name, data.str, data.filter)
    }



    //*comment* В этом методе тебе нужно будет реализовать идентичный функционал для списка вакансий. Ориентируйся на поле this.type и в зависимости от него 
    //*comment* вызывай либо getEmployerList либо getVacancyList
    filter(id, str, storageKey) {
        //@param id - id соответствующего чекбокса, который прилетает с сервака
        //@param str - поле объекта параметра функции getEmployersList, которая выводит список работодателей
        //@param storageKey - ключ в sessionStorage по которому хранится список checked чекбоксов из попапа
        this.input.addEventListener('change', filter)

        function filter(e) {
            //В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
            CheckBox.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
            //this - один чекбокс в попапе
            if (this.checked) {
                CheckBox.checkedArr.push(id)
                getEmployersList({
                    [str]: CheckBox.checkedArr.join(',')
                })

                sessionStorage.setItem(storageKey, JSON.stringify(CheckBox.checkedArr.join(',')))
            } else {
                CheckBox.checkedArr = CheckBox.checkedArr.filter(el => el !== id)
                getEmployersList({
                    [str]: CheckBox.checkedArr.join(',')
                })
                sessionStorage.setItem(storageKey, JSON.stringify(CheckBox.checkedArr.join(',')))
            }
        }

    }
}