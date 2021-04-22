import {el, setAttr, list, MicroModal} from '../../../../libs/libs'
import RowVacancy from './VacancyRow'
// import initWorkPopup from '../../initWorkPopup'
// import fetch from '../fetchingDataClass'
import getVacancyList from '../../fetchingData/Vacancy/getVacancyList'
import getVacancyModalInfo from '../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'
import copyVacancy from '../../fetchingData/Vacancy/VacancyModal/copyVacancy'
import { onAddVacancy } from '../../fetchingData/Vacancy/addNewVacancy'
import loadEmployerInfo from '../../fetchingData/Vacancy/VacancyModal/loadEmployerInfo'
import storage from '../../Storage'
import storageVacancyEmployerDataAdd from '../../CustomEvents/storageVacancyEmployerDataAdd'




import {
    addMouseUpTrigger,
    closeModal,
    getAllUrlParams
} from '../../helper'


function byField(field) {
  return (a, b) => +a[field] > +b[field] ? 1 : -1;
}

let flag = false


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
       

        this.flag = false

    }
    update(data) {

        // data.sort(byField('archive'))

        this.list.update(data, {
            classes: this.indicatorsClasses,
            productsData: this.getItemsFromLocalStorage().products
        })
        //Инициализация функций которые зависят от инстанса класса
         if(!this.flag) {
            // initWorkPopup()
            this.flag = true
        }
        //
    }

    onmount() {
        let id_vacancy = getAllUrlParams().id
        let createVacancy = getAllUrlParams().createvacancy

        if(id_vacancy) {
            MicroModal.show('modal-3', {
                onClose: modal => {
                    getVacancyList()
                },
                onShow: (modal, node) => {


                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    if (!flag) {
                        wrapper.addEventListener('mouseup', addMouseUpTrigger)
                        wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
                        modalClose.addEventListener('click', function () {
                            MicroModal.close(modal.id)
                        })
                        flag = true
                    }
                }
            })

            getVacancyModalInfo(id_vacancy).then(res => {
                getWorkModalFeedback({
                    id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id,
                    loading: true,
                    str: 'vacancies',
                    other: 1
                })
                getWorkModalTasks({id: JSON.parse(sessionStorage.getItem('currVacancyEmployer')).id})
            })
        }


        if(createVacancy) {
            let employerID = getAllUrlParams().id_employer
            let vacancyID = getAllUrlParams().id_vacancy

            if(vacancyID) {
                console.log("VACANCYID", vacancyID)
                copyVacancy({
                    vacancy: vacancyID
                })
                .then(res => {
                    if(res  !== 'fail') {
                        setTimeout(()=>{
                            getVacancyModalInfo(res).then(r => { 
                                MicroModal.show('modal-3', {
                                    onClose: modal => {
                                        getVacancyList()
                                    },
                                    onShow: (modal, node) => {

                                        const wrapper = modal.querySelector('.my-modal-wrapper')
                                        const modalClose = modal.querySelector('.modal__close')

                                        if (!flag) {
                                            wrapper.addEventListener('mouseup', addMouseUpTrigger)
                                            wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
                                            modalClose.addEventListener('click', function () {
                                                MicroModal.close(modal.id)
                                            })
                                            flag = true
                                        }
                                    }
                                })
                            })
                        }, 1500)
                        
                    }   else {
                        return
                    }
                })
            } else {
                // console.log("VACANCYID2", vacancyID)
                onAddVacancy(employerID)
                .then(result => {
                    // console.log("RESULT", result)
                    loadEmployerInfo({
                        vacancy: result,
                        employer: employerID
                    }).then(res => {
                        if(res !== 'fail') {
                            storage.setState('vacancyEmployerData', res)
                            storageVacancyEmployerDataAdd.detail.id = 'vacancyEmployerData'
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