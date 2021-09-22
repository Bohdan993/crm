import {
    el,
    setAttr,
    place
} from '../../../../../libs/libs'
import {
    save,
    dateInputChange,
    formatDate
} from '../../../helper'


import vacancyStorage from '../../../Storage/globalVacancies'
import vacancyListUpdateFetchEvent from '../../../CustomEvents/vacancyListUpdateFetchEvent'
import vacancyListUpdateEvent from '../../../CustomEvents/vacancyListUpdateEvent'

export default class TermsComponent {
    constructor() {

        this.data = {}
        this.save = save.bind(this)
        this.el = el('div.terms-layer.modal-row__inner-layer',
            el('div.modal-row__controls',
                el('p', 'Умови')),
            el('div.modal-row__layer',
                el('div.terms__top',
                    el('div.terms__start-date.info-block',
                        el('p', 'Дата початку роботи'),
                        el('div.input-group',
                            this.startWork = el('input.info-area', {
                                type: 'text'
                            }))),
                    el('div.terms__period.info-block',
                        el('p', 'Період (міс)'),
                        el('div.input-group',
                            this.period = el('input.info-area', {
                                type: 'text'
                            }))),
                    el('div.terms__period.info-block',
                        el('p', 'Період (днів)'),
                        el('div.input-group',
                            this.periodDays = el('input.info-area', {
                                type: 'text'
                            }))),
                    el('div.terms__salary.info-block',
                        el('p', 'Заробітня плата'),
                        el('div.input-group',
                            this.salary = el('input.info-area', {
                                type: 'text'
                            })))),
                el('div.terms__middle',
                    el('div.terms__accommodation.info-block',
                        el('p', 'Проживання'),
                        el('div.input-group',
                            this.accomodation = el('textarea.vacancy-textarea', {
                                rows: 3
                            }))),
                    el('div.terms__nutrition.info-block',
                        el('p', 'Харчування'),
                        el('div.input-group',
                            this.feeding = el('textarea.vacancy-textarea', {
                                rows: 3
                            }))),
                    el('div.terms__taxes.info-block',
                        el('p', 'Податки'),
                        el('div.input-group',
                            this.taxes = el('textarea.vacancy-textarea', {
                                rows: 3
                            })))),
                el('div.terms__bottom.bottom-areas',
                    el('div.terms__work-responsibilities.info-block',
                        el('p', 'Рабочі обов\'язки'),
                        el('div.input-group',
                            this.workResp = el('textarea.vacancy-textarea', {
                                rows: 3
                            }))),
                    el('div.terms__work-time.info-block',
                        el('p', 'Кількість годин'),
                        el('div.input-group',
                            this.workTime = el('textarea.vacancy-textarea', {
                                rows: 3
                            })))
                ),
            ))


        this.startWork.addEventListener('change', (e) => {
            const changedDate = dateInputChange(this.startWork)

            let d = new Date(changedDate.split('.').reverse().join('.'))
            d.setMonth(+d.getMonth() + +this.period.value.trim())
            d.setDate(+d.getDate() + +this.periodDays.value.trim())


            this.save({
                id: this.data.id,
                value: changedDate,
                field: 'start_work'
            })

            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'start_work', this.period.value.trim() ? `${changedDate}` : '')
            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'finish_work', this.period.value.trim() ? `${formatDate(d)}` : '')
            vacancyListUpdateFetchEvent.detail.id = this.data.id

            if (!+JSON.parse(sessionStorage.getItem('addNewVacancyMode'))) {
                document.dispatchEvent(vacancyListUpdateFetchEvent)
            } else {
                setAttr(this.sibling.dates, {
                    innerText: this.period.value.trim() || this.periodDays.value.trim() ? `${changedDate} - ${formatDate(d)}` : '-'
                })
            }
        })

        this.period.addEventListener('change', (e) => {
            const changedDate = dateInputChange(this.startWork)

            let d = new Date(changedDate.split('.').reverse().join('.'))
            d.setMonth(+d.getMonth() + +this.period.value.trim())
            d.setDate(+d.getDate() + +this.periodDays.value.trim())


            this.save({
                id: this.data.id,
                value: this.period.value.trim(),
                field: 'period'
            })


            setAttr(this.sibling.period, {
                innerText: `${this.period.value.trim() ? this.period.value.trim() + ' міс' : ''} ${this.periodDays.value.trim() ? this.periodDays.value.trim() + ' дн' : ''}` || '-'
            })

            setAttr(this.sibling.dates, {
                innerText: this.period.value.trim() || this.periodDays.value.trim() ? `${changedDate} - ${formatDate(d)}` : '-'
            })


            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'start_work', this.period.value.trim() ? `${changedDate}` : '')
            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'finish_work', this.period.value.trim() ? `${formatDate(d)}` : '')
            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'period', this.period.value.trim())
            vacancyListUpdateEvent.detail.id = this.data.id
            document.dispatchEvent(vacancyListUpdateEvent)
        })


        this.periodDays.addEventListener('change', (e) => {
            const changedDate = dateInputChange(this.startWork)

            let d = new Date(changedDate.split('.').reverse().join('.'))
            d.setMonth(+d.getMonth() + +this.period.value.trim())
            d.setDate(+d.getDate() + +this.periodDays.value.trim())

            if (+this.periodDays.value.trim() > 30) {
                this.save({
                    id: this.data.id,
                    value: +this.periodDays.value.trim() % 30,
                    field: 'period_day'
                })

                this.save({
                    id: this.data.id,
                    value: Math.floor(+this.periodDays.value.trim() / 30) + +this.period.value.trim(),
                    field: 'period'
                })

                setAttr(this.period, {
                    value: Math.floor(+this.periodDays.value.trim() / 30) + +this.period.value.trim()
                })
                setAttr(this.periodDays, {
                    value: +this.periodDays.value.trim() % 30,
                })


            } else {
                this.save({
                    id: this.data.id,
                    value: this.periodDays.value.trim(),
                    field: 'period_day'
                })
            }



            setAttr(this.sibling.period, {
                innerText: `${this.period.value.trim() ? this.period.value.trim() + ' міс' : ''} ${this.periodDays.value.trim() ? this.periodDays.value.trim() + ' дн' : ''}` || '-'
            })

            setAttr(this.sibling.dates, {
                innerText: this.period.value.trim() || this.periodDays.value.trim() ? `${changedDate} - ${formatDate(d)}` : '-'
            })


            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'start_work', this.period.value.trim() ? `${changedDate}` : '')
            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'finish_work', this.period.value.trim() ? `${formatDate(d)}` : '')
            vacancyStorage.setPartialState(this.data.id, 'id_vacancy', 'period', this.period.value.trim())
            vacancyListUpdateEvent.detail.id = this.data.id
            document.dispatchEvent(vacancyListUpdateEvent)
        })

        this.salary.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.salary.value.trim(),
                field: 'salary'
            })
        })

        this.accomodation.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.accomodation.value.trim(),
                field: 'residency'
            })
        })

        this.feeding.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.feeding.value.trim(),
                field: 'feeding'
            })
        })

        this.taxes.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.taxes.value.trim(),
                field: 'tax'
            })
        })

        this.workResp.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.workResp.value.trim(),
                field: 'responsibilities_work'
            })
        })

        this.workTime.addEventListener('change', (e) => {
            this.save({
                id: this.data.id,
                value: this.workTime.value.trim(),
                field: 'work_time'
            })
        })
    }


    update(data, context) {

        setAttr(this.startWork, {
            value: data.startWork
        })

        setAttr(this.period, {
            value: data.period
        })

        setAttr(this.periodDays, {
            value: data.period_day
        })

        setAttr(this.salary, {
            value: data.salary
        })

        setAttr(this.accomodation, {
            value: data.residency
        })

        setAttr(this.feeding, {
            value: data.feeding
        })

        setAttr(this.taxes, {
            value: data.taxes
        })

        setAttr(this.workResp, {
            value: data.workResp
        })

        setAttr(this.workTime, {
            value: data.workTime
        })

        this.data = data
        this.sibling = context
    }

    onmount() {}

}