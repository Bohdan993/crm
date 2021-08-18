import {
    el,
    MicroModal,
    setAttr
} from '../../../../../libs/libs'
import {
    addMouseUpTrigger,
    closeModal,
    updateURL,
    close
} from '../../../helper'
import archiveVacancy from '../../../fetchingData/Vacancy/VacancyModal/archiveVacancy'
import copyVacancy from '../../../fetchingData/Vacancy/VacancyModal/copyVacancy'
import getVacancyModalInfo from '../../../fetchingData/Vacancy/VacancyModal/getVacancyModalInfo'
import vacancyListUpdateFetchEvent from './../../../CustomEvents/vacancyListUpdateFetchEvent'
import vacancyModalCloseEvent from './../../../CustomEvents/vacancyModalCloseEvent'


export default class ArchiveCopyVacancyComponent {
    constructor(type) {
        this.type = type
        this.el = el('div.sidebar__filter-wrapper',
            this.text = el('p', `${type === 'copy' ? 'Створити копію вакансії' : 'Архівувати вакансію'}`))


        this.el.addEventListener('click', e => {
            if (type === 'copy') {
                copyVacancy({
                    vacancy: this.data
                })
                    .then(res => {
                        if (res !== 'fail') {
                            MicroModal.close('modal-3')
                            document.dispatchEvent(vacancyListUpdateFetchEvent)
                            setTimeout(() => {
                                getVacancyModalInfo(res).then(r => {
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
                archiveVacancy({
                    vacancy: this.data,
                    type: this.context === '0' ? 0 : 1
                })
                    .then(res => {
                        if (res === 'ok') {
                            MicroModal.close('modal-3')
                            document.dispatchEvent(vacancyListUpdateFetchEvent)
                        } else {
                            return
                        }
                    })
            }

        })


        this.vacancyarchivewithoutclosemodalHandler = (e) => {
            if (this.type === 'archive') {
                this.update(this.data, '1')
            }
        }
    }


    update(data, context) {

        if (this.type === 'archive') {
            if (context === '0') {
                setAttr(this.text, {
                    innerText: 'Архівувати вакансію'
                })
            } else {
                setAttr(this.text, {
                    innerText: 'Перемістити в поточні'
                })
            }
        }

        this.data = data
        this.context = context
    }


    onmount() {
        document.addEventListener('vacancyarchivewithoutclosemodal', this.vacancyarchivewithoutclosemodalHandler)
    }


    onunmount() {
        document.removeEventListener('vacancyarchivewithoutclosemodal', this.vacancyarchivewithoutclosemodalHandler)
    }


}