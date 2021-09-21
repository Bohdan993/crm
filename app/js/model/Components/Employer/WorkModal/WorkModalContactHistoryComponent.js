import {
    el,
    setAttr,
    svg,
    list,
    place
} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import ShowMoreBtn from './ShowMoreBtnComponent'
import {
    modal
} from '../../../MountingElements/Employer/WorkModal/mountContactHistoryModal'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
import getWorkModalContactHistory from '../../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'

import {
    MicroModal
} from '../../../../../libs/libs'

import {
    addMouseUpTrigger,
    closeModal,
    close
} from '../../../helper'


class WorkModalContactHistoryRow {
    constructor() {

        this.data = {}
        this.el = el('div.modal-row__contacts-history-row', {
                'data-contact-history-open': "modal-2"
            },
            el('div.modal-row__contacts-history-manager.modal-row__cell', {},
                this.manager = el('i.tag.manager-tag.dark-blue-tag'),
                this.direction = el('i.ico', svg('svg', svg('use', {
                    xlink: {
                        href: "img/sprites/svg/symbol/sprite.svg#arrow"
                    }
                })))
            ),

            el('div.modal-row__contacts-history-date.modal-row__cell',
                this.date = el('time')),
            el('div.modal-row__contacts-history-text.modal-row__cell',
                el('span.ico__layer', this.typeContact = el('i.ico.letter-ico')),
                this.text = el('p', 'Надіслав повний пакет документів :)')
            )
        )

        this.el.addEventListener('click', (e) => {
            const instance = MicroModal.show('modal-2', {
                onClose: (modal) => {
                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                    wrapper.removeEventListener('mousedown', this.closeModal)
                    modalClose.removeEventListener('click', this.close)
                },
                onShow: (modal) => {
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
            modal.update(this.data)
        })
    }


    update(data, index, items, context) {


        const currManager = context.data.storage.managers.filter(manager => {
            return manager.id === data.id_manager
        })

        const currContact = context.data.storage.typeContact.filter(contact => {
            return contact.id === data.id_type_contact
        })


        setAttr(this.date, {
            innerText: data.date
        })


        setAttr(this.text, {
            innerText: data.message.split('\n')[0]
        })

        setAttr(this.manager, {
            style: {
                "background-color": "#" + (currManager[0] ? currManager[0].color : null)
            },
            innerText: currManager[0] ? currManager[0].name.split(/\s+/).map(word => word[0].toUpperCase()).join('') : null
        })

        setAttr(this.typeContact, {
            // xlink: {
            // 	href: `img/sprites/svg/symbol/sprite.svg#${currContact[0] ? currContact[0].icon : null}`
            // }
            classList: `ico-s s-${currContact[0] ? currContact[0].icon.split('.')[0] : null}`
        })

        setAttr(this.direction, {
            classList: `ico${data.type_arrow === '0' ? ' rotate' : ''}`
        })


        this.data.data = data
        this.data.id = context.data.data.id
        this.data.count = context.count
        this.index = index
    }


}


export default class WorkModalContactHistory {
    constructor() {
        this.data = {}
        this.controls = el('div.modal-row__controls',
            el('p', 'Історія контактів'),
            this.addItem = el('div.add-item', el('span', '+'), 'додати контакт', {
                'data-contact-history-open': "modal-2"
            })
        )


        this.modalRowWrapper = el('div.modal-row__contacts-history-wrapper.modal-row__wrapper')
        this.modalLayer = el('div.modal-row__layer.empty-layer',
            this.list = list(this.modalRowWrapper, WorkModalContactHistoryRow, 'id')
        )


        this.el = el('div.contact-history__layer.modal-row__inner-layer',
            this.controls,
            this.modalLayer,
            this.showMore = place(ShowMoreBtn)
        )


        this.addItem.addEventListener('click', (e) => {

            const instance = MicroModal.show('modal-2', {
                onClose: (modal) => {
                    const wrapper = modal.querySelector('.my-modal-wrapper')
                    const modalClose = modal.querySelector('.modal__close')

                    wrapper.removeEventListener('mouseup', this.addMouseUpTrigger)
                    wrapper.removeEventListener('mousedown', this.closeModal)
                    modalClose.removeEventListener('click', this.close)
                },
                onShow: (modal) => {
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

            modal.update({
                data: {
                    message: '',
                    date: '',
                    id: '',
                    id_manager: JSON.parse(sessionStorage.getItem('currActiveManagerId')),
                    id_type_contact: '0',
                    type_arrow: '',
                },
                id: this.data.data.id,
                count: this.data.count
            })


        })

        this.data.storage = this.getItemsLocalStorage()
        this.pageShow = 2
        this.flagShow = false

        initOverlayScrollbars(this.modalLayer)
    }


    update(data, index, items, context) {
        let {
            loading,
            deleating,
            adding,
            showing
        } = data
        if (showing) {
            this.pageShow++
        }

        if (loading) {
            this.pageShow = 2
        }

        if (adding) {}

        if (deleating) {}

        this.data.data = data
        this.data.index = index
        this.data.count = (this.pageShow - 1) * 5
        this.list.update(data.data, {
            data: this.data,
            count: this.data.count
        })


        //Пагинация
        if (data.data.length < data.total) {
            this.showMore.update(true, 'показати ще 5')

            if (!this.flagShow) {
                this.showMore.el.addEventListener('click', () => {
                    getWorkModalContactHistory({
                        id: this.data.data.id,
                        showing: true,
                        p: this.pageShow
                    })

                })

                this.flagShow = true
            }

        } else {
            this.showMore.update(false)
            this.flagShow = false
        }

        //Вызов функций которые зависят от инстанса класса
        checkIfWrapperIsEmpty(this.modalRowWrapper)
        // this.scrollInstance.update()
        //


    }

    getItemsLocalStorage() {
        const managers = JSON.parse(localStorage.getItem('managers')) || []
        const typeContact = JSON.parse(localStorage.getItem('type_contact')) || []

        return {
            managers,
            typeContact
        }
    }


}

Object.assign(WorkModalContactHistory.prototype, hiddenClassMixin)