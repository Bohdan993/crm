import {el, setAttr, list} from '../../../../libs/libs'
import RowVacancy from './VacancyRow'
import initWorkPopup from '../../initWorkPopup'


function byField(field) {
  return (a, b) => +a[field] > +b[field] ? 1 : -1;
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
       

        this.flag = false

    }
    update(data) {

        data.sort(byField('id_vacancy')).sort(byField('archive'))

        this.list.update(data, {
            classes: this.indicatorsClasses,
            productsData: this.getItemsFromLocalStorage().products
        })
        //Инициализация функций которые зависят от инстанса класса
         if(!this.flag) {
            initWorkPopup()
            this.flag = true
        }
        //
    }

    onmount() {
  
    }


    getItemsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('type_manufacturyVacancy')) || []

        return {
            products
        }
    }
}