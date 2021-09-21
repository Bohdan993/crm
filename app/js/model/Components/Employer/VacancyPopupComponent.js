import {
    el,
    setAttr,
    list
} from '../../../../libs/libs'
import getEmployersList from '../../fetchingData/Employer/getEmployersList'
import CheckBoxVacancy from './CheckBoxComponent'

class CheckBoxVacancyEarlier {
    constructor() {
        this.el = el('fieldset',
            el('div.input-group',
                this.input = el('input', {
                    type: 'checkbox',
                    id: "earlier-chbx"
                }),
                this.label = el('label', 'Раніше пропонували вакансії', {
                    for: 'earlier-chbx'
                }),
            ))
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

        this.filter('vacancy_active', 'vacancyActiveFilter')
    }

    filter(str, storageKey) {
        this.input.addEventListener('change', filter)

        function filter(e) {
            if (!this.checked) {
                getEmployersList({
                    [str]: '0'
                })
                sessionStorage.setItem(storageKey, JSON.stringify(''))
            } else {
                getEmployersList({
                    [str]: '1'
                })
                sessionStorage.setItem(storageKey, JSON.stringify('1'))
            }
        }
    }
}


class VacancyPopupType {
    constructor() {

        this.el = el('fieldset',
            el('p', 'Тип вакансії'),
            el('div.input-group.radio-group-type-2',
                this.list = list('div.group', CheckBoxVacancy),
                this.list2 = list('div.group', CheckBoxVacancy)
            ),
            
        )


    }

    update(data, index, items, context) {
        this.data = data
        this.data.index = index


        const end = data.length
        // const middle = Math.ceil(end / 2)
        const prod1 = data.slice(0, 3)
        const prod2 = data.slice(3, end)

        this.list.update(prod1)
        this.list2.update(prod2)
    }
}


class VacancyPopupTerm {
    constructor() {

        this.el = el('fieldset',
            el('p', 'Термін вакансії'),
            el('div.input-group.radio-group-type-2.yellow',
                this.list1 = list('div.group', CheckBoxVacancy),
                this.list2 = list('div.group', CheckBoxVacancy)
            )
        )

    }

    update(data, index, items, context) {
        this.data = data
        this.data.index = index
        let data1 = data.slice(0, 3)
        let data2 = data.slice(3)
        this.list1.update(data1)
        this.list2.update(data2)
    }

}


export {
    CheckBoxVacancyEarlier,
    VacancyPopupType,
    VacancyPopupTerm
}