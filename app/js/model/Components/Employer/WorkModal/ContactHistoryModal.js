import {el, setAttr, svg, list} from '../../../../../libs/libs';





export default class ContactHistoryModal {
	constructor(){


		this.el = el('div.contact-history-modal__layer', 
			el('span.modal__close', {
				'data-contact-history-close': 'modal-2'
			}, 
				el('span'), 
				el('span')
				),
			el('div.contact-history-modal__header', 
				el('div.contact-history-modal__block.manager-block', 
					el('p', 'Менеджер'),
					el('div.input-group', 
						this.manager = el('select.manager-select', {
							name: 'manager-select'
								}
							)
						)
					),
				el('div.contact-history-modal__block.direction-block', 
					el('p', 'Направление'),
					el('div.input-group', 
						this.direction = el('i.ico.change-direction', 
							svg('svg', svg('use', {
								xlink: { href: "img/sprites/svg/symbol/sprite.svg#arrow"}
							}))
							)
						)
					),
				el('div.contact-history-modal__block.date-block', 
					el('p', 'Дата'),
					el('div.input-group', 
						this.date = el('input', {
							type: 'text'
								}
							)
						)
					),
				el('div.contact-history-modal__block.contact-type-block', 
					el('p', 'Тип контакта'),
					el('div.input-group', 
						this.contact = el('select.contact-select', {
							name: 'contact-select'
								}
							)
						)
					),
				)
			el('div.contact-history-modal__body', 
				el('div.contact-history-modal__block', 
					el('p', 'Содержание'),
					el('div.input-group',
						el('textarea.info-area', {
							rows: 12
						})
						)
					)
				)
			this.confirm = el('button.confirm-btn', 
				el('span', 'OK'))
			this.delete = el('button.delete-btn', 'Удалить')

			)

	}


	update(data){
		console.log(data)
	}
}


