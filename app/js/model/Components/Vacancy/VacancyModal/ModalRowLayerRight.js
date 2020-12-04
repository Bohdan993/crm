import {el, setAttr, place, tippy, Autocomplete} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import { initVacancyModalTooltip } from '../../../initToottips'

export default class ModalRowLayerRight {
	constructor(){
		this.el = el('div.modal-row__wrapper', 
			el('div.main-info__choose-block', 
				this.chooseEmployer = el('div.choose-employer', 
					el('p', 
						el('span', 'Выберите работодателя'))),
				el('div.employer-name',
					el('p',
						el('span', 'Thompson Equestrian Partners'))),
				el('div.full-info', 
					el('p.country-vacancy', 
						el('span', 'NO 293')),
					el('p.products', 
						el('span.visa-type', 'Сезонная - '),
						el('span.types', 'Цветы, Теплицы, Молочные коровы, Мясные коровы')))),
			el('div.main-info__layer_left', 
				el('div.main-info__contact-person', 
					el('p', 'Контактное лицо'),
					el('span', '')),
				el('div.main-info__phones', 
					el('p', 'Телефоны'),
					el('a', {
						href: 'tel:+444'
					})),
				el('div.main-info__email', 
					el('p', 'E-Mail'),
					el('a', {
						href: 'mailto:'
					}))),
			el('div.main-info__layer_right',
				el('div.map', 
					el('div',{
								style: {overflow:'hidden',width: '100%', position: 'relative'}
							},
							this.comIframe = el('iframe', {
								width: '100%',
								height: '200',
								src: '',
								frameborder:'0',
								scrolling:'no',
								marginheight:'0',
								marginwidth:'0'
							}),
							el('style', '#gmap_canvas img{max-width:none!important;background:none!important}')
						)))
			)

		this.findEmployerPopup = new FindEmployerPopupComponent()
		this.findEmployerPopup.el.style.display = "block"
		this.findEmployerPopup.parent = this
	}

	update(data){
		console.log(data)
	}

	onmount() {
		this.findEmployerInstance = initVacancyModalTooltip(this.chooseEmployer, this.findEmployerPopup.el, tippy)
	}
}