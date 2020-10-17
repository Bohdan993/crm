import {el, setAttr, list, place, svg, unmount, Autocomplete, toastr} from '../../../libs/libs';
import hiddenClassMixin from '../Mixins/hiddenClassMixin'
import ShowMoreBtn from './Employer/WorkModal/ShowMoreBtn'
import checkIfWrapperIsEmpty from '../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../OverlayScrollbarsInit'
import getWorkModalFeedback from '../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import addFeedback from '../fetchingData/Employer/WorkModal/addFeedback'
import deleteFeedback from '../fetchingData/Employer/WorkModal/deleteFeedback'
import changeDirection from '../changeDirection'
import { initWorkModalTooltip } from '../initToottips'



class FeedbackTypeRow {
	constructor(){
		this.el = el('div.input-group',
		this.input = el('input', {id: 'inf-feedback-rbtn', type: 'radio', name: 'type-feedback-rbtn'}),
		this.label = el('label', {for: 'inf-feedback-rbtn'}, 
			el('i.ico',
				svg('svg', this.svg = svg('use', {
					xlink: {href: "img/sprites/svg/symbol/sprite.svg#inf-feedback"}
				}))),
				this.text = el('span', 'Информационный'))
		)

	}
	update(data){

		// console.log(data['data-id'])
		setAttr(this.input, {
			'data-id': data['data-id'],
			id: data.id, 
			name: data.name,
			type: 'radio',
			checked: data.checked
		})

		setAttr(this.label, {
			for: data.id,
		})

		setAttr(this.text, {
			innerText: data.label
		})

		setAttr(this.svg, {
			xlink: {href: `img/sprites/svg/symbol/sprite.svg#${data.ico}`}
		})
		
	}
}

class FeedbackClient {
	constructor(){
		this.data =  JSON.parse(localStorage.getItem('clients'))
		this.el = el('div', 
				this.main = el('div.work-modal-popup#choice-client-feedback-popup', 
				this.form = el('form',
					el('div.input-group',
						this.inputClient = el('input#client-feedback-rbtn', {type: 'radio', name: 'client-feedback-rbtn', checked: true}),
						el('label', 'Выберите клиента', {for: 'client-feedback-rbtn'}),
						this.searchGroup = el('div.autocomplete',
									this.findClient = el('input.find-client', {
										disabled: false
									}),
									this.resultList = el('ul.autocomplete-result-list')
							)
						),
					el('div.input-group',
						this.inputUAMF = el('input#uamf-feedback-rbtn', {type: 'radio', name: 'client-feedback-rbtn', checked: false}),
						el('label', 'УАМФ', {for: 'uamf-feedback-rbtn'}),
						),
					this.confirm = el('button.confirm-bnt', 
						el('span', 'ОК'))
					)
				)
			)


		this.autocomplete = new Autocomplete(this.searchGroup, {
			search: input => {
			  try {
							 if (input.length < 1) {
					        return []
					     }

					     return this.data.filter(client => {
						      return client.snp.toLowerCase()
						        .includes(input.toLowerCase())
						    })

			    	}
			    catch(err) {
			    		console.error(err)
			    }

		  },
		  renderResult(result, props) {
		  	return `
				    <li ${props}>
				      <div class="wiki-title">
				        ${result.snp}
				      </div>
				    </li>
				  `
		  },
		  
		  // // We want to display the title
		  getResultValue: result => {
		  	sessionStorage.setItem('currClient', JSON.stringify(result.id))
		  	return result.snp
		  },
		  autoSelect: true

		})

		this.inputClient.addEventListener('change', (e) => {
			if(this.inputClient.checked) {
				setAttr(this.findClient, {
					disabled: false
				})
			}
		})

		this.inputUAMF.addEventListener('change', (e) => {
			if(this.inputUAMF.checked) {
				setAttr(this.findClient, {
					disabled: true
				})
			}
			
		})

		// console.log(this)

		this.form.addEventListener('submit', (e) => {
			e.preventDefault()
			// console.log(this.parent)
			if(this.inputClient.checked) {
				if(this.findClient.value.trim() === '') {
					toastr.error(`Выберите клиента`, 'Ошибка!')
					this.parent.changechoiseClientText('Выбрать')
					return
				}
				this.parent.changechoiseClientText(this.findClient.value.trim())
			}

			if(this.inputUAMF.checked) {
				this.parent.changechoiseClientText('УАМФ')
			}
		})
	}

