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
            const instance = MicroModal.show('modal-1', {
                onClose: modal => {
                    updateURL(window.location.pathname)
                    document.dispatchEvent(employerModalCloseEvent)

                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                    wrapper.removeEventListener('mousedown', this.closeModal)
                    modalClose.removeEventListener('click', this.close)
                },
                onShow: (modal, node) => {

                    if (id_employer) {
                        const wrapper = modal.querySelector('.my-modal-wrapper')
                        const modalClose = modal.querySelector('.modal__close')


                        setTimeout(
							() => {
								this.addMouseUpTrigger = addMouseUpTrigger
								this.closeModal = closeModal.bind(null, modal.id, instance)
								this.close = close.bind(null, modal.id, instance)

								wrapper.addEventListener('mouseup', this.addMouseUpTrigger)
								wrapper.addEventListener('mousedown', this.closeModal)
								modalClose.addEventListener('click', this.close)
						}, 0)
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