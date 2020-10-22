import {el, setAttr, svg, place} from '../../../../libs/libs'
import { initRowTooltips } from '../../initToottips'
import getWorkModalInfo from '../../fetchingData/getWorkModalInfo'

import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'





export default class RowEmployer {
	constructor(){
		this.data = {}
		this.attentionTag = place(el('i.attention-tag', 
					// svg('svg', svg('use', {
					// 		xlink: { href: "img/sprites/svg/symbol/sprite.svg#attention"}
					// 	}))
					))
		this.managerTag = place(el('i.tag.manager-tag'))
		this.vacancyLabel = place(el('i.label', this.vacancyLabelCountry = el('span', 'NO'), this.vacancyLabelCode = el('span', '211-8')))
		this.el = el("div.row",
			el(".f-container", 
				this.country = el(".row__country.row__cell", 
					el("i.row__flag", 
						// svg('svg', this.flagIco = svg('use', {
						// 			xlink: { href: "img/sprites/svg/symbol/sprite.svg#flag-norway"}
						// 		}), 
						// 	)
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
						// svg('svg', svg('use', {
						// 	xlink: { href: "img/sprites/svg/symbol/sprite.svg#phone"}
						// }))
						),
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


		// this.flag = false

		this.el.addEventListener('click', (e) =>{
			getWorkModalInfo(this.data.id_employer)
			getWorkModalManufacturyType(this.data.id_employer)
			getWorkModalMedia({id: this.data.id_employer, loading: true})
			getWorkModalContactHistory({id:this.data.id_employer, loading: true })
			getWorkModalVacancyHistory({id:this.data.id_employer, loading: true })
			getWorkModalFeedback({id:this.data.id_employer, loading: true })
		})

	}

	update(data, index, items, context){
		// console.log(data)
		const { id_employer } = data
		


		this.companyText.innerText = data.enterprise
		this.abbr.innerText = data.addr
		this.addressText.innerText = data.address
		this.fullname.innerText = data.name
		setAttr(this.phoneLink , {
			href: 'tel:' + data.phone,
			innerText: data.phone
		})

		let custom = 'data-custom' + items[items.length - 1]['id_employer'] + '-open'

		setAttr(this.el, {
			"data-id_employer": data.id_employer,
			[custom]: `modal-1`
		})

		if(id_employer !== this.data.id_employer) {
		

		// setAttr(this.flagIco, {
		// 	xlink: {href: `img/sprites/svg/symbol/sprite.svg#${data.icon}`}
		// })
		// this.abbr.innerText = data.addr
		
		
		data.task ? this.attentionTag.update(true) : this.attentionTag.update(false)
		data.manager ? (this.managerTag.update(true), 
		setAttr(this.managerTag,{
						style: {"background-color": "#" + data.manager_color}, 
						innerText: data.manager,
						// innerText: data.manager.split(/\s+/).map(word => word[0].toUpperCase()).join('')
					}
				)
			) : this.managerTag.update(false)
		
		// this.addressText.innerText = data.address
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
	
		// // console.log('updated')

		// // 	if(data.country_name !== null) {
		// // 	this.countryInstance = initRowTooltips(this.country)
		// // 	this.countryInstance.setContent(`${data.country_name}`)
		// // }

		// // if(data.enterprise !== '') {
		// // 	this.companyInstance = initRowTooltips(this.company)
		// // 	this.companyInstance.setContent(`${data.enterprise}`)
		// // }

		// // if(data.name !== '' ) {
		// // 	this.nameInstance = initRowTooltips(this.name)
		// // 	this.nameInstance.setContent(`${data.name}`)
		// // }

		// // if(!this.flag) {
		// // 	this.makeRequestForModal(id_employer)
		// // 	this.flag = true
		// // }
		
		}

		this.data.id_employer = id_employer
		this.data.index = index

	}


	onmount() {
		// console.log('mount')
	}

	onremount(){
		// console.log('remount')
	}

	onunmount(){
		// console.log(this.el)
		this.el = this.data = this.attentionTag = this.managerTag = this.vacancyLabel =  null
	}

	

}