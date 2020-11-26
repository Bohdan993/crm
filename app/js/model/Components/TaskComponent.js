

import addNewTask from '../addNewTask'
import addTask from '../fetchingData/Employer/WorkModal/addTask'
import deleteTask from '../fetchingData/Employer/WorkModal/deleteTask'
import saveFieldsData from '../fetchingData/saveFieldsData'
import {el, svg, list, setAttr} from '../../../libs/libs'
import initElasticArea from '../initElasticArea'

class TaskItem {
	constructor(type){
        this.type = type
		this.el = el('div.add-task-item', 
        		el('i.ico', 
        			svg('svg', svg('use', {
        				xlink: {href: "img/sprites/svg/symbol/sprite.svg#attention"}
        			}))),
        		this.textarea = el('textarea.sidebar__task-input', {
        			rows: '1',
        			'data-elastic': true
        		}),
        		this.delete = el('span.delete-task-item'))

			this.delete.addEventListener('click', e => {
                if(this.type === 'employer') {
                    deleteTask({
                        id: this.data.id_employer_task, 
                        id_employer: this.context.id,
                        str: 'employers'
                    })
                } else {

                }
				
			})

            this.textarea.addEventListener('change', e=> {
                
                if(this.type === 'employer') {
                   saveFieldsData({
                    str: 'employers',
                    id: this.context.id,
                    value: this.textarea.value, 
                    field: 'name', 
                    target: 'task', 
                    id_target: this.data.id_employer_task
                   })
                } else {

                }
            })

            this.textarea.addEventListener('input', e => {
                initElasticArea(this.textarea)
            })
            


	}

	update(data, index, items, context) {
        
		setAttr(this.textarea, {
			value: data.name
		})

		this.data = data
		this.context = context
	}

    onmount (){
        initElasticArea(this.textarea)
    }
}

export default class Task { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.el = el('div.input-group.add-task-group',
        	el('div.input-group__control',
        		el('p', 'Задачи'),
        		this.addTask = el('div.add-item', 
        			el('span', '+'), 'добавить')
        	),
        	this.list = list('div.tasks-layer', TaskItem, 'id_employer_task', type)
        )
        

        this.addTask.addEventListener('click', e => {
        	// console.log('yes')
        	if(type === 'employer') {
        		addTask(
        			{
            			id: this.data.id,
        				str:'employers'
    				})
        	} else {

            }
        	
        })
        
    }
    update(data) {
    	console.log(data)
    	this.list.update(data.tasks, {id: data.id})
     	this.data = data
    }


    onmount() {
        addNewTask(this.addTask)
    }
}

