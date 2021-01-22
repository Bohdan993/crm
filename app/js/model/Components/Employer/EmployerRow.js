import {el, setAttr, place, list, MicroModal} from '../../../../libs/libs'
import { initRowTooltips } from '../../initToottips'
import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'

import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getEmployersList from '../../fetchingData/getEmployersList'
import {addMouseUpTrigger, closeModal} from '../../helper'
import switchModalParts from '../../switchModalParts'
import {modalSwitchers, modalParts} from '../../../view'


let flag = false

class VacancyLabel {
	constructor(){
		this.el = el('i.label', 
			this.vacancyLabelCountry = el('span', 'NO'), 
			this.vacancyLabelCode = el('span', '211-8'))
	}

	update(data){

		// console.log(data)

		setAttr(this.el, {
			style:  {
				background: data.archive === '0' ? '#9c3' : 'rgb(255, 153, 102)'
			}
		})

		setAttr(this.vacancyLabelCountry, {
			innerText: data.name
		})

		setAttr(this.vacancyLabelCode, {
			innerText: `${data.id_vacancy}-${data.total_client}`
		})
		
	}
}


export default class RowEmployer {
	constructor(){
		this.data = {}
		
		this.attentionTag = place(el('i.attention-tag',
				el('i.s-attention')
					))
		this.managerTag = place(el('i.tag.manager-tag'))
		// this.vacancyLabel = place(el('i.label', this.vacancyLabelCountry = el('span', 'NO'), this.vacancyLabelCode = el('span', '211-8')))
		this.el = el("div.row",
			el(".f-container", 
				this.country = el(".row__country.row__cell", 
		
					this.flagIco = el('i.s-au.row__flag'),
			
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
					this.phoneIco = place(el('i.s-phone')),
					el('p', this.phoneLink = el('a', {
						href: 'tel:#'
					}))
					),
				this.address = el('.row__address.row__cell', this.addressText = el('p')),
				this.jobs = el('.row__jobs.row__cell', this.jobsText = el('p')),
				this.labels = el('.row__labels.row__cell',
					this.vacancyLabel = list('div.row__labels-layer', VacancyLabel, 'id_vacancy')
					)
				)
			)


		// this.flag = false

		this.el.addEventListener('click', (e) =>{
			MicroModal.show('modal-1', {
	      onClose: modal => {
	      	getEmployersList({filtered: JSON.parse(sessionStorage.getItem('employersFiltered'))})
	      },
	      onShow: (modal, node) => {
			    const wrapper = modal.querySelector('.my-modal-wrapper')
			    const modalClose = modal.querySelector('.modal__close')

			    if(!flag) {
			      wrapper.addEventListener('mouseup', addMouseUpTrigger)
			      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
			      modalClose.addEventListener('click', function(){
			        MicroModal.close(modal.id)
			      })
			      flag = true
			    }

			    switchModalParts(modalSwitchers, modalParts, false)('#employer-data', '[data-part="employer-data"]')
			  }
    })
			getWorkModalInfo(this.data.id_employer)
			getWorkModalManufacturyType(this.data.id_employer)
			getWorkModalMedia({id: this.data.id_employer, loading: true})
			getWorkModalContactHistory({id:this.data.id_employer, loading: true })
			getWorkModalVacancyHistory({id:this.data.id_employer, loading: true })
			getWorkModalFeedback({id:this.data.id_employer, loading: true, other: 5, str: 'employers' })
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
		data.task ? this.attentionTag.update(true) : this.attentionTag.update(false)


		data.phone ? this.phoneIco.update(true) : this.phoneIco.update(false)

		// let custom = 'data-custom' + items[items.length - 1]['id_employer'] + '-open'
		// console.log(custom)

		setAttr(this.el, {
			"data-id_employer": data.id_employer,
			'data-custom-open': `modal-1`
		})

		setAttr(this.flagIco, {
			classList: `row__flag ${data.icon ? 's-' + data.icon.split('.')[0] : ''}`
		})


		data.manager ? (this.managerTag.update(true), 
		setAttr(this.managerTag,{
						style: {"background-color": "#" + data.manager_color}, 
						innerText: data.manager,
						// innerText: data.manager.split(/\s+/).map(word => word[0].toUpperCase()).join('')
					}
				)
			) : this.managerTag.update(false)

		this.jobsText.innerText = data.production ? data.production.join(', ') : ""
		this.vacancyLabel.update(data.vacancy)

		// if(id_employer !== this.data.id_employer) {
		


		// this.abbr.innerText = data.addr
		
		
	
		
		
		// this.addressText.innerText = data.address
	
		// data.vacancy instanceof Array && data.vacancy.length > 0 ? 
		// (
		// 		this.vacancyLabel.update(data.vacancy),
		// 		setAttr(this.vacancyLabelCountry,{
		// 				innerText: data.country_name,
		// 			}
		// 		),
		// 		setAttr(this.vacancyLabelCode, {
		// 				innerText: '123-12'
		// 			}
		// 		)
		// 	) : this.vacancyLabel.update([{}])


		setTimeout(() => {
		// console.log(data.country_name)
		if(data.country_name !== null) {
			// this.countryInstance = initRowTooltips(this.country)
			this.countryInstance.setContent(`${data.country_name}`)
		}

			// this.companyInstance = initRowTooltips(this.company)
			// this.nameInstance = initRowTooltips(this.name)


	
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
		
		// }
		this.data = data
		this.data.id_employer = id_employer
		this.data.index = index

	}


	onmount() {
		// console.log(this.data.country_name)
		if(this.data.country_name !== null) {
			this.countryInstance = initRowTooltips(this.country)
		}
		this.companyInstance = initRowTooltips(this.company)
		this.nameInstance = initRowTooltips(this.name)
	}

	onremount(){
		// console.log('remount')
	}

	onunmount(){
		// console.log(this.el)
		this.el = this.data = this.attentionTag = this.managerTag = this.vacancyLabel =  null
	}

	

}