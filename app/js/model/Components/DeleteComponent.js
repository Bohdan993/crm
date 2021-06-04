
import deleteElement from '../fetchingData/deleteElement'
import {el, setAttr, MicroModal} from '../../../libs/libs'
import employerListDeleteEvent from '../CustomEvents/employerListDeleteEvent'
import vacancyListDeleteEvent from '../CustomEvents/vacancyListDeleteEvent'

export default class Delete { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.type = type
        this.data = {}
        this.el = el('div.sidebar__filter-wrapper', 
            this.delete = el('p', 'Удалить'),
            this.date = el('span'))

        this.clickHandler = (e) => {
            let conf = confirm(`Подтвердите удаление ${this.type === 'employer' ? 'работодателя' : 'вакансии'}`)
            if(conf) {
            if(this.type === 'employer') {
                deleteElement({str: 'employers', id: this.data.id})
                .then(res => {
                    if(res.status === 'ok') {

                        employerListDeleteEvent.detail.id = this.data.id
                        document.dispatchEvent(employerListDeleteEvent)
                        MicroModal.close('modal-1')
                    }

                    if(res.status === 'fail') {
                        return
                    }
                })
            } else {
                deleteElement({str: 'vacancies', id: this.data.id})
                .then(res => {
                    if(res.status === 'ok') {

                        vacancyListDeleteEvent.detail.id = this.data.id
                        document.dispatchEvent(vacancyListDeleteEvent)
                        MicroModal.close('modal-3')
                    }

                    if(res.status === 'fail') {
                        return
                    }
                })
                }
            } else {
                return
            }
            
        }

        this.delete.addEventListener('click', this.clickHandler)
        
    }


    update(data) {
        setAttr(this.date, {
            innerText: data.date
        })

        this.data.id = data.id
    }
}

