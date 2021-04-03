

import addTask from '../fetchingData/Employer/WorkModal/addTask'
import deleteTask from '../fetchingData/Employer/WorkModal/deleteTask'
import saveFieldsData from '../fetchingData/saveFieldsData'
import {el, svg, list, setAttr} from '../../../libs/libs'
import initElasticArea from '../initElasticArea'
import vacanciesStrorage from '../Storage'
import employersStorage from '../Storage/globalEmployers'


// console.log(employersStorage)
class TaskItem {
	constructor(type){
        // console.log(employersStorage)

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
                // if(this.type === 'employer') {
                    this.context.count--

                    if(this.type === 'employer') {

                        // console.log(this.context)
                        deleteTask({
                            id: this.data.id_employer_task, 
                            id_employer: this.context.id,
                            str: 'employers'
                        })
                    } else {
                        deleteTask({
                            id: this.data.id_employer_task, 
                            id_employer: this.context.id,
                            str: 'vacancies'
                        })
                    }
                    

                    if(this.type === 'employer') {
                        employersStorage.setPartialState(this.context.id, 'id_employer', 'task', (this.context.count > 0))
                    }
				
			})

            this.textarea.addEventListener('change', e=> {
                
                   saveFieldsData({
                    str: 'employers',
                    id: this.context.id,
                    value: encodeURIComponent(this.textarea.value), 
                    field: 'name', 
                    target: 'task', 
                    id_target: this.data.id_employer_task
                   })
                   
                if(this.type === 'employer' && this.__redom_index === this.context.count - 1) {
                    employersStorage.setPartialState(this.context.id, 'id_employer', 'task_last', this.textarea.value)
                }
            })

            this.textarea.addEventListener('input', e => {
                initElasticArea(this.textarea)
            })
            


	}

	update(data, index, items, context) {

        // console.log(context, 'ONE TASK')


        // console.log(context)
        
		setAttr(this.textarea, {
			value: data.name
		})

		this.data = data
		this.context = context

        // console.log(this.context)
	}

    onmount (){
        // console.log('i am mounted')
        initElasticArea(this.textarea)
    }
}

export default class Task { // to ../fetchingData/Employer/WorkModal
    constructor(type) {
        this.type = type
        this.el = el('div.input-group.add-task-group',
        	el('div.input-group__control',
        		el('p', 'Задачи'),
        		this.addTask = el('div.add-item', 
        			el('span', '+'), 'добавить')
        	),
        	this.list = list('div.tasks-layer', TaskItem, 'id_employer_task', type)
        )
        
        

        this.addTask.addEventListener('click', e => {
                console.log(type)
                this.count++
                if(this.type === 'employer') {
                    addTask({
                        id: this.data.id,
                        str:'employers'
                    })
                    employersStorage.setPartialState(this.data.id, 'id_employer', 'task', (this.count > 0))
                } else {
                    addTask({
                        id: this.data.id,
                        str:'vacancies'
                    })
                }
        		
            })
    }
    update(data) {
        
    	console.log(data)
        this.count = data.tasks ? data.tasks.length : 0
    	this.list.update(data.tasks, {id: data.id, count: this.count})
     	this.data = data
        
    }


    onmount() {


        //Обновить список задач при загрузке информации о работодателе на странице вакансий
        document.addEventListener('storageemployeradd', (e) => {
            this.list.update(vacanciesStrorage.getState(e.detail.id).task)

            if(this.type === 'vacancy') {
                this.data.id = e.detail.id
            }
        })

    }
}

