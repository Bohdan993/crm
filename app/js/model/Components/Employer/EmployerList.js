import {
    el,
    list
} from '../../../../libs/libs'
import RowEmployer from './EmployerRow'

import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
// import getEmployersList from '../../fetchingData/Employer/getEmployersList'


import {
    addMouseUpTrigger,
    closeModal,
    getAllUrlParams,
    close,
    updateURL
} from '../../helper'

import employerModalCloseEvent from '../../CustomEvents/employerModalCloseEvent'


let flag = false


function employerlistdatafetchedeventHandler(id_employer, e) {
    getWorkModalFeedback({
        id: id_employer,
        loading: true,
        other: 5,
        str: 'employers'
    })
}


export default class EmployerList {
    constructor() {
        this.count = 0
        this.el = el("div.rows.worker-rows")
        this.list = list(this.el, RowEmployer, 'id_employer')

    }
    update(data) {

        this.list.update(data)

    }

    onmount() {

        let id_employer = getAllUrlParams().id
        if (id_employer) {
            let modalInstance = MicroModal.show('modal-1', {
                onClose: modal => {
                    updateURL(window.location.pathname)
                    document.dispatchEvent(employerModalCloseEvent)
                },
                onShow: (modal, node) => {
                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    if (!flag) {

                        wrapper.removeEventListener('mouseup', addMouseUpTrigger)
                        wrapper.removeEventListener('mousedown', closeModal.bind(null, modal.id))
                        modalClose.removeEventListener('click', close.bind(null, modal.id))

                        wrapper.addEventListener('mouseup', addMouseUpTrigger)
                        wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
                        modalClose.addEventListener('click', close.bind(null, modal.id))

                        flag = true
                    }

                }
            })

            getWorkModalInfo(id_employer)
            getWorkModalManufacturyType(id_employer)
            getWorkModalMedia({
                id: id_employer,
                loading: true
            })
            getWorkModalContactHistory({
                id: id_employer,
                loading: true
            })
            getWorkModalVacancyHistory({
                id: id_employer,
                loading: true
            })

            getWorkModalTasks({
                id: id_employer
            })

            document.addEventListener('employerlistdatafetchedevent', employerlistdatafetchedeventHandler.bind(null, id_employer))
        }

    }
}