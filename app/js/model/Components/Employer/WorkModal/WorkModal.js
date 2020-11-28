import {el, setAttr, svg, list} from '../../../../../libs/libs'
import linkToSocial from '../../../linkToSocial'
import initWorkModalSelect from '../../../initWorkModalSelect'
import hiddenClassMixin from '../../../Mixins/hiddenClassMixin'
import saveFieldsData from '../../../fetchingData/saveFieldsData'
import Option from '../../OptionComponent'



let initedCountrySelect = false



export default class WorkModal {
	constructor(){
		this.data = {}

		this.comInfLeft = el('div.common-info__left', 
			el('div.common-info__company.info-block', 
				el('p', 'Предприятие'),
				el('div.input-group', 
					this.comManufacturyArea = el('textarea.info-area.common-info__manufactury-area', {
						name: '',
						rows: 3
					}))
				),
			el('div.common-info__country.info-block',
				el('p', 'Страна'),
				el('div.input-group', 
					this.comCountrySelect = el('select.info-area.country-select', {
						name: ''
					}))
				),
			el('div.common-info__address.info-block',
				el('p', 'Адрес'),
				el('div.input-group', 
					this.comMapArea = el('textarea.info-area', {
						name: '',
						value: '',
						rows: 2
					}),
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
						)
					)
				),
			)
		this.comInfRight = el('div.common-info__right', 
			el('div.common-info__contact-person.common-info__group', 
				el('div.common-info__contact-person_curr.common-info__group_small.info-block', 
					el('p', 'Контактное лицо'),
					el('div.input-group', 
						this.comInfName = el('input.info-area.common-info__contact-person-area', {
							type: 'text'
						}))
					),
				el('div.common-info__contact-person_other.common-info__group_big.info-block',
					el('p', 'Другие контактные лица'),
					el('div.input-group', 
						this.comInfOtherNames = el('input.info-area.common-info__other-contacts-area', {
							type: 'text'
						}))
					)
				),
			el('div.common-info__contact-info.common-info__group', 
				el('div.common-info__contact-info_curr.common-info__group_small.info-block', 
					el('p', 'Контактная информация'),
					el('div.input-group.info-group-ico.phone-group', 
					el('i.ico.s-phone', 
						// svg('svg', svg('use', {
						// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#phone"}
						// }))
						),
					this.comInfPhone = el('input.info-area', {
						type: 'text'
					})
					),
				el('div.input-group.info-group-ico.mail-group',
					this.comInfMailLink = el('a.social-link.mail-link', {
						href: '#',
						rel: 'nofollow noopener noreferrer',
						target: "_blank"
					}, 
						el('i.ico.s-mail', 
							// svg('svg', svg('use', {
							// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#email.svg"}
							// }))
							)
						),
					this.comInfEmail = el('input.info-area', {
						type: 'text',
						value: ''
					})
					)
					),
				el('div.common-info__contact-info_other.common-info__group_big.info-block',
					el('p', 'Дополнительные контакты'),
					el('div.input-group', 
						this.comInfPhoneOthers = el('input.info-area', {
							type: 'text'
						})),
					el('div.input-group', 
						this.comInfMailOthers = el('input.info-area', {
							type: 'text'
						}))
					)
				),
			el('div.common-info__social.info-block', 
				el('p', 'Сайт и социальные сети'),
				el('div.input-group.info-group-ico.web-group',
					this.comInfSiteLink = el('a.social-link',{
						href: '',
						rel: 'nofollow noreferrer noopener',
						target: '_blank'
					},
						el('i.ico.s-web', 
						// 	svg('svg', svg('use', {
						// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#web"}
						// }))
							)),
					this.comInfSite = el('input.info-area',{
							type: 'text'
						})
					),
				el('div.input-group.info-group-ico.fb-group',
					this.comInfFacebookLink = el('a.social-link',{
						href: '',
						rel: 'nofollow noreferrer noopener',
						target: '_blank'
					},
						el('i.ico.s-fb', 
						// 	svg('svg', svg('use', {
						// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#facebook"}
						// }))
						)),
					this.comInfFacebook = el('input.info-area',{
							type: 'text'
						})),
				el('div.input-group.info-group-ico.instagram-group',
					this.comInfInstagramLink = el('a.social-link',{
						href: '',
						rel: 'nofollow noreferrer noopener',
						target: '_blank'
					},
						el('i.ico.s-inst', 
						// 	svg('svg', svg('use', {
						// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#instagram"}
						// }))
						)),
					this.comInfInstagram = el('input.info-area',{
							type: 'text'
						}))
				),
			el('div.common-info__more-info.common-info__group',
				el('div.common-info__more-info_inner-left', 
					el('div.common-info__more-info-about.info-block',
							el('p', 'Дополнительная информация'),
							el('div.input-group',
							this.comInfNotes = el('textarea.info-area', {
								rows: 6
							}))
						),
						),
				el('div.common-info__more-info_inner-right', 
					el('div.common-info__more-info-mediator.info-block',
						el('p', 'Посредник'),
						el('div.input-group.native-select',
							this.intermadiariesSelect = list('select.info-area.mediator-select', Option)
							)),
					el('div.common-info__more-info-source.info-block',
						el('p', 'Источник'),
						el('div.input-group.native-select',
							this.sourceSelect = list('select.info-area.source-select', Option)
							))
					)
				)
			)
		this.el = el('div.common-info__layer',
			this.comInfLeft,
			this.comInfRight
			)

		let save = (value, field, target = 'main') => {
			saveFieldsData({
				str: 'employers',
				id: this.data.id_employer,
				value, 
				field, 
				target, 
				id_target: ''
			})
		}

		this.comManufacturyArea.addEventListener('change' , (e) => {
			save(this.comManufacturyArea.value, 'enterprise')
		})

		this.comCountrySelect.addEventListener('change' , (e) => {
			save(this.comCountrySelect.value, 'id_country')
		})

		this.comMapArea.addEventListener('change', (e) => {
			save(this.comMapArea.value, 'address')
			this.comIframe.src = `https://maps.google.com/maps?width=100%&height=200&hl=en&q=${this.comMapArea.value}&ie=UTF8&t=&z=11&iwloc=B&output=embed`
		})

		this.comInfName.addEventListener('change', (e) => {
			save(this.comInfName.value, 'name')
		})

		this.comInfOtherNames.addEventListener('change', (e) => {
			save(this.comInfOtherNames.value, 'other_name')
		})

		this.comInfPhone.addEventListener('change', (e) => {
			save(this.comInfPhone.value, 'phone')
		})

		this.comInfEmail.addEventListener('change', (e) => {
			save(this.comInfEmail.value, 'email')
		})

		this.comInfPhoneOthers.addEventListener('change', (e) => {
			save(this.comInfPhoneOthers.value, 'other_phone')
		})

		this.comInfMailOthers.addEventListener('change', (e) => {
			save(this.comInfMailOthers.value, 'other_email')
		})

		this.comInfSite.addEventListener('change', (e) => {
			save(this.comInfSite.value, 'site')
		})

		this.comInfFacebook.addEventListener('change', (e) => {
			save(this.comInfFacebook.value, 'social_media_facebook')
		})

		this.comInfInstagram.addEventListener('change', (e) => {
			save(this.comInfInstagram.value, 'social_media_instagram')
		})

		this.comInfNotes.addEventListener('change', (e) => {
			save(this.comInfNotes.value, 'note')
		})

		this.intermadiariesSelect.el.addEventListener('change', (e) => {
			save(this.intermadiariesSelect.el.value, 'id_employer_intermediator_list')
		})


		this.sourceSelect.el.addEventListener('change', (e) => {
			save(this.sourceSelect.el.value, 'id_employer_source_list')
		})


		this.countryChoices = initWorkModalSelect(this.comCountrySelect, {countries: this.getItemsFromLocalStorage().countries})
	}

	 update(data, index, items, context) {
	 		console.log(data)
	 		const { id_employer } = data
	 		

			if(id_employer !== this.data.id_employer) {
			const arrLinks = []
			this.comManufacturyArea.value = data.enterprise
			this.comMapArea.value = data.address
			this.comIframe.src = `https://maps.google.com/maps?width=100%&height=200&hl=en&q=${data.address}&ie=UTF8&t=&z=11&iwloc=B&output=embed`
			this.comInfName.value = data.name
			this.comInfOtherNames.value = data.other_name
			this.comInfPhone.value = data.phone
			this.countryChoices.countryChoices.setChoiceByValue(data.id_country)
			this.comInfEmail.value = data.email
			this.comInfPhoneOthers.value = data.other_phone
			this.comInfMailOthers.value = data.other_email
			this.comInfSite.value = data.site
			this.comInfFacebook.value = data.social_media_facebook
			this.comInfInstagram.value = data.social_media_instagram
			this.comInfNotes.value = data.other_information
			this.intermadiariesSelect.update(this.getItemsFromLocalStorage().intermediaries)
			this.intermadiariesSelect.el.value = data.id_employer_intermediator_list
			this.sourceSelect.update(data.source)
			this.sourceSelect.el.value = data.id_employer_source_list

			


			//Получаем все элементы внутри инстанса которые содержат класс 'social-link'
			for (let key in this) {
				let isOwn = this.hasOwnProperty(key);
				if(isOwn && this[key] instanceof HTMLElement) {
					if(this[key].classList.contains('social-link')) {
						arrLinks.push(this[key])
					}
				}
			}
			//


			//Вызов функций которые зависят от HTML элементов внутри инстанса
			linkToSocial(arrLinks)

			this.el.classList.remove('hidden')
			}

			this.data = data
			this.data.index = index
	}

	getItemsFromLocalStorage(){

		let intermediaries = JSON.parse(localStorage.getItem('intermediaries')) || []
		intermediaries.unshift({id: 0, name: 'Отсутствует'})
		let countries = JSON.parse(localStorage.getItem('countries')) || []

		return {
			intermediaries,
			countries
		}
	}

}


Object.assign(WorkModal.prototype , hiddenClassMixin)

