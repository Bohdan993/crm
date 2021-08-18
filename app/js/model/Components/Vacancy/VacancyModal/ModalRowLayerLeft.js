import {
    el,
    setAttr,
    place,
    tippy,
    list
} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import {
    initVacancyModalTooltip
} from '../../../initToottips'
import {
    save,
    formatDate
} from '../../../helper'
import vacancyListUpdateEvent from '../../../CustomEvents/vacancyListUpdateEvent'
import vacancyStorage from '../../../Storage/globalVacancies'


class CheckBoxVacancy {
    constructor(type) {
        this.type = type
        this.el = el('div.checkbox-group',
            this.input = el('input', {
                type,
                id: "#"
            }),
            this.label = el('label', 'Чекбокс', {
                for: '#'
            }),
        )
    }

    update(data) {

        setAttr(this.input, {
            id: this.type + '-' + data.id,
            checked: data.checked,
            name: this.type === 'radio' ? 'wt-radio-btn' : '',
            'data-id': this.type === 'radio' ? data.dataID : data.id
        })

        setAttr(this.label, {
            for: this.type + '-' + data.id,
            innerText: data.name
        })

    }
}

class ChooseProductTypePopup {
    constructor() {
        this.save = save.bind(this)
        this.checkedProducts = []
        this.checkBoxData = [{
            id: 'season-rbtn-1',
            name: 'Сезонна',
            'dataID': '1'

        },
            {
                id: 'practice-rbtn-1',
                name: 'Практика',
                'dataID': '2'
            },
            {
                id: 'work-rbtn-1',
                name: 'Робоча',
                'dataID': '3'
            }
        ]


        this.el = el('div.vacancy-modal-popup#work-type-popup',
            this.form = el('form',
                el('div.form-group',
                    this.employerName = el('p'),
                    el('div.input-group.radio-group-type-2.hot.top-group',
                        this.list1 = list('div.group', CheckBoxVacancy, undefined, 'radio')),
                    el('div.input-group.radio-group-type-2.hot.bottom-group',
                        this.list2 = list('div.group', CheckBoxVacancy, undefined, 'checkbox')),
                    this.btn = el('button.confirm-bnt',
                        el('span', 'OK'))
                )
            )
        )


        this.list1.update(this.checkBoxData)


        this.form.addEventListener('submit', (e) => {
            e.preventDefault()


            this.parent.fullInfo.update(true)
            this.parent.fullInfo._el.style.display = "flex"

            let text = this.list1.views.filter(el => el.input.checked)[0].label.innerText
            let checkedID = this.list1.views.filter(el => el.input.checked)[0].input.getAttribute('data-id')

            setAttr(this.parent.visaType, {
                innerText: `${text} - ${'\u00A0'}`
            })
            setAttr(this.parent.types, {
                innerText: `${this.list2.views.filter(el => el.input.checked).map(el => el.label.innerText).join(', ')}`
            })

            this.list2.views.forEach(el => {
                if (el.input.checked) {
                    this.checkedProducts.push(el.input.getAttribute('data-id'))
                }
            })

            setAttr(this.parent.products, {
                style: {
                    backgroundColor: text === `Практика` ? '#9c3' : text === 'Сезонна' ? '#e37373' : '#39c'
                }
            })

            this.save({
                id: this.data,
                value: checkedID,
                field: 'type_vacancy'
            })


            this.save({
                id: this.data,
                value: this.checkedProducts.join(','),
                field: 'type_production'
            }).then(res => {
                if (res === 'ok') {

                    vacancyStorage.setPartialState(this.data, 'id_vacancy', 'type_production', this.checkedProducts.join(','))
                    vacancyStorage.setPartialState(this.data, 'id_vacancy', 'type_vacancy', checkedID)

                    this.parent.products._tippy.hide()
                    this.checkedProducts = []

                    vacancyListUpdateEvent.detail.id = this.data
                    document.dispatchEvent(vacancyListUpdateEvent)
                } else {
                    return
                }
            })
        })
    }

