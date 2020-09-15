import {el, setAttr} from '../../../libs/libs'

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
						rows: 2
					}),
					el('div',{
								style: {overflow:'hidden',width: '100%', position: 'relative'}
							},
							this.comIframe = el('iframe', {
								width: '100%',
								height: '200',
								src: 'https://maps.google.com/maps?width=100%&height=200&hl=en&q=%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80+(%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)&ie=UTF8&t=&z=11&iwloc=B&output=embed',
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
		this.el = el('div.common-info__layer',
			this.comInfLeft
			)
	}

	 update(data, index, items, context) {
	 		console.log(data)
	 		const { id_employer } = data
	 		
		

			if(id_employer !== this.data.id_employer) {
			this.comManufacturyArea.innerText = data.enterprise
			// this.input.id = 'manager-chbx-' + data.id
			// setAttr(this.tag, {
			// 	innerText: data.name
			// })
			// setAttr(this.label, {
			// 	for: 'manager-chbx-' + data.id,
			// 	innerHTML: `<i class="tag manager-tag" style="background-color:${'#' + data.color}">${data.name.split(/\s+/).map(word => word[0].toUpperCase()).join('')}</i>${data.name}`
			// })
			}

			this.data = data
			this.data.index = index
	}
}


