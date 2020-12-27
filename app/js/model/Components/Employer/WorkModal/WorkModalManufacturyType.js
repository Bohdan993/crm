import {
    el,
    setAttr,
    list
} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import Option from '../../OptionComponent'
import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'
import saveFieldsData from '../../../fetchingData/saveFieldsData'
import addManufacturyType from '../../../fetchingData/Employer/WorkModal/addManufacturyType'
import deleteManufacturyType from '../../../fetchingData/Employer/WorkModal/deleteManufacturyType'
import storage from '../../../Storage/globalEmployers'

class WorkModalManufacturyTypeRow {
    constructor() {
        this.final = []
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

        this.defaultOption = {
            id: 0,
            name: 'Выбрать'
        }

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

            console.log(this.data)

            this.data.context.products[this.data.index] = this.select.el.value

            console.log(this.data.context.products)

            this.data.context.initData.forEach(el => {
                this.data.context.products.forEach(elem => {
                    if (elem === el.id) {
                        this.final.push(el.name)
                    }
                })
            })

            storage.setPartialState(this.data.context.id_employer, 'id_employer', 'production', this.final)
        })

    }

    update(data, index, items, context) {
        console.log(data)
        let arr = context.initData
        arr.unshift(this.defaultOption)
        this.select.update(arr)
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
        this.data = {}
        this.controls = el('div.modal-row__controls',
            el('p', 'Тип производства'),
            this.addItem = el('div.add-item', el('span', '+'), 'добавить тип производства', {
                'data-id': '111'
            })
        )

        this.modalRowWrapper = el('div.modal-row__manufactury-type-wrapper')
        this.modalLayer = el('div.modal-row__layer.empty-layer',
            this.list = list(this.modalRowWrapper, WorkModalManufacturyTypeRow, 'id')
        )

        this.el = el('div.manufactury-type__layer.modal-row__inner-layer',
            this.controls,
            this.modalLayer,
            // this.showMore = place(ShowMoreBtn)
        )

        this.addItem.addEventListener('click', (e) => {
            addManufacturyType(this.data.id)
        })
    }

    update(data, index, items, context) {
        console.log(data)
        this.productsArr = data.data.map(el => el.id_spec_job_list)

        console.log(this.productsArr)
        // if(data.id !== this.data.id) {
        this.list.update(data.data, {
            id_employer: data.id,
            products: this.productsArr,
            initData: this.getItemsFromLocalStorage().products
        })

        
        //Вызов функций которые зависят от инстанса класса
        checkIfWrapperIsEmpty(this.modalRowWrapper)
        //
        // }

        this.data = data
        this.data.index = index
    }

    getItemsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('type_manufactury'))

        return {
            products
        }
    }

}

Object.assign(WorkModalManufacturyType.prototype, hiddenClassMixin)