    update(data, context) {

        this.visaTypeText = this.parent.visaType.innerText
        this.typesText = this.parent.types.innerText

        this.list2.update(context)

        this.list1.views.forEach(el => {
            if (this.visaTypeText.includes(el.label.innerText)) {
                el.input.checked = true
                return
            }
            el.input.checked = false
        })

        this.list2.views.forEach(el => {

            if (this.typesText.includes(el.label.innerText)) {
                el.input.checked = true
                return
            }
            el.input.checked = false

        })

        this.data = data
        this.production = context
    }


    getItemsFromLocalStorage() {

        let workTypes = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []

        return {
            workTypes
        }
    }
}

class PricePopup {
    constructor() {
        this.el = el('div.vacancy-modal-popup#price-popup',
            this.form = el('form',
                el('p.vacancy-modal__title', 'Якийсь напис'),
                el('div.input-group', {
                        "data-loading": "false"
                    },
                    el('input.calc-price#calc-price', {
                        type: 'text'
                    })),
                el('div.btn-group',
                    el('button.confirm-bnt', el('span', 'OK')),
                    el('button.cancel-bnt', el('span', 'Відміна')))
            ))
    }

    update(data) {

    }

}

export default class ModalRowLayerLeft {
    constructor() {
        this.prodTypes = []
        this.el = el('div.modal-row__wrapper',
            el('div.main-info__choose-block',
                this.chooseEmployer = place(el('div.choose-employer',
                    el('p',
                        el('span', 'Виберіть роботодавця')))),
                this.fullInfo = place(el('div.full-info',
                    this.countryVacancy = el('p.country-vacancy',
                        this.fullInfoAbbrVacancy = el('span', 'NO 293')),
                    this.products = el('p.products',
                        this.visaType = el('span.visa-type', 'Сезонна - '),
                        this.types = el('span.types', 'Квіти, Теплиці, Молочні корови, Мясні корови')
                    )))
            ),
            el('div.main-info__layer_left',
                el('div.main-info__country',
                    el('p', 'Країна'),
                    this.countries = el('span', '')
                ),
                el('div.main-info__period',
                    el('p', 'Період'),
                    this.period = el('span', '')),
                el('div.main-info__clients',
                    el('p', 'Кіл-ть клієнтів'),
                    el('span.main-info__numbers',
                        this.totalClients = el('span.number-of-people.total-number.attention-number', ''),
                        this.numberClients = el('span.number-of-people.attention-number', '')))),
            el('div.main-info__layer_right',
                el('div.main-info__price',
                    el('p', 'Ціна вакансії'),
                    this.price = el('span', '')),
                el('div.main-info__dates',
                    el('p', 'Дати'),
                    this.dates = el('span', '')),
                el('div.main-info__closes-vacancies',
                    el('p', 'Закриті вакансії'),
                    el('div.main-info__indicators',
                        el('span.indicator.decline.main-info__indicator',
                            this.totalClientsCount = el('span', '0')),
                        el('span.indicator.choosen.main-info__indicator',
                            this.choosenClientsCount = el('span', '0')),
                        el('span.indicator.ready.main-info__indicator',
                            this.readyClientsCount = el('span', '0')),
                        el('span.indicator.wait.main-info__indicator',
                            this.waitClientsCount = el('span', '0')),
                        el('span.indicator.department.main-info__indicator',
                            this.departmentClientsCount = el('span', '0')),
                        el('span.indicator.busy.main-info__indicator',
                            this.busyClientsCount = el('span', '0')))))
        )

        this.findEmployerPopup = new FindEmployerPopupComponent('Left')
        this.findEmployerPopup.el.style.display = "block"
        this.findEmployerPopup.parent = this

        this.chooseProductTypePopup = new ChooseProductTypePopup()
        this.chooseProductTypePopup.el.style.display = 'block'
        this.chooseProductTypePopup.parent = this


        this.pricePopup = new PricePopup()
        this.pricePopup.el.style.display = 'block'
        this.pricePopup.parent = this


        this.clientaddtovacancyeventHandler = (e) => {
            if (e.detail.id === this.data.idVac) {
                const statusesCountArr = vacancyStorage.getPartialState(this.data.idVac, 'id_vacancy', 'status')

                setAttr(this.totalClientsCount, {
                    innerText: statusesCountArr[0]
                })

                setAttr(this.choosenClientsCount, {
                    innerText: statusesCountArr[1]
                })

            }

        }

        this.vacancyarchivewithoutclosemodalHandler = (e) => {
            this.update({...this.data, isArchive: '1'})
        }

        this.clientupdateinvacancyeventHandler = (e) => {
            if (e.detail.id === this.data.idVac) {
                const {statusesArr} = e.detail

                setAttr(this.totalClientsCount, {
                    innerText: statusesArr[0]
                })

                setAttr(this.choosenClientsCount, {
                    innerText: statusesArr[1]
                })

                setAttr(this.readyClientsCount, {
                    innerText: statusesArr[2]
                })

                setAttr(this.waitClientsCount, {
                    innerText: statusesArr[3]
                })

                setAttr(this.departmentClientsCount, {
                    innerText: statusesArr[4]
                })

                setAttr(this.busyClientsCount, {
                    innerText: statusesArr[5]
                })

            }

        }

        this.clientdeletefromvacancyeventHandler = (e) => {
            if (e.detail.id === this.data.idVac) {
                const {statusesArr} = e.detail
                setAttr(this.totalClientsCount, {
                    innerText: statusesArr[0]
                })

                setAttr(this.choosenClientsCount, {
                    innerText: statusesArr[1]
                })

                setAttr(this.readyClientsCount, {
                    innerText: statusesArr[2]
                })

                setAttr(this.waitClientsCount, {
                    innerText: statusesArr[3]
                })

                setAttr(this.departmentClientsCount, {
                    innerText: statusesArr[4]
                })

                setAttr(this.busyClientsCount, {
                    innerText: statusesArr[5]
                })

            }
        }


        this.storageemployeraddHandler = (e) => {

            const {
                vacancyEmployerData: {employer, production, vacancy}
            } = e.detail

            this.chooseEmployer.update(false)
            this.fullInfo.update(true)
            this.fullInfo._el.style.display = "flex"


            this.update({
                idVac: this.data.idVac,
                employer,
                type_production: '',
                type_vacancy: '0',
                vacancyName: vacancy,
                period: this.data.period,
                clients: this.data.clients,
                men: this.data.man,
                women: this.data.woman,
                date: this.data.date,
                production
            }, 'storage')

        }
    }

