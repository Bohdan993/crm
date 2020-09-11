import {el, setAttr, list} from '../../../libs/libs'
import RowEmployer from './EmployerRow'

import initWorkPopup from '../initWorkPopup'


export default class EmployerList {
    constructor() {
    		this.show = false
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')
    }
    update(data) {

      this.list.update(data);
      
      // if(!this.show) {
      	initWorkPopup()
      	// this.show = true
      // }
      
    }

    onmount() {
  
    }
}