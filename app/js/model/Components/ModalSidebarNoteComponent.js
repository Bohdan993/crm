

import saveFieldsData from '../fetchingData/saveFieldsData'
import {el, svg, list, setAttr} from '../../../libs/libs'
import initElasticArea from '../initElasticArea'
import storage from '../Storage'


export default class Note { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
    		this.type = type
        this.el = el('div.input-group',
        		el('p', 'Заметки'),
        		this.textArea = el('textarea.sidebar__area-notes', {
        			rows: 5
        		})
        )

        this.textArea.addEventListener('change', e => {
        	if(type === 'employer') {
                saveFieldsData({
                    str: 'employers',
                    id: this.data.id,
                    value: this.textArea.value, 
                    field: 'note', 
                    target: 'main', 
                    id_target: ''
                   })
        	} else {
                // console.log(this.data.id)
                saveFieldsData({
                    str: 'vacancies',
                    id: this.data.id,
                    value: this.textArea.value, 
                    field: 'note', 
                    target: 'employer', 
                    id_target: ''
                   })
            }
        	
        })

        this.textArea.addEventListener('input', e => {
            initElasticArea(this.textArea)
          })
        
    }
    update(data) {
        console.log(data)
    	setAttr(this.textArea, {
    		value: data && data.notes || data && data.notes === ''  ? data.notes : data
    	})

     	this.data = data
    }

    onmount(){
    	initElasticArea(this.textArea)
        document.addEventListener('storageemployeradd', (e) => {
            console.log(storage.getState(e.detail.id).employer.note)
            this.update(storage.getState(e.detail.id).employer.note)
        })
    }
}