    update(data, context) {

        let d = data.startWork ? new Date(data.startWork.split('.').reverse().join('.')) : new Date()
        d.setMonth(+d.getMonth() + +data.period)

        if (context === 'storage') {
            this.chooseEmployer.update(false)
            setAttr(this.fullInfoAbbrVacancy, {
                innerText: data.employer && data.employer.vacancy ? data.employer.vacancy : data.vacancyName ? data.vacancyName : ''
            })
        }


        if (context === 'nulledEmployer') {
            this.chooseEmployer.update(true)
            this.fullInfo.update(false)
            this.fullInfo._el.style.display = "none"

            setAttr(this.dates, {
                innerText: data.period ? `${data.startWork} - ${formatDate(d)}` : '-'
            })
        }


        if (context === 'employer') {
            this.chooseEmployer.update(false)
            this.fullInfo.update(true)
            this.fullInfo._el.style.display = "flex"

            setAttr(this.dates, {
                innerText: data.period ? `${data.startWork} - ${formatDate(d)}` : '-'
            })

        }


        if (data.closedVacancies && data.closedVacancies.length) {
            setAttr(this.totalClientsCount, {
                innerText: data.closedVacancies[0]
            })

            setAttr(this.choosenClientsCount, {
                innerText: data.closedVacancies[1]
            })

            setAttr(this.readyClientsCount, {
                innerText: data.closedVacancies[2]
            })

            setAttr(this.waitClientsCount, {
                innerText: data.closedVacancies[3]
            })

            setAttr(this.departmentClientsCount, {
                innerText: data.closedVacancies[4]
            })

            setAttr(this.busyClientsCount, {
                innerText: data.closedVacancies[5]
            })
        } else {
            setAttr(this.totalClientsCount, {
                innerText: data?.clients
            })
            setAttr(this.choosenClientsCount, {
                innerText: '0'
            })

            setAttr(this.readyClientsCount, {
                innerText: '0'
            })

            setAttr(this.waitClientsCount, {
                innerText: '0'
            })

            setAttr(this.departmentClientsCount, {
                innerText: '0'
            })

            setAttr(this.busyClientsCount, {
                innerText: '0'
            })
        }

        setAttr(this.countries, {
            innerText: data.employer.id_country ? this.getItemsFromLocalStorage().countries.filter(el => el.id === data.employer.id_country)[0]?.name : '-'
        })

        setAttr(this.countryVacancy, {
            style: {
                backgroundColor: data.isArchive !== '0' ? '#99CCCC' : '#FF9966'
            }
        })


        setAttr(this.fullInfoAbbrVacancy, {
            innerText: data.employer && data.employer.vacancy ? data.employer.vacancy : data.vacancyName ? data.vacancyName : ''
        })

        setAttr(this.price, {
            innerText: data.employer.price ? data.employer.price : 'не достатньо даних'
        })

        setAttr(this.visaType, {
            innerText: data.type_production ? (data.type_vacancy === '1' ? `Сезонна - ${'\u00A0'}` : data.type_vacancy === '2' ? `Практика - ${'\u00A0'}` : `Робоча - ${'\u00A0'}`) : 'Выберите тип продукции'
        })


        let arr = data.type_production ? data.type_production.split(',') : []
        let wt = this.getItemsFromLocalStorage().workTypes

        arr.forEach(el => {
            wt.forEach(elem => {
                if (+el === +elem.id) {
                    this.prodTypes.push(elem.name)
                }
            })
        })

        setAttr(this.types, {
            innerText: this.prodTypes.join(', ')
        })

        setAttr(this.products, {
            style: {
                backgroundColor: data.type_production ? (data.type_vacancy === '2' ? '#9c3' : data.type_vacancy === '1' ? '#e37373' : '#39c') : '#85a6cb'
            }
        })

        setAttr(this.totalClients, {
            innerText: `${data?.clients || ''}`
        })

        setAttr(this.numberClients, {
            innerText: `${+data.men ? ('\u00A0' + '-' + '\u00A0' + 'Ч' + data.men) : ''} ${+data.women ? ('Ж' + data.women) : ''}`
        })


        setAttr(this.period, {
            innerText: data.period ? data.period + ' міс' : '-'
        })


        this.chooseProductTypePopup.update(data.idVac, data.production)

        setTimeout(() => {
            this.prodTypes = []
        }, 0)


        this.data = data

    }


