import {el, setAttr, place} from '../../../../../libs/libs'
import saveFieldsData from '../../../fetchingData/saveFieldsData'

export default class TermsComponent {
	constructor(){

		this.data = {}
		this.el = el('div.terms-layer', 
			el('div.modal-row__controls',
				el('p', 'Условия')),
			el('div.modal-row__layer',
				el('div.terms__top',
					el('div.terms__start-date.info-block',
						el('p', 'Дата начала работы'),
						el('div.input-group', 
							el('input.info-area', {
								type: 'text'
							}))),
					el('div.terms__period.info-block',
						el('p', 'Период (мес)'),
						el('div.input-group', 
							el('input.info-area', {
								type: 'text'
							}))),
					el('div.terms__salary.info-block',
						el('p', 'Заработная плата'),
						el('div.input-group', 
							el('input.info-area', {
								type: 'text'
							})))),
				el('div.terms__middle',
					el('div.terms__accommodation.info-block',
						el('p', 'Проживание'),
						el('div.input-group', 
							el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__nutrition.info-block',
						el('p', 'Питание'),
						el('div.input-group', 
							el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__taxes.info-block',
						el('p', 'Налоги'),
						el('div.input-group', 
							el('textarea.vacancy-textarea', {
								rows: 3
							})))),
				el('div.terms__bottom.bottom-areas',
					el('div.terms__work-responsibilities.info-block',
						el('p', 'Рабочие обязаности'),
						el('div.input-group', 
							el('textarea.vacancy-textarea', {
								rows: 3
							}))),
					el('div.terms__work-time.info-block',
						el('p', 'Рабочее время'),
						el('div.input-group', 
							el('textarea.vacancy-textarea', {
								rows: 3
							})))
					),
				))

	}


	update(data, index, items, context){
	}


}



`<div class="row terms modal-row">
                      <div class="modal-row__controls">
                        <p>Условия</p>
                      </div>
                      <div class="modal-row__layer">
                        <div class="terms__top">
                          <div class="terms__start-date info-block">
                            <p>Дата начала работы</p>
                            <div class="input-group">
                              <input class="info-area" type="text">
                            </div>
                          </div>
                          <div class="terms__period info-block">
                            <p>Период (мес)</p>
                            <div class="input-group">
                              <input class="info-area" type="text">
                            </div>
                          </div>
                          <div class="terms__salary info-block">
                            <p>Заработная плата</p>
                            <div class="input-group">
                              <input class="info-area" type="text">
                            </div>
                          </div>
                        </div>
                        <div class="terms__middle">
                          <div class="terms__accommodation info-block">
                            <p>Проживание</p>
                            <div class="input-group">
                              <textarea class="vacancy-textarea" name="" rows="3"></textarea>
                            </div>
                          </div>
                          <div class="terms__nutrition info-block">
                            <p>Питание</p>
                            <div class="input-group">
                              <textarea class="vacancy-textarea" name="" rows="3"></textarea>
                            </div>
                          </div>
                          <div class="terms__taxes info-block">
                            <p>Налоги</p>
                            <div class="input-group">
                              <textarea class="vacancy-textarea" name="" rows="3"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="terms__bottom bottom-areas">
                          <div class="terms__work-responsibilities info-block">
                            <p>Рабочие обязаности</p>
                            <div class="input-group">
                              <textarea class="vacancy-textarea" name="" rows="3"></textarea>
                            </div>
                          </div>
                          <div class="terms__work-time info-block">
                            <p>Рабочее время</p>
                            <div class="input-group">
                              <textarea class="vacancy-textarea" name="" rows="3"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`