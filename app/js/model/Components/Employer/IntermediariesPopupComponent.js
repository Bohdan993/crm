import {
    el,
    setAttr,
    list
} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/Employer/getEmployersList'

class RadioGroup {
    constructor() {
        this.data = ''
        this.el = el('div',
            this.input = el('input#show-rbtn', {
                type: 'radio',
                name: "intermediaries-rbtn"
            }),
            this.label = el('label', 'Показати', {
                for: 'show-rbtn'
            }),
        )

    }

    update(data) {

        setAttr(this.input, {
            id: data['data-id'],
            checked: data.checked
        })
        setAttr(this.label, {
            for: data['data-id'],
            innerText: data.label
        })

        this.data = data.id
    }

    filter(id, str, storageKey, e) {
        let $this = this
        filter()

        function filter() {
            //this - один чекбокс в попапе
            if ($this.input.checked) {
                getEmployersList({
                    [str]: id
                })
                if (id !== '') {
                    sessionStorage.setItem(storageKey, JSON.stringify(id))
                } else {
                    sessionStorage.removeItem(storageKey)
                }

            }
        }
    }

    onmount() {
        this.input.addEventListener('change', this.filter.bind(this, this.data, 'intermediary', 'intermediaryFilter'))
    }
}

class IntermediariesCheckbox {
    constructor() {
        this.el = el('div.input-group',
            this.input = el('input', {
                type: 'checkbox',
                id: 'chbx'
            }),
            this.label = el('label', {
                for: 'chbx'
            })
        )
    }

    update(data, index, items, context) {

        setAttr(this.input, {
            id: 'intermediary-chbx-' + data.id,
            checked: data.checked,
            'data-id': data.id
        })
        setAttr(this.label, {
            for: 'intermediary-chbx-' + data.id,
            innerText: data.name
        })

        this.data = data
        this.data.index = index
    }

    filter({
               id,
               str,
               storageKey,
               id2,
               str2,
               storageKey2
           }) {
        let $this = this

        filter()

        function filter(e) {

            //В свойство класса присваиваем массив данных который находится в sessionStorage по соответствующему ключу
            IntermediariesPopup.checkedArr = sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey)) !== '' ? JSON.parse(sessionStorage.getItem(storageKey)).split(',') : []
            //this - один чекбокс в попапе
            if ($this.input.checked) {
                IntermediariesPopup.checkedArr.push(id)
                getEmployersList({
                    [str]: IntermediariesPopup.checkedArr.join(','),
                    [str2 ? str2 : '']: id2
                })
                sessionStorage.setItem(storageKey, JSON.stringify(IntermediariesPopup.checkedArr.join(',')))
                storageKey2 ? sessionStorage.setItem(storageKey2, JSON.stringify(id2)) : null
            } else {
                IntermediariesPopup.checkedArr = IntermediariesPopup.checkedArr.filter(el => el !== id)

                getEmployersList({
                    [str]: IntermediariesPopup.checkedArr.join(','),
                    [str2 ? str2 : '']: (IntermediariesPopup.checkedArr.length) === 0 ? "" : null
                })

                sessionStorage.setItem(storageKey, JSON.stringify(IntermediariesPopup.checkedArr.join(',')))
                storageKey2 ? sessionStorage.setItem(storageKey2, JSON.stringify(IntermediariesPopup.checkedArr.length === 0 ? "" : id2)) : null
            }
        }
    }

}


export default class IntermediariesPopup {
    constructor() {

        this.el = el('form',
            this.list1 = list(".input-group.radio-group-type-1", RadioGroup, 'id'),
            this.list2 = list("div", IntermediariesCheckbox, 'id'))

    }

    update(data) {

        let $this = this
        this.list1.update(data.radioGroupData)
        this.list2.update(data.intermediaries)

        this.checkedArr = Array(this.list2.views.length).fill('')
        this.getItemsLocalStorage().intermediaries.forEach(el => {
            if (el !== '') {
                this.checkedArr[+el - 1] = '1'
            }
        })


        this.list2.views.forEach((view, ind) => {
            view.input.addEventListener('change', function (e) {

                let dataAttr = this.getAttribute('data-id')


                if (this.checked) {
                    $this.checkedArr[ind] = '1'
                } else {
                    $this.checkedArr[ind] = ''
                }


                let flag = $this.checkedArr.some(el => {
                    return el !== ''
                })


                let flag2 = $this.list1.views.some(el => {
                    return el.input.checked
                })


                if (!flag2 && flag) {
                    $this.list1.views[0].input.checked = true
                    view.filter({
                        id: dataAttr,
                        str: 'intermediaries',
                        storageKey: 'intermediariesFilter',
                        id2: '1',
                        str2: 'intermediary',
                        storageKey2: 'intermediaryFilter'
                    })
                } else {
                    view.filter({
                        id: dataAttr,
                        str: 'intermediaries',
                        storageKey: 'intermediariesFilter',
                        id2: '1',
                        str2: 'intermediary',
                        storageKey2: 'intermediaryFilter'
                    })
                }

                if (!flag) {
                    $this.list1.views.forEach(el => {
                        el.input.checked = false
                    })
                }


            })
        })

        this.data = data
    }

    getItemsLocalStorage() {
        let intermediaries = JSON.parse(sessionStorage.getItem('intermediariesFilter')) || ''
        intermediaries = intermediaries.split(',')

        return {
            intermediaries
        }
    }

}