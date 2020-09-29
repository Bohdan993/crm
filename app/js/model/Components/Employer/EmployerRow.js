import {el, setAttr, svg, place} from '../../../../libs/libs'
import { initRowTooltips } from '../../initToottips'
import getWorkModalInfo from '../../fetchingData/getWorkModalInfo'

import getWorkModalInfoOther from '../../fetchingData/Employer/WorkModal/getWorkModalInfoOther'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'





export default class RowEmployer {
	constructor(){
		this.data = {}
		this.attentionTag = place(el('i.attention-tag', svg('svg', svg('use', {
							xlink: { href: "img/sprites/svg/symbol/sprite.svg#attention"}
						}))))
		this.managerTag = place(el('i.tag.manager-tag'))
		this.vacancyLabel = place(el('i.label', this.vacancyLabelCountry = el('span', 'NO'), this.vacancyLabelCode = el('span', '211-8')))
		this.el = el("div.row", 
			el(".f-container", 
				this.country = el(".row__country.row__cell", 
					this.flag = el("i.row__flag", 
						this.svg = svg('svg', this.flagIco = svg('use', {
									xlink: { href: "img/sprites/svg/symbol/sprite.svg#flag-norway"}
								}), 
							)
						),
					this.abbr = el('p.row__abbr', 'NO')
					),
				this.company = el(".row__company.row__cell", this.companyText = el("p")
					),
				this.name = el('.row__name.row__cell', 
					this.fullname = el("p.row__fullname"),
					this.tags = el('span.row__tags',
						this.attentionTag,
						this.managerTag
						)
					),
				this.phone = el('.row__phone.row__cell', 
					el('i', 
						svg('svg', svg('use', {
							xlink: { href: "img/sprites/svg/symbol/sprite.svg#phone"}
						}))),
					el('p', this.phoneLink = el('a', {
						href: 'tel:#'
					}))
					),
				this.address = el('.row__address.row__cell', this.addressText = el('p')),
				this.jobs = el('.row__jobs.row__cell', this.jobsText = el('p')),
				this.labels = el('.row__labels.row__cell',
					this.vacancyLabel
					
					) 
				)
			)

		

	}

	update(data, index, items, context){
		const { id_employer } = data
		let custom = ''

		if(id_employer !== this.data.id_employer) {
			custom = 'data-custom' + items[items.length - 1]['id_employer'] + '-open'

		setAttr(this.el, {
			"data-id_employer": data.id_employer,
			[custom]: `modal-1`
		})

		setAttr(this.flagIco, {
			xlink: {href: `img/sprites/svg/symbol/sprite.svg#${data.icon}`}
		})
		this.abbr.innerText = data.addr
		this.companyText.innerText = data.enterprise
		this.fullname.innerText = data.name
		data.task ? this.attentionTag.update(true) : this.attentionTag.update(false)
		data.manager ? (this.managerTag.update(true), 
		setAttr(this.managerTag,{
						style: {"background-color": "#" + data.manager_color}, 
						innerText: data.manager,
						// innerText: data.manager.split(/\s+/).map(word => word[0].toUpperCase()).join('')
					}
				)
			) : this.managerTag.update(false)
		setAttr(this.phoneLink , {
			href: 'tel:' + data.phone,
			innerText: data.phone
		})
		this.addressText.innerText = data.address
		this.jobsText.innerText = data.production ? data.production.join(', ') : ""
		data.vacancy instanceof Array && data.vacancy.length > 0 ? 
		(
				this.vacancyLabel.update(true),
				setAttr(this.vacancyLabelCountry,{
						innerText: data.country_name,
					}
				),
				setAttr(this.vacancyLabelCode, {
						innerText: '123-12'
					}
				)
			) : this.vacancyLabel.update(false)


		setTimeout(() => {
		if(data.country_name !== null) {
			this.countryInstance = initRowTooltips(this.country)
			this.countryInstance.setContent(`${data.country_name}`)
		}

			this.companyInstance = initRowTooltips(this.company)
			this.nameInstance = initRowTooltips(this.name)


	
			this.companyInstance.setContent(`${data.enterprise}`)
			this.nameInstance.setContent(`${data.name}`)
		}, 0)
	
		// console.log('updated')

		// 	if(data.country_name !== null) {
		// 	this.countryInstance = initRowTooltips(this.country)
		// 	this.countryInstance.setContent(`${data.country_name}`)
		// }

		// if(data.enterprise !== '') {
		// 	this.companyInstance = initRowTooltips(this.company)
		// 	this.companyInstance.setContent(`${data.enterprise}`)
		// }

		// if(data.name !== '' ) {
		// 	this.nameInstance = initRowTooltips(this.name)
		// 	this.nameInstance.setContent(`${data.name}`)
		// }


		this.makeRequestForModal(id_employer)
		}

		this.data = data;
		this.data.index = index;

	}


	makeRequestForModal(id) {
		this.el.addEventListener('click', function(e){
			getWorkModalInfo(id)
			getWorkModalInfoOther(id)
			getWorkModalManufacturyType(id)
			getWorkModalMedia(id)
			// console.log(id)
		})
	}

	onmount() {
		
			// console.log('mounted')
	}

	

}