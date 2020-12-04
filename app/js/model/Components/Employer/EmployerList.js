import {el, setAttr, list} from '../../../../libs/libs'
import RowEmployer from './EmployerRow'

import initWorkPopup from '../../initWorkPopup'

// import employerListUpdateEvent from '../../CustomEvents/EmployerListUpdateEvent'


export default class EmployerList {
    constructor() {
    	this.count = 0
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer)

        this.flag = false

    }
    update(data) {

    	// this.count = data.length ? data[data.length - 1]['id_employer'] : ''
        // localStorage.setItem('countForModals', JSON.stringify(this.count))

        this.list.update(data)
        // console.log(this.count)
        //Инициализация функций которые зависят от инстанса класса
         if(!this.flag) {
           initWorkPopup()
            this.flag = true
        }
        
        //
    }

    onmount() {
  
    }
}