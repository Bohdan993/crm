import {
    el,
    list,
    MicroModal
} from '../../../../libs/libs'
import RowVacancy from './VacancyRow'
// import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import copyVacancy from '../../fetchingData/Vacancy/VacancyModal/copyVacancy'
import {
    onAddVacancy
} from '../../fetchingData/Vacancy/addNewVacancy'
import loadEmployerInfo from '../../fetchingData/Vacancy/VacancyModal/loadEmployerInfo'
import storageVacancyEmployerDataAdd from '../../CustomEvents/storageVacancyEmployerDataAdd'
import vacancyModalCloseEvent from './../../CustomEvents/vacancyModalCloseEvent'

import {

    addMouseUpTrigger,
    closeModal,
    close,
    getAllUrlParams,
    updateURL
} from '../../helper'



function vacancylistdatafetchedeventHandler(id_vacancy, e) {
    getVacancyModalInfo(id_vacancy).then(res => {

        getWorkModalFeedback({
            id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
            loading: true,
            str: 'vacancies',
            other: 1
        })
        getWorkModalTasks({
            id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id
        })
    })
}


export default class VacancyList {
    constructor() {
        this.count = 0
        this.indicatorsClasses = ['decline', 'choosen', 'ready', 'wait', 'department', 'busy']
        this.el = el("div.rows.vacancy-rows",
            el('div.grid',
                el('div.columns',
                    el('div.grid-column.first-column'),
                    el('div.grid-column.second-column'),
                    el('div.grid-column.third-column'),
                    el('div.grid-column.fourth-column'),
                    el('div.grid-column.fifth-column'))),
            this.list = list('div.rows', RowVacancy, 'id_vacancy')
        )

    }
    update(data) {



        this.list.update(data, {
            classes: this.indicatorsClasses,
            productsData: this.getItemsFromLocalStorage().products
        })

        sessionStorage.setItem('addNewVacancyMode', '0')
        //Инициализация функций которые зависят от инстанса класса
    }

    onmount() {
        let id_vacancy = getAllUrlParams().id
        let createVacancy = getAllUrlParams().createvacancy

        if (id_vacancy) {
            const instance = MicroModal.show('modal-3', {
                onClose: modal => {
                    document.dispatchEvent(vacancyModalCloseEvent)
                    updateURL(window.location.pathname)

                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                    wrapper.removeEventListener('mousedown', this.closeModal)
                    modalClose.removeEventListener('click', this.close)
                },
                onShow: (modal, node) => {
                    if (id_vacancy) {
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


            document.addEventListener('vacancylistdatafetchedevent', vacancylistdatafetchedeventHandler.bind(null, id_vacancy))



        }


        if (createVacancy) {
            let employerID = getAllUrlParams().id_employer
            let vacancyID = getAllUrlParams().id_vacancy

            if (vacancyID) {
                copyVacancy({
                        vacancy: vacancyID
                    })
                    .then(res => {
                        if (res !== 'fail') {
                            setTimeout(() => {
                                
                                getVacancyModalInfo(res).then(r => {
                                    const instance = MicroModal.show('modal-3', {
                                        onClose: modal => {
                                            
                                            
                                            const wrapper = modal.querySelector('.my-modal-wrapper')
                                            const modalClose = modal.querySelector('.modal__close')

                                            wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                                            wrapper.removeEventListener('mousedown', this.closeModal)
                                            modalClose.removeEventListener('click', this.close)
                                        },
                                        onShow: (modal, node) => {
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
                                    })
                                })
                            }, 1500)

                        } else {
                            return
                        }
                    })
            } else {
                onAddVacancy(employerID)
                    .then(result => {
                        loadEmployerInfo({
                            vacancy: result,
                            employer: employerID
                        }).then(res => {
                            if (res !== 'fail') {
                                storageVacancyEmployerDataAdd.detail.id = 'vacancyEmployerData'
                                storageVacancyEmployerDataAdd.detail.employerId = employerID
                                storageVacancyEmployerDataAdd.detail.vacancyEmployerData = res
                                document.dispatchEvent(storageVacancyEmployerDataAdd)
                            } else {
                                return
                            }
                        })
                    })
            }
        }

    }


    getItemsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []
        return {
            products
        }
    }
}