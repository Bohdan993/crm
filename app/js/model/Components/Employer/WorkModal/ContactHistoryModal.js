import {el, setAttr, svg, list} from '../../../../../libs/libs';





export default class ContactHistoryModal {
	constructor(){


		this.el = el('div.modal-row__contacts-history-row',{
			'data-contact-history-open':"modal-2"
		}, 
			el('div.modal-row__contacts-history-manager.modal-row__cell', {},
				el('i.tag.manager-tag.dark-blue-tag'),
				el('i.ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#arrow"}
				})))
				),

			el('div.modal-row__contacts-history-date.modal-row__cell', 
				el('time')),
			el('div.modal-row__contacts-history-text.modal-row__cell', 
				el('i.ico.letter-ico', svg('svg', svg('use', {
					xlink: { href: "img/sprites/svg/symbol/sprite.svg#letter"}
				}))),
				el('p', 'Прислал полный пакет документов :)')
				)
			)

	}


	update(data){
		console.log(data)
	}
}