    onmount() {
        this.chooseEmployer.update(true)
        this.findEmployerInstance = initVacancyModalTooltip(this.chooseEmployer._el, this.findEmployerPopup.el, tippy)
        this.chooseProductTypeInstance = initVacancyModalTooltip(this.products, this.chooseProductTypePopup.el, tippy)
        this.priceInstance = initVacancyModalTooltip(this.price, this.pricePopup.el, tippy)


        document.addEventListener('clientaddtovacancyevent', this.clientaddtovacancyeventHandler)
        document.addEventListener('clientupdateinvacancyevent', this.clientupdateinvacancyeventHandler)
        document.addEventListener('clientdeletefromvacancyevent', this.clientdeletefromvacancyeventHandler)
        document.addEventListener('storageemployeradd', this.storageemployeraddHandler)
        document.addEventListener('vacancyarchivewithoutclosemodal', this.vacancyarchivewithoutclosemodalHandler)


    }

    onunmount() {

        document.removeEventListener('clientaddtovacancyevent', this.clientaddtovacancyeventHandler)
        document.removeEventListener('clientupdateinvacancyevent', this.clientupdateinvacancyeventHandler)
        document.removeEventListener('clientdeletefromvacancyevent', this.clientdeletefromvacancyeventHandler)
        document.removeEventListener('storageemployeradd', this.storageemployeraddHandler)
        document.removeEventListener('vacancyarchivewithoutclosemodal', this.vacancyarchivewithoutclosemodalHandler)

    }


    getItemsFromLocalStorage() {

        let countries = JSON.parse(localStorage.getItem('countriesVacancy')) || []
        let workTypes = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []

        return {
            countries,
            workTypes
        }
    }


}