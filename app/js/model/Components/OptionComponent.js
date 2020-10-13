import {el} from '../../../libs/libs'

export default class Option {
    constructor() {
        this.el = el('option', "Какая то опция")
    }
    update(data) {
        this.el.textContent = data.name
        this.el.value = data.id
    }
}