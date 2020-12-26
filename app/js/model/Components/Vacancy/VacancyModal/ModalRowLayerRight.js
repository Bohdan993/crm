import {el, setAttr, place, tippy, Autocomplete} from '../../../../../libs/libs'
import FindEmployerPopupComponent from './FindEmployerPopupComponent'
import { initVacancyModalTooltip } from '../../../initToottips'
import storage from '../../../Storage'

export default class ModalRowLayerRight {
	constructor(){
		this.el = el('div.modal-row__wrapper', 
			el('div.main-info__choose-block', 
				this.chooseEmployer = place(el('div.choose-employer', 
					el('p', 
						el('span', 'Выберите работодателя')))),
				this.employerName = place(el('div.employer-name',
					el('p',
						this.employerNameText = el('span', 'Thompson Equestrian Partners')))),
				el('div.full-info', 
					el('p.country-vacancy', 
						el('span', 'NO 293')),
					el('p.products', 
						el('span.visa-type', 'Сезонная - '),
						el('span.types', 'Цветы, Теплицы, Молочные коровы, Мясные коровы')))),
			el('div.main-info__layer_left', 
				el('div.main-info__contact-person', 
					el('p', 'Контактное лицо'),
					this.name = el('span', '')),
				el('div.main-info__phones', 
					el('p', 'Телефоны'),
					this.phone = el('a', {
						href: 'tel:+444'
					})),
				el('div.main-info__email', 
					el('p', 'E-Mail'),
					this.email = el('a', {
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

		this.findEmployerPopup = new FindEmployerPopupComponent('Right')
		this.findEmployerPopup.el.style.display = "block"
		this.findEmployerPopup.parent = this
	}

	update(data, context){
		console.log(data, context)

		if(context === 'storage') {
			this.chooseEmployer.update(false)
			this.employerName.update(true)
			this.employerName._el.style.display = "flex"
		}

		if(context === 'nulledEmployer') {
			this.chooseEmployer.update(true)
			this.employerName.update(false)
			this.employerName._el.style.display = "none"
		}


		if(context === 'employer') {
			this.chooseEmployer.update(false)
			this.employerName.update(true)
			this.employerName._el.style.display = "flex"
		}
		// if(data.employer && Object.keys(data.employer).length) {

		setAttr(this.email, {
			innerText: data.employer.email ? data.employer.email : '',
			href: `mailto:${data.employer.email ? data.employer.email : ''}`
		})


		setAttr(this.phone, {
			innerText: data.employer.phone ? data.employer.phone : '',
			href: `tel:${data.employer.phone ? data.employer.phone : ''}`
		})


		setAttr(this.name, {
			innerText: data.employer.name ? data.employer.name : ''
		})


		setAttr(this.comIframe, {
			src: `https://maps.google.com/maps?width=100%&height=200&hl=en&q=${data.employer.address ? data.employer.address : ''}&ie=UTF8&t=&z=11&iwloc=B&output=embed`
		})


		setAttr(this.employerNameText, {
			innerText: data.employer.enterprise ? data.employer.enterprise : ''
		})
	// }
		this.data = data
	}

	onmount() {
		this.chooseEmployer.update(true)
		this.findEmployerInstance = initVacancyModalTooltip(this.chooseEmployer._el, this.findEmployerPopup.el, tippy)

		document.addEventListener('storageemployeradd', (e) => {
			this.update(storage.getState(e.detail.id), 'storage')
			this.chooseEmployer.update(false)
			this.employerName.update(true)
			this.employerName._el.style.display = "flex"
		})
	}



}