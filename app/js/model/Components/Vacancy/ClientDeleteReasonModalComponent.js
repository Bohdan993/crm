import {
    el,
    setAttr,
    MicroModal
} from '../../../../libs/libs'
import deleteClientFromVacancy from '../../fetchingData/Vacancy/deleteClientFromVacancy'
import storage from '../../Storage'
import vacancyStorage from '../../Storage/globalVacancies'
import clientDeleteFromVacancyEvent from './../../CustomEvents/clientDeleteFromVacancyEvent'
import { calculate } from './../../calculate'





export default class ClientDeleteReasonModal {
    constructor() {
        this.data = {}
        this.el = el('div.modal__overlay',
            el('div.modal__wrapper.my-modal-wrapper',
                el('div.modal__container.client-delete-reason-modal', {
                        role: 'dialog',
                        'aria-modal': 'true',
                        'aria-labelledby': 'modal-2-title'
                    },
                    el('div.client-delete-reason-modal__layer',
                        this.close = el('span.modal__close',
                            el('span'),
                            el('span')
                        ),
                        this.header = el('div.client-delete-reason-modal__header',
                            el('div.input-group',
                                this.input1 = el('input', {
                                    type: 'radio',
                                    id: 'client-delete-neutral',
                                    name: 'client-delete-name',
                                    value: 'Нейтральна причина',
                                    checked: true
                                }),
                                this.label1 = el('label', {
                                    for: 'client-delete-neutral',
                                    innerText: 'Нейтральна причина'
                                })
                            ),
                            el('div.input-group',
                                this.input2 = el('input', {
                                    type: 'radio',
                                    id: 'client-delete-problem',
                                    name: 'client-delete-name',
                                    value: 'Проблема з клієнтом',
                                }),
                                this.label2 = el('label', {
                                    for: 'client-delete-problem',
                                    innerText: 'Проблема з клієнтом'
                                })
                            )
                        ),
                        el('div.client-delete-reason-modal__body',
                            el('div.client-delete-reason-modal__block',
                                el('div.input-group',
                                    this.textarea = el('textarea.info-area', {
                                        rows: 5,
                                        value: ''
                                    })
                                )
                            )
                        ),
                        this.confirm = el('button.confirm-btn',
                            el('span', 'OK')),
                        this.delete = el('button.delete-btn', 'Не вказувати причину')
                    )
                )
            )
        )


        this.confirm.addEventListener('click', (e) => {
            const reason = this.header.querySelector('input[name="client-delete-name"]:checked').value
            const text = this.textarea.value.trim()
            deleteClientFromVacancy({
                id: this.data.client_id,
                message: encodeURIComponent(`${reason}. ${text}`)
            }).then(res => {
                if (res !== 'fail') {
                    storage.deletePartialState(this.data.vacancy_id, 'data', this.data.client_id)
                    clientDeleteFromVacancyEvent.detail.id = String(this.data.vacancy_id)

                    const {
                        indicators,
                        statuses
                    } = calculate(this.data.vacancy_id, 'delete', storage, vacancyStorage)
                    clientDeleteFromVacancyEvent.detail.indicatorsArr = indicators
                    clientDeleteFromVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientDeleteFromVacancyEvent)
                    this.data.tippy.destroy()
                    MicroModal.close('modal-4')
                } else {
                    return
                }
            })
        })

        this.delete.addEventListener('click', (e) => {
            deleteClientFromVacancy({
                id: this.data.client_id,
                message: encodeURIComponent('Причина не вказана')
            }).then(res => {
                if (res !== 'fail') {
                    storage.deletePartialState(this.data.vacancy_id, 'data', this.data.client_id)
                    clientDeleteFromVacancyEvent.detail.id = String(this.data.vacancy_id)

                    const {
                        indicators,
                        statuses
                    } = calculate(this.data.vacancy_id, 'delete', storage, vacancyStorage)
                    clientDeleteFromVacancyEvent.detail.indicatorsArr = indicators
                    clientDeleteFromVacancyEvent.detail.statusesArr = statuses

                    document.dispatchEvent(clientDeleteFromVacancyEvent)
                    this.data.tippy.destroy()
                    MicroModal.close('modal-4')
                } else {
                    return
                }
            })
        })

        this.el.addEventListener('click', (e) => {
             if (!e.target.classList.contains('modal__overlay')) {
                return
            }
            MicroModal.close('modal-4')
        })

        this.close.addEventListener('click', (e) => {
            MicroModal.close('modal-4')
        })


    }


    update(data) {
        setAttr(this.textarea, {
            value: ''
        })
        setAttr(this.input1, {
            checked: true
        })
        this.data = data
    }
}