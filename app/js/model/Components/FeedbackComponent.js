import {el, setAttr, list, place, svg} from '../../../libs/libs';
import hiddenClassMixin from '../Mixins/hiddenClassMixin'
import ShowMoreBtn from './Employer/WorkModal/ShowMoreBtn'
import checkIfWrapperIsEmpty from '../checkIfWrapperIsEmpty'
import initOverlayScrollbars from '../OverlayScrollbarsInit'
import getWorkModalFeedback from '../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import addFeedback from '../fetchingData/Employer/WorkModal/addFeedback'
import deleteFeedback from '../fetchingData/Employer/WorkModal/deleteFeedback'
import changeDirection from '../changeDirection'
import { initWorkModalTooltip } from '../initToottips'
import { typeFeedbackTemplate, choiceClientTemplate } from '../../view'



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

		this.input.addEventListener('change', function (e) {
			feedbackEditPlace.changeTypeFeedbackIco(this.getAttribute('data-id'))
		})
	}
	update(data){
		console.log(data['data-id'])
		setAttr(this.input, {
			'data-id': data['data-id'],
			id: data.id, 
			name: data.name,
			type: 'radio'
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
		this.el = el('div.work-modal-popup#choice-client-feedback-popup', 
			el('form',
				el('div.input-group',
					el('input#client-feedback-rbtn', {type: 'radio', name: 'client-feedback-rbtn', checked: false}),
					el('label', 'Выберите клиента', {for: 'client-feedback-rbtn'}),
					el('input.find-client')
					),
				el('div.input-group',
					el('input#uamf-feedback-rbtn', {type: 'radio', name: 'client-feedback-rbtn', checked: false}),
					el('label', 'УАМФ', {for: 'uamf-feedback-rbtn'}),
					),
				el('button.confirm-bnt', 
					el('span', 'ОК'))
				)
			)
	}

	update(data){
		
	}
}

class FeedbackType {
	constructor(){
		this.el = el('div.work-modal-popup#type-feedback-popup', 
			el('form', 
				el('p', 'Тип отзыва'),
				this.list = list('div', FeedbackTypeRow),
				el('button.confirm-bnt', 
					el('span', 'ОК'))
				)
			)

		this.feedbackTypeData = [
			{
				'data-id': 1,
				id: 'inf-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Информационный',
				ico: 'inf-feedback'
			},
			{
				'data-id': 2,
				id: 'pos-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Хороший отзыв',
				ico: 'pos-feedback'
			},
			{
				'data-id': 3,
				id: 'neg-feedback-rbtn',
				name: 'type-feedback-rbtn',
				label: 'Плохой отзыв',
				ico: 'neg-feedback'
			}
		]
	}

	update(data){

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

		this.saveFeedback.addEventListener('click', (e) => {
			e.preventDefault()
			console.log(this.data)
			if(this.data.type === 'employer') {
				addFeedback({
					str: 'employers/feedback',
					id_feedback: 0, 
					feedback: this.textarea.value.trim(), 
					type_feedback: 2, 
					id_author: 23, 
					type_author: 'user',
					type_arrow: this.direction.classList.contains('rotate') ? true : false, 
					date: this.date.value.trim(), 
					id_employer: this.data.id,
					count: this.data.count
				})
				// console.log(this.data)
			}
			
		})

		this.cancel.addEventListener('click', (e) => {
			e.preventDefault()
			feedbackEditPlace.update(false)
		})

		this.delete.addEventListener('click' , (e) => {


		})
		// console.log(this.typeFeedback.className)

		this.feedbackType = new FeedbackType()
		this.feedbackType.update()
		this.feedbackType.el.style.display = "block"
		this.feedbackClient = new FeedbackClient()
		this.feedbackClient.update()
		this.feedbackClient.el.style.display = "block"


		changeDirection(this.direction)
		initWorkModalTooltip('.row.feedback', '.' + this.typeFeedback.className, this.feedbackType.el)
		initWorkModalTooltip('.row.feedback', '.' + this.choiseClient.className, this.feedbackClient.el)
	}

	update(data){
		console.log(data)

		setAttr(this.to, {
			innerText: JSON.parse(sessionStorage.getItem('currEmployerName'))
		})
		this.data = data
	}

}


const feedbackEditPlace = place(FeedbackEdit)

feedbackEditPlace.changeTypeFeedbackIco = function(id){
	setAttr(this.view.typeFeedbackIco, {
		xlink: {href: `img/sprites/svg/symbol/sprite.svg#${id === '1' ? 'inf-feedback-white' : id === '2' ? 'pos-feedback-white' : 'neg-feedback-white'}`}
	})
}


// feedbackEditPlace.changechoiseClientText = function(id){
// 	setAttr(this.view.choiseClient, {
// 		innerText: 
// 	})
// }

class FeedbackRow {
	constructor(){

		this.el = el('div.modal-row__feedback-row', 
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
				el('p', 'text')),
			)

		this.edit.addEventListener('click', (e) => {

		})

	}


	update(data, index, items, context){

		console.log(context.storage.clients)

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

		setAttr(this.from, {
			innerText: data.type_arrow === '0' ? data.type_author === '2' ? 'УАМФ' : context.storage.clients.filter(el => el.id === data.id_author)[0].snp : JSON.parse(sessionStorage.getItem('currEmployerName'))
		})


		setAttr(this.to, {
			innerText: data.type_arrow === '1' ? data.type_author === '2' ? 'УАМФ' : context.storage.clients.filter(el => el.id === data.id_author)[0].snp : JSON.parse(sessionStorage.getItem('currEmployerName'))
		})

		// setAttr(this.direction, {
		// 	classList: `ico${data.type_arrow === '1' ? ' rotate' : ''}`
		// })

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
				this.feedbackEdit = feedbackEditPlace,
				this.modalLayer,
				this.showMore = place(ShowMoreBtn)
			)

		this.addItem.addEventListener('click', (e)=> {
			// console.log(this.data)

			this.feedbackEdit.update(true, {
				type,
				id: this.data.data.id,
				count: this.data.count
			})


			console.log(this.feedbackEdit)
			// console.log(this.feedbackEdit)
			// console.log('df')
		})

		initOverlayScrollbars(this.modalLayer)

		this.data.storage = this.getItemsLocalStorage()
		this.pageShow = 2
		this.flagShow = false
	}

	 update(data, index, items, context) {

	 	console.log(data)

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
			this.list.update(data.data, {storage: this.data.storage})


			//Пагинация
				if(data.data.length < data.total) {
				this.showMore.update(true, 'показать еще')

				if(!this.flagShow) {
					this.showMore.el.addEventListener('click', ()=> {
							getWorkModalFeedback({id: this.data.data.id, showing: true, p: this.pageShow})
							console.log(this.pageShow)
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