	update(data){
		if(data.from === 'УАМФ') {
			this.inputUAMF.checked = true
			this.inputClient.checked = false
			this.findClient.disabled = true
		} else if (data.from === 'Выбрать') {
			this.inputUAMF.checked = false
			this.inputClient.checked = true
			this.findClient.disabled = false
		} else {
			this.inputUAMF.checked = false
			this.inputClient.checked = true
			this.findClient.disabled = false
			this.findClient.value = data.type_arrow === '0' ? data.from : data.to
		}
	}
}




class FeedbackType {
	constructor(){
		this.el = el('div', 
				this.main = el('div.work-modal-popup#type-feedback-popup', 
				this.form = el('form.feedbackType-form', 
					el('p', 'Тип отзыва'),
					this.list = list('div', FeedbackTypeRow),
					this.confirm = el('button.confirm-bnt', 
						el('span', 'ОК'))
					)
				)
			)
		this.feedbackTypeData = [
			{
				'data-id': 0,
				id: 'inf-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Информационный',
				ico: 'inf-feedback',
				checked: true
			},
			{
				'data-id': 1,
				id: 'pos-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Хороший отзыв',
				ico: 'pos-feedback',
				checked: false
			},
			{
				'data-id': 2,
				id: 'neg-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Плохой отзыв',
				ico: 'neg-feedback',
				checked: false
			}
		]


		this.form.onsubmit = (e) => {
			e.preventDefault()

			this.list.views.forEach(view => {
				if(view.input.checked) {
						this.parent.changeTypeFeedbackIco(view.input.getAttribute('data-id'))
					}
				})
			}

		}

	update(data){
		this.feedbackTypeData = this.feedbackTypeData.map(el => {
			el.checked = false
			if(String(el['data-id']) === data.typeFeedback) {
				el.checked = true
			}

			return el
		})

		this.list.update(this.feedbackTypeData)
	}

}





class FeedbackEdit {
	constructor(){
		this.data = {}

		this.el = el('form.modal-row__feedback-row.add-feedback-form', 
			el('div.modal-row__feedback-speakers', 
				this.typeFeedback = el('i.modal-row__feedback-ico', 
					svg('svg', this.typeFeedbackIco = svg('use', {
						xlink: {href: 'img/sprites/svg/symbol/sprite.svg#pos-feedback-white'}
					}))),
				this.choiseClient = el('a.modal-row__feedback-choise', 'Выбрать'),
				this.direction = el('i.modal-row__feedback-direction-edit.change-direction', 
					svg('svg', svg('use', {
						xlink: {href:"img/sprites/svg/symbol/sprite.svg#arrow-white"}
					}))),
				this.to = el('p.modal-row__feedback-to', 'Thompson Equestrian Partners')
				),
			el('div.modal-row__feedback-date',
				this.date = el('input', {
					type: 'text'
				})),
			el('div.modal-row__feedback-text',
				this.textarea = el('textarea', {
					name: '',
					rows: 3,
					value: 'text'
				})
				),
			el('div.modal-row__feedback-controls',
				el('div.modal-row__feedback-controls_left',
					this.cancel = el('button.modal-row__feedback-cancel.feedback-btn', 'Отменить'),
					this.saveFeedback = el('button.modal-row__feedback-save.feedback-btn', 'Сохранить')
					),
				el('div.modal-row__feedback-controls_right',
					this.delete = el('button.modal-row__feedback-delete.delete-btn', 'Удалить')
					)
				)
			)

		this.parent = this.el.parentNode

		this.saveFeedback.addEventListener('click', (e) => {
			e.preventDefault()

			if(this.data.type === 'employer') {
				console.log(this.data)
				addFeedback({
					str: 'employers/feedback',
					id_feedback: this.data.id_feedback, 
					feedback: this.textarea.value.trim(), 
					type_feedback: this.typeFeedback.getAttribute('data-id') || '0', 
					id_author: this.choiseClient.getAttribute('data-author') === '1' ? +JSON.parse(sessionStorage.getItem('currClient')) : '1', 
					type_author: this.choiseClient.getAttribute('data-author') || '2',
					type_arrow: this.direction.classList.contains('rotate') ? '1' : '0', 
					date: this.date.value.trim(), 
					id_employer: this.data.id,
					count: this.data.count
				})
			}

			this.feedbackEditPlace.update(false)
			this.rowPlace.update(true)
			
		})

		this.cancel.addEventListener('click', (e) => {
			e.preventDefault()
			// console.log(this)
			this.feedbackEditPlace.update(false)
			this.rowPlace.update(true)
		})

		this.delete.addEventListener('click' , (e) => {

		})

		this.feedbackType = new FeedbackType()
		this.feedbackType.main.style.display = "block"
		this.feedbackClient = new FeedbackClient()
		this.feedbackClient.main.style.display = "block"

		this.feedbackType.parent = this
		this.feedbackClient.parent = this

		
		changeDirection(this.direction)

		this.typeFeedbackInstance = initWorkModalTooltip(this.typeFeedback)
		this.choiseClientInstance = initWorkModalTooltip(this.choiseClient)

		// console.log(this.typeFeedbackInstance)

		this.typeFeedbackInstance.setContent(this.feedbackType.el)
		this.choiseClientInstance.setContent(this.feedbackClient.el)

	}

	update(data){
		console.log(data)
		setAttr(this.to, {
			innerText: JSON.parse(sessionStorage.getItem('currEmployerName'))
		})

		setAttr(this.choiseClient, {
			innerText: data.type_arrow === '0' ? data.from : data.to
		})

		this.changechoiseClientText(data.type_arrow === '0' ? data.from : data.to)
		this.changeTypeFeedbackIco(data.typeFeedback)

		setAttr(this.direction, {
			classList: data.type_arrow === '0' ? 'modal-row__feedback-direction-edit change-direction' : 'modal-row__feedback-direction-edit change-direction rotate'
		})

		setAttr(this.textarea, {
			value: data.text
		})

		setAttr(this.typeFeedbackIco, {
			xlink: {
				href: `img/sprites/svg/symbol/sprite.svg#${data.type_feedback === '0' ? 'inf-feedback-white' : data.type_feedback === '1' ? 'pos-feedback-white' : 'neg-feedback-white'}`
			}
		})

		setAttr(this.date, {
			value: data.date
		})
		// console.log(this.data)


		this.data = data
		this.feedbackType.update(this.data)
		this.feedbackClient.update(this.data)

	}

	changeTypeFeedbackIco(id){
		setAttr(this.typeFeedbackIco, {
			xlink: {href: `img/sprites/svg/symbol/sprite.svg#${id === '0' ? 'inf-feedback-white' : id === '1' ? 'pos-feedback-white' : 'neg-feedback-white'}`}
		})

		setAttr(this.typeFeedback, {
			'data-id': id
		})
	}


	changechoiseClientText(text){
		setAttr(this.choiseClient, {
			innerText: text,
			'data-author': text === 'УАМФ' ? '2' : '1'
		})
	}

}



class FeedbackRow {
	constructor(){
		this.data = {}
		this.el = el('div', 
				this.row = place(el('div.modal-row__feedback-row', 
				el('div.modal-row__feedback-speakers',
					el('i.modal-row__feedback-ico', 
						svg('svg', this.typeFeedback = svg('use', {
							xlink: {href: 'img/sprites/svg/symbol/sprite.svg#pos-feedback'}
						}))
						),
					this.from = el('p.modal-row__feedback-from', 'УАМФ'),
					this.direction = el('i.modal-row__feedback-direction.rotate', 
						svg('svg', this.arrow = svg('use', {
							xlink: {href: 'img/sprites/svg/symbol/sprite.svg#arrow'}
						}))),
					this.to = el('p.modal-row__feedback-to', 'Thompson Equestrian Partners')
					),
				el('div.modal-row__feedback-date', 
					this.date = el('time', '09.10.2018'), 
					this.edit = el('button.modal-row__feedback-edit.edit-btn', 'Редактировать')
					),
				this.text = el('div.modal-row__feedback-text', 
					el('p', 'text'))
				)),
				this.feedbackEdit = place(FeedbackEdit)
			)
		this.row.update(true)

		this.edit.addEventListener('click', (e) => {
			this.row.update(false)
			// console.log(this.data)
			this.feedbackEdit.update(true, {
				id_feedback: this.data.data.id,
				type: this.data.context.type,
				id: this.data.context.id,
				count: this.data.context.count,
				text: this.text.innerText,
				date: this.date.innerText,
				typeFeedback: this.data.data.type_feedback,
				from: this.from.innerText,
				to: this.to.innerText,
				type_arrow: this.data.data.type_arrow,
			})

			this.feedbackEdit.view.feedbackEditPlace = this.feedbackEdit
			this.feedbackEdit.view.rowPlace = this.row

		})

	}


