import {
    el,
    list
} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import Option from '../../OptionComponent'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import saveFieldsData from '../../../fetchingData/saveFieldsData'
import addManufacturyType from '../../../fetchingData/Employer/WorkModal/addManufacturyType'
import deleteManufacturyType from '../../../fetchingData/Employer/WorkModal/deleteManufacturyType'
import storage from '../../../Storage/globalEmployers'
import employerListUpdateEvent from '../../../CustomEvents/employerListUpdateEvent';


class WorkModalManufacturyTypeRow {
    constructor() {
        this.data = {}
        this.el = el('div.modal-row__manufactury-type-row',
            el('div.input-group.modal-row__manufactury-type-select.native-select',
                this.select = list('select.info-area', Option)
            ),
            el('div.input-group',
                this.delete = el('span.delete-manufactury-type'),
                this.textArea = el('input.info-area', {
                    type: 'text'
                })
            )
        )


        this.textArea.addEventListener('change', e => {
            saveFieldsData({
                str: 'employers',
                id: this.data.context.id_employer,
                value: this.textArea.value,
                field: 'name',
                target: 'production',
                id_target: this.data.data.id
            })
        })

        this.delete.addEventListener('click', e => {
            deleteManufacturyType(this.data.data.id, this.data.context.id_employer)


            //Обновление данных в списке работодателей
            this.data.context.products = this.data.context.products.filter(el => el !== this.data.data.id_spec_job_list)
            this.data.context.final = []
            this.data.context.initData.forEach(el => {
                this.data.context.products.forEach((elem, ind) => {

                    if (elem === el.id) {
                        this.data.context.final[ind] = el.name
                    }

                })
            })

            storage.setPartialState(this.data.context.id_employer, 'id_employer', 'production', this.data.context.final)
            employerListUpdateEvent.detail.id = this.data.context.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })

        this.select.el.addEventListener('change', (e) => {

            saveFieldsData({
                str: 'employers',
                id: this.data.context.id_employer,
                value: this.select.el.value,
                field: 'id_spec_job_list',
                target: 'production',
                id_target: this.data.data.id
            })


            //Обновление данных в списке работодателей
            // if(this.select.el.value !== '0') {
            this.data.context.products[this.data.index] = this.select.el.value
            // }


            this.data.context.initData.forEach(el => {
                this.data.context.products.forEach((elem, ind) => {

                    if (elem === el.id) {
                        this.data.context.final[ind] = el.name
                    }

                    if (elem === '0') {
                        this.data.context.final[ind] = ''
                    }

                })
            })


            storage.setPartialState(this.data.context.id_employer, 'id_employer', 'production', this.data.context.final)
            employerListUpdateEvent.detail.id = this.data.context.id_employer
            document.dispatchEvent(employerListUpdateEvent)
        })


    }

    update(data, index, items, context) {

        this.select.update(context.initData)
        this.textArea.value = data.name
        this.data.data = data
        this.data.context = context
        this.data.index = index
        this.select.el.value = data.id_spec_job_list
    }

}

export default class WorkModalManufacturyType {
    constructor() {
        this.productsArr = []
        this.finalArr = []
        this.data = {}
        this.initData = this.getItemsFromLocalStorage().products
        this.controls = el('div.modal-row__controls',
            el('p', 'Тип виробництва'),
            this.addItem = el('div.add-item', el('span', '+'), 'додати тип виробництва')
        )

        this.defaultOption = {
            id: 0,
            name: 'Вибрати'
        }

        this.initData.unshift(this.defaultOption)

        this.modalRowWrapper = el('div.modal-row__manufactury-type-wrapper')
        this.modalLayer = el('div.modal-row__layer.empty-layer',
            this.list = list(this.modalRowWrapper, WorkModalManufacturyTypeRow, 'id')
        )

        this.el = el('div.manufactury-type__layer.modal-row__inner-layer',
            this.controls,
            this.modalLayer,
        )

        this.addItem.addEventListener('click', (e) => {
            addManufacturyType(this.data.id)
        })
    }

    update(data, context) {

        let {
            adding
        } = context
        if (!adding) {
            data.data = data.data.filter(el => {
                if (el.id_spec_job_list === '0') {
                    deleteManufacturyType(el.id, undefined)
                }
                return el.id_spec_job_list !== '0'
            })
        }

        this.productsArr = data.data.map(el => el.id_spec_job_list)

        this.initData.forEach(el => {
            data.data.forEach((elem, ind) => {
                if (elem.id_spec_job_list === el.id) {
                    this.finalArr[ind] = el.name
                }
            })
        })


        this.list.update(data.data, {
            id_employer: data.id,
            products: this.productsArr,
            initData: this.initData,
            final: this.finalArr
        })

        this.finalArr = []


        //Вызов функций которые зависят от инстанса класса
        checkIfWrapperIsEmpty(this.modalRowWrapper)

        this.data = data
        // this.data.index = index
    }

    getItemsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('type_manufactury')) || []

        return {
            products
        }
    }

}

Object.assign(WorkModalManufacturyType.prototype, hiddenClassMixin)