import {el, setAttr, list} from '../../../../libs/libs'
import RowVacancy from './VacancyRow'
import initWorkPopup from '../../initWorkPopup'



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
        // this.count = data.length ? data[data.length - 1]['id_vacancy'] : ''


        this.list.update(data, this.indicatorsClasses)
        // console.log(this.count)
        // console.log(data[data.length - 1])
        //Инициализация функций которые зависят от инстанса класса
         if(!this.flag) {
            initWorkPopup()
            this.flag = true
        }
        //
    }

    onmount() {
  
    }
}