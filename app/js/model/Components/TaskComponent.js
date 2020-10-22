

import addNewTask from '../addNewTask'
import addTask from '../fetchingData/Employer/WorkModal/addTask'
import deleteTask from '../fetchingData/Employer/WorkModal/deleteTask'

import {el, svg, list, setAttr} from '../../../libs/libs'


class TaskItem {
	constructor(){
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
				deleteTask({
					id: this.data.id_employer_task, 
					id_employer: this.context.id,
					str: 'employers'
				})
			})
	}

	update(data, index, items, context) {
		console.log(data)
		setAttr(this.textarea, {
			value: data.name
		})

		this.data = data
		this.context = context
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
        	this.list = list('div.tasks-layer', TaskItem, 'id_employer_task')
        )
        
        addNewTask(this.addTask)

        this.addTask.addEventListener('click', e => {
        	console.log('yes')
        	if(type === 'employer') {
        		console.log('yes')
        		addTask(
        			{
        			id: this.data.id,
							str:'employers'
							})
        	}
        	
        })
        
    }
    update(data) {
    	console.log(data)
    	this.list.update(data.tasks, {id: data.id})
     	this.data = data
    }
}

