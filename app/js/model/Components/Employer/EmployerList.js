import {el, setAttr, list} from '../../../../libs/libs'
import RowEmployer from './EmployerRow'

import initWorkPopup from '../../initWorkPopup'


export default class EmployerList {
    constructor() {
    	this.count = 0
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')
    }
    update(data) {

    	this.count = data[data.length - 1]['id_employer']
        this.list.update(data);
        initWorkPopup(this.count)
    }

    onmount() {
  
    }
}