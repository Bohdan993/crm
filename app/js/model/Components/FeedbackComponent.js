import {el, setAttr, list} from '../../../../../libs/libs';
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'

import checkIfWrapperIsEmpty from '../../../checkIfWrapperIsEmpty'


`<div class="modal-row__feedback-row">
  <div class="modal-row__feedback-speakers">
  		<i class="modal-row__feedback-ico">
	      <svg>
	        <use xlink:href="img/sprites/svg/symbol/sprite.svg#inf-feedback"></use>
	      </svg>
      </i>
    <p class="modal-row__feedback-from">Романов Олександр</p><i class="modal-row__feedback-direction">
      <svg>
        <use xlink:href="img/sprites/svg/symbol/sprite.svg#arrow"></use>
      </svg></i>
    <p class="modal-row__feedback-to">Thompson Equestrian Partners</p>
  </div>
  <div class="modal-row__feedback-date">
    <time>15.07.2019</time>
    <button class="modal-row__feedback-edit edit-btn">Редактировать</button>
  </div>
  <div class="modal-row__feedback-text">
    <p>Клиент проходил собеседование по скайпу. В ходе разговора выяснил, что с собой на предприятие нужно брать постель и зимнюю одежду. Рабочую одежду всю выдаёт работодатель. Выходные будут один день в 7 дней, можно выбирать день самостоятельно. Так-же раз в пол года можно брать неделю отпуска</p>
  </div>
</div>`

class FeedbackRow {
	constructor(){


		this.el = el('div.modal-row__feedback-row', 
			el('div.modal-row__feedback-speakers',
				el('i.modal-row__feedback-ico'),
				el('p.modal-row__feedback-from'),
				el('i.modal-row__feedback-direction'),
				el('p.modal-row__feedback-to', 'Thompson Equestrian Partners')
				),
			el('div.modal-row__feedback-date', 
				el('time', '09.10.2018'), 
				el('button.modal-row__feedback-edit.edit-btn', 'Редактировать')
				),
			el('div.modal-row__feedback-text', 
				el('p', 'text')),
			)


	}


	update(data){

	}
}


export default class Feedback {
	constructor(){

		this.controls = el('div.modal-row__controls',
			el('p', 'Тип производства'),
			el('div.add-item', el('span', '+'), 'добавить тип производства')
			)
		
		this.modalLayer = el('div.modal-row__layer.empty-layer')


		this.el = el('div.manufactury-type__layer',
				this.controls,
				this.list = list(this.modalLayer, WorkModalManufacturyTypeRow, 'id')
			)
	}

	 update(data, index, items, context) {

	
			this.list.update(data)

			//Вызов функций которые зависят от инстанса класса
			 checkIfWrapperIsEmpty(this.modalLayer)
			//

			this.data = data
			this.data.index = index
	}

	 onremount() {
        console.log("remounted App");
    }


}

Object.assign(Feedback.prototype , hiddenClassMixin)