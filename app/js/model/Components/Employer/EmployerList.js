import {el, setAttr, list} from '../../../../libs/libs'
import RowEmployer from './EmployerRow'

import initWorkPopup from '../../initWorkPopup'

// import employerListUpdateEvent from '../../CustomEvents/EmployerListUpdateEvent'


export default class EmployerList {
    constructor() {
    	this.count = 0
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')
    }
    update(data) {

        console.log(data)

        

    	this.count = data[data.length - 1]['id_employer']
        localStorage.setItem('countForModals', JSON.stringify(this.count))

        // console.log(this.count)

        // employerListUpdateEvent.detail.count = this.count
        // document.dispatchEvent(employerListUpdateEvent)

        this.list.update(data);

        //Инициализация функций которые зависят от инстанса класса
        initWorkPopup(this.count)
        //
    }

    onmount() {
  
    }
}