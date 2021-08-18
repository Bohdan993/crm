import {
    el,
    setAttr,
    svg,
    list,
    place
} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import ShowMoreBtn from './ShowMoreBtn'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
import getWorkModalVacancyHistory from '../../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'


class WorkModalVacancyHistoryRow {
    constructor() {


        this.el = el('a.modal-row__contacts-history-row',
            el('div.modal-row__vacancies-history-labels',
                this.label = el('i.label',
                    this.name = el('span', 'NO'),
                    this.total_client = el('span', '293-17')
                ),
                this.people = el('span.number-of-people.attention-number', 'M2')
            ),
            el('div.modal-row__vacancies-history-date',
                this.date = el('time', '03.03.2019  -  03.09.2019')),
            el('div.modal-row__vacancies-history-terms',
                this.period = el('time', '6 міс')),
            el('div.modal-row__vacancies-history-type',
                this.labelType = el('i.label',
                    this.labelTypeText = el('span', 'Робоча')),
                this.production = el('p', 'Свині')
            )
        )

    }


    update(data) {

        setAttr(this.el, {
            target: '_blank',
            href: `vacancies#id=${data.name.split(' ')[1]}`
        })


        setAttr(this.name, {
            innerText: data.name + ' -'
        })


        setAttr(this.total_client, {
            innerText: data.total_client
        })

        setAttr(this.period, {
            innerText: data.period ? data.period + ' міс' : ''
        })

        setAttr(this.production, {
            innerText: data.type_production
        })


        setAttr(this.date, {
            innerText: (data.start_work ? data.start_work : '') + (data.start_work && data.finish_work ? ' - ' : '') + (data.finish_work ? data.finish_work : '')
        })


        setAttr(this.people, {
            innerText: (+data.total_man ? "Ч" + data.total_man : '') + (+data.total_woman ? ' Ж' + data.total_woman : ''),
            style: {
                color: data.archive === '0' ? '#FF9966' : '#99CCCC'
            }
        })

        setAttr(this.label, {
            style: {
                background: data.archive === '0' ? '#FF9966' : '#99CCCC'
            }
        })

        setAttr(this.labelType, {
            style: {
                background: data.type_vacancy == '1' ? '#E37373' : data.type_vacancy === '2' ? '#99CC33' : '#3399CC'
            }
        })

        setAttr(this.labelTypeText, {
            innerText: data.type_vacancy === '1' ? 'Сезонна' : data.type_vacancy === '2' ? 'Практика' : 'Робоча',
        })
    }
}


export default class WorkModalVacancyHistory {
    constructor() {
        this.data = {}
        this.controls = el('div.modal-row__controls',
            el('p', 'Історія вакансій')
        )


        this.modalRowWrapper = el('div.modal-row__vacancies-history-wrapper.modal-row__wrapper')
        this.modalLayer = el('div.modal-row__layer.empty-layer',
            this.list = list(this.modalRowWrapper, WorkModalVacancyHistoryRow, 'id_vacancy')
        )


        this.el = el('div.vacancies-history__layer.modal-row__inner-layer',
            this.controls,
            this.modalLayer,
            this.showMore = place(ShowMoreBtn)
        )


        initOverlayScrollbars(this.modalLayer)

        this.pageShow = 2
        this.flagShow = false
    }

    update(data, index, items, context) {

        if (data.data.length) {
            setAttr(this.el, {
                style: {
                    display: 'block'
                }
            })
        } else {
            setAttr(this.el, {
                style: {
                    display: 'none'
                }
            })
        }

        let {
            loading,
            showing
        } = data
        if (showing) {
            this.pageShow++
        }

        if (loading) {
            this.pageShow = 2
        }
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

                    getWorkModalVacancyHistory({
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

    }


}

Object.assign(WorkModalVacancyHistory.prototype, hiddenClassMixin)