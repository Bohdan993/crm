import {el, setAttr, list} from '../../../libs/libs'
import RowEmployer from './EmployerRow'
export default class EmployerList {
    constructor() {
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')
    }
    update(data) {
        this.list.update(data);
    }

    onmount() {
    	// getEmployersList()
    	console.log('mounted')
    }
}