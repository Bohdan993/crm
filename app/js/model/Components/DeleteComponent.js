
import deleteElement from '../fetchingData/deleteElement'
import {el, setAttr, MicroModal} from '../../../libs/libs'


export default class Delete { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.type = type
        this.data = {}
        this.el = el('div.sidebar__filter-wrapper', 
            this.delete = el('p', 'Удалить'),
            this.date = el('span'))

        this.delete.addEventListener('click', (e)=> {

            if(this.type === 'employer') {
                deleteElement({str: 'employers', id: this.data.id})
                .then(res => {
                    if(res === 'ok') {
                        MicroModal.close('modal-1')
                    }

                    if(res === 'fail') {
                        return
                    }
                })
                
            } else {
                deleteElement({str: 'vacancies', id: this.data.id})
                .then(res => {
                    if(res === 'ok') {
                        MicroModal.close('modal-3')
                    }


                    if(res === 'fail') {
                        return
                    }
                })
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