	update(data, index, items, context){

		console.log(data)
		console.log(context)

		setAttr(this.text, {
			innerText: data.feedback
		})

		setAttr(this.date, {
			innerText: data.date
		})

		setAttr(this.typeFeedback, {
			xlink: {
				href: `img/sprites/svg/symbol/sprite.svg#${data.type_feedback === '0' ? 'inf-feedback' : data.type_feedback === '1' ? 'pos-feedback' : 'neg-feedback'}`
			}
		})


		// setAttr(this.direction, {
		// 	classList: data.type_arrow === 1 ? '' : 'rotate'
		// })

		setAttr(this.from, {
			innerText: data.type_arrow === '0' ? data.type_author === '2' ? 'УАМФ' : context.storage.clients.filter(el => el.id === data.id_author)[0].snp : JSON.parse(sessionStorage.getItem('currEmployerName'))
		})


		setAttr(this.to, {
			innerText: data.type_arrow === '1' ? data.type_author === '2' ? 'УАМФ' : context.storage.clients.filter(el => el.id === data.id_author)[0].snp : JSON.parse(sessionStorage.getItem('currEmployerName'))
		})


		this.data.context = context
		this.data.data = data

	}
}


export default class Feedback {
	constructor(type){
		this.data = {}
		this.controls = el('div.modal-row__controls',
			el('p', 'Отзывы', 
				el('span', ' 4'),
				el('span', ' ('),
				el('span.negative', 'негативных - 2'),
				el('span', ')')
				),
			this.addItem = el('div.add-item', el('span', '+'), 'добавить отзыв')
			)
		

		this.modalRowWrapper = el(`div.modal-row__feedback-${type}-wrapper.modal-row__wrapper`)

		this.modalLayer = el('div.modal-row__layer.empty-layer', 
			this.list = list(this.modalRowWrapper, FeedbackRow, 'id')
		)


		this.el = el(`div.feedback-${type}__layer`,
				this.controls,
				this.feedbackEdit = place(FeedbackEdit),
				this.modalLayer,
				this.showMore = place(ShowMoreBtn)
			)

		this.addItem.addEventListener('click', (e)=> {

			this.feedbackEdit.update(true, {
				id_feedback: '0',
				type,
				id: this.data.data.id,
				count: this.data.count,
				text: '',
				date: '',
				typeFeedback: '0',
				from: 'Выбрать',
				to: '',
				type_arrow: '0'
			})

			this.feedbackEdit.view.feedbackEditPlace = this.feedbackEdit

		})

		initOverlayScrollbars(this.modalLayer)

		this.data.storage = this.getItemsLocalStorage()
		this.data.type = type
		this.pageShow = 2
		this.flagShow = false
	}

	 update(data, index, items, context) {

	 		let {loading, showing} = data
	 		if(showing) {
				this.pageShow++
			}

			if(loading) {
				this.pageShow = 2
				this.feedbackEdit.update(false)
			}

			this.data.data = data
			this.data.index = index
			this.data.count = (this.pageShow - 1) * 5
			this.list.update(data.data, {storage: this.data.storage, id:this.data.data.id, count: this.data.count, type: this.data.type})


			//Пагинация
				if(data.data.length < data.total) {
				this.showMore.update(true, 'показать еще')

				if(!this.flagShow) {
					this.showMore.el.addEventListener('click', ()=> {
							getWorkModalFeedback({id: this.data.data.id, showing: true, p: this.pageShow})
							// console.log(this.pageShow)
					})

						this.flagShow = true
				}

			} else {
				this.showMore.update(false)
				this.flagShow = false
			}

			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalRowWrapper)
			//

	}

	getItemsLocalStorage(){
		const clients = JSON.parse(localStorage.getItem('clients'))

		return {
				clients
			}
	}


}

Object.assign(Feedback.prototype , hiddenClassMixin)