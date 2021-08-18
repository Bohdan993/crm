import {el, setAttr} from '../../../../libs/libs'


export default class Numbers {
    constructor() {
        this.el = el('div.sidebar__info',
            el('p.sidebar__needed', 'Потрібно робітників: ',
                this.totalN = el('span')),
            el('p.sidebar__full-number', 'Робочих місць: ',
                this.total = el('span')),
            el('p.sidebar__current', 'Поточних вакансій: ',
                this.totalC = el('span'))
        )
    }

    update(data) {

        setAttr(this.total, {
            innerText: data.total
        })


        setAttr(this.totalN, {
            innerText: data.totalN
        })


        setAttr(this.totalC, {
            innerText: data.totalC
        })

    }
}