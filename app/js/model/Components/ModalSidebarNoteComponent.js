

import saveFieldsData from '../fetchingData/saveFieldsData'
import {el, svg, list, setAttr} from '../../../libs/libs'
import initElasticArea from '../initElasticArea'



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
            }
        	
        })

        this.textArea.addEventListener('input', e => {
              initElasticArea(this.textArea)
          })
        
    }
    update(data) {

    	setAttr(this.textArea, {
    		value: data.notes
    	})

     	this.data = data
    }

    onmount(){
    	initElasticArea(this.textArea)
    }
}
