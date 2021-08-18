import {axios} from '../../../libs/libs'

class FetchingData {
    constructor() {
        this._baseUrl = `https://crm.unicorn-exp.com`
    }


    async getResourse(url = '') {
        const res = await axios.get(`${this._baseUrl}${url}`)

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, received ${res.status} error`)
        }

        const body = res.data
        return body
    }

    async postResourse(url = '', data = {}, config = {}) {
        const res = await axios.post(`${this._baseUrl}${url}`, data, config)

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, received ${res.status} error`)
        }

        const body = res.data
        return body
    }
}

const fetch = new FetchingData()


export default fetch


