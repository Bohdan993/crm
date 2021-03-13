import {el, setAttr, list} from '../../../../libs/libs'
import RowEmployer from './EmployerRow'

// import initWorkPopup from '../../initWorkPopup'

import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import getEmployersList from '../../fetchingData/Employer/getEmployersList'

// import switchModalParts from '../../switchModalParts'
import {modalSwitchers, modalParts} from '../../../view'
import {
    addMouseUpTrigger,
    closeModal,
    getAllUrlParams,
    close
} from '../../helper'


// import employerListUpdateEvent from '../../CustomEvents/EmployerListUpdateEvent'
let flag = false


export default class EmployerList {
    constructor() {
    	this.count = 0
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')

        this.flag = false

    }
    update(data) {


    	// this.count = data.length ? data[data.length - 1]['id_employer'] : ''
        // localStorage.setItem('countForModals', JSON.stringify(this.count))

        this.list.update(data)
        // console.log(this.count)
        //Инициализация функций которые зависят от инстанса класса
         if(!this.flag) {
           // initWorkPopup()
            this.flag = true
        }
    }

    onmount() {

        let id_employer = getAllUrlParams().id
        if(id_employer) {
        let modalInstance = MicroModal.show('modal-1', {
              onClose: modal => {
                getEmployersList({filtered: JSON.parse(sessionStorage.getItem('employersFiltered'))})
              },
              onShow: (modal, node) => {
                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    if(!flag) {

                      wrapper.removeEventListener('mouseup', addMouseUpTrigger)
                      wrapper.removeEventListener('mousedown', closeModal.bind(null, modal.id))
                      modalClose.removeEventListener('click', close.bind(null, modal.id))

                      wrapper.addEventListener('mouseup', addMouseUpTrigger)
                      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
                      modalClose.addEventListener('click', close.bind(null, modal.id))

                      flag = true
                    }

                    // switchModalParts(modalSwitchers, modalParts, false)('#employer-data', '[data-part="employer-data"]')
                  }
            })
            console.log(modalInstance)
            getWorkModalInfo(id_employer)
            getWorkModalManufacturyType(id_employer)
            getWorkModalMedia({id: id_employer, loading: true})
            getWorkModalContactHistory({id:id_employer, loading: true })
            getWorkModalVacancyHistory({id:id_employer, loading: true })
            getWorkModalFeedback({id:id_employer, loading: true, other: 5, str: 'employers' })
            getWorkModalTasks({id: id_employer})
        }
  
    }
}