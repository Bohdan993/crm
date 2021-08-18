import {el} from '../../../libs/libs'

export default class Option {
    constructor() {
        this.el = el('option', "Якась опція")
    }

    update(data) {
        this.el.textContent = data.name
        this.el.value = data.id
    }
}