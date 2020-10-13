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
  // initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-ico', typeFeedbackTemplate)
    // initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-choise', choiceClientTemplate)

class FeedbackEdit {
	constructor(){
		this.data = {}
		this.el = el('form.modal-row__feedback-row.add-feedback-form', 
			el('div.modal-row__feedback-speakers', 
				this.typeFeedback = el('i.modal-row__feedback-ico', 
					svg('svg', svg('use', {
						xlink: {href: 'img/sprites/svg/symbol/sprite.svg#pos-feedback-white'}
					}))),
				this.choiseClient = el('a.modal-row__feedback-choise', 'Выбрать'),
				this.direction = el('i.modal-row__feedback-direction.change-direction', 
					svg('svg', svg('use', {
						xlink: {href:"img/sprites/svg/symbol/sprite.svg#arrow-white"}
					}))),
				el('p.modal-row__feedback-to', 'Thompson Equestrian Partners')
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
		console.log(this.typeFeedback.className)
		changeDirection(this.direction)
		initWorkModalTooltip('.row.feedback', '.' + this.typeFeedback.className, typeFeedbackTemplate)
		initWorkModalTooltip('.row.feedback', '.' + this.choiseClient.className, choiceClientTemplate)
	}

	update(data){
		console.log(data)


		this.data = data
	}

}


const feedbackEditPlace = place(FeedbackEdit)

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
				el('i.modal-row__feedback-direction', 
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


	update(data){

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
			innerText: data.type_author === '2' ? 'УАМФ' : 'null'
		})

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

			// console.log(this.feedbackEdit)
			// console.log('df')
		})

		initOverlayScrollbars(this.modalLayer)

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
			this.list.update(data.data)


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


}

Object.assign(Feedback.prototype , hiddenClassMixin)