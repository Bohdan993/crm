import fetch from './fetchingDataClass'
import {
    list,
    mount
} from '../../../libs/libs'


export default class GetManagers {
    constructor(type, selector, element, str = 'employer') {
        this.type = type
        this.selector = this.__getDOMNode(selector)
        this.element = new element(str)
        this.__mountElement(this.selector, this.element)

    }


    __getDOMNode(str) {
        return document.querySelector(str)
    }


    __mountElement(selector, el) {
        if (selector) {
            mount(selector, el)
        }
    }


    async fetchData(filter, key) {
        if (this.selector) {

            try {
                const data = await fetch.getResourse(`/${this.type}/get_other/?s=1`)
                let managers = data.data.managers

                if (sessionStorage.getItem(filter)) {
                    managers = managers.map(manager => {
                        let checked = !!~JSON.parse(sessionStorage.getItem(filter)).split(',').indexOf(manager.id)
                        return {
                            id: manager.id,
                            name: manager.name,
                            color: manager.color,
                            checked
                        }
                    })
                } else {
                    managers = managers.map(manager => {
                        return {
                            id: manager.id,
                            name: manager.name,
                            color: manager.color,
                        }
                    })
                }

                localStorage.setItem(key, JSON.stringify(managers))
                this.element.update(managers)

            } catch (e) {
                console.error(e)
            }
        }
    }

}