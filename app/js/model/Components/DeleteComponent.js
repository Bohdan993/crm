
import deleteElement from '../fetchingData/deleteElement'
import {el, setAttr, MicroModal} from '../../../libs/libs'
import getEmployersList from '../fetchingData/Employer/getEmployersList'

export default class Delete { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.type = type
        this.data = {}
        this.el = el('div.sidebar__filter-wrapper', 
            this.delete = el('p', 'Удалить'),
            this.date = el('span'))

        this.delete.addEventListener('click', (e)=> {
            let conf = confirm(`Подтвердите удаление ${this.type === 'employer' ? 'работодателя' : 'вакансии'}`)
            if(conf) {
            if(this.type === 'employer') {
                deleteElement({str: 'employers', id: this.data.id})
                .then(res => {
                    if(res.status === 'ok') {
                        getEmployersList({deleated: true, id: res.id})
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
            
        })
        
    }


    update(data) {
        setAttr(this.date, {
            innerText: data.date
        })

        this.data.id = data.id
    }
}

