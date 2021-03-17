import {el, setAttr, place, list, MicroModal} from '../../../../libs/libs'
import { initRowTooltips } from '../../initToottips'

import getWorkModalInfo from '../../fetchingData/Employer/WorkModal/getWorkModalInfo'
import getWorkModalManufacturyType from '../../fetchingData/Employer/WorkModal/getWorkModalManufacturyType'
import getWorkModalMedia from '../../fetchingData/Employer/WorkModal/getWorkModalMedia'
import getWorkModalContactHistory from '../../fetchingData/Employer/WorkModal/getWorkModalContactHistory'
import getWorkModalVacancyHistory from '../../fetchingData/Employer/WorkModal/getWorkModalVacancyHistory'
import getWorkModalFeedback from '../../fetchingData/Employer/WorkModal/getWorkModalFeedback'
import getWorkModalTasks from '../../fetchingData/Employer/WorkModal/getWorkModalTasks'


// import deleteManufacturyType from '../../fetchingData/Employer/WorkModal/deleteManufacturyType'

import getEmployersList from '../../fetchingData/Employer/getEmployersList'
import {addMouseUpTrigger, closeModal, close, getAllUrlParams, onKeyPressClose} from '../../helper'
import switchModalParts from '../../switchModalParts'
import {modalSwitchers, modalParts} from '../../../view'


let flag = false




function updateURL(param) {
    if (history.replaceState) {
        history.replaceState(null, null, param);
    }
    else {
        console.warn('History API не поддерживается');
    }
}

class VacancyLabel {
	constructor(){
		this.el = el('a.label', {
			href: `vacancy.html`
			},
			this.vacancyLabelCountry = el('span', 'NO'), 
			this.vacancyLabelCode = el('span', '211-8'))
	}

	update(data){

		// console.log(data)

		setAttr(this.el, {
			href: `vacancy.html?id=${data.id_vacancy}`,
			style:  {
				background: data.archive === '0' ? '#39c' : '#f96'
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
			let id_employer = getAllUrlParams().id
			let url = `?id=${this.data.id_employer}`

			updateURL(url)

			MicroModal.show('modal-1', {
			      onClose: (modal, trigger) => {
			      	getEmployersList({filtered: JSON.parse(sessionStorage.getItem('employersFiltered'))})
			      },
			      onShow: (modal, node) => {
			      	if(!id_employer) {
						    const wrapper = modal.querySelector('.my-modal-wrapper')
						    const modalClose = modal.querySelector('.modal__close')

						    if(!flag) {
						    	wrapper.removeEventListener('mouseup', addMouseUpTrigger)
						    	wrapper.removeEventListener('mousedown', closeModal.bind(null, modal.id))
						    	modalClose.removeEventListener('click', close.bind(null, modal.id))
						      wrapper.addEventListener('mouseup', addMouseUpTrigger)
						      wrapper.addEventListener('mousedown', closeModal.bind(null, modal.id))
						      modalClose.addEventListener('click', close.bind(null, modal.id))
						      flag = true
						    }
      				}
					    // switchModalParts(modalSwitchers, modalParts, false)('#employer-data', '[data-part="employer-data"]')
					  }
		    })

			
					getWorkModalInfo(this.data.id_employer)
					getWorkModalManufacturyType(this.data.id_employer)
					getWorkModalMedia({id: this.data.id_employer, loading: true})
					getWorkModalContactHistory({id:this.data.id_employer, loading: true })
					getWorkModalVacancyHistory({id:this.data.id_employer, loading: true })
					getWorkModalFeedback({id:this.data.id_employer, loading: true, other: 5, str: 'employers' })
					getWorkModalTasks({id: this.data.id_employer})

		})

	}

	update(data, index, items, context){
		console.log(data)
		const { id_employer } = data




		this.companyText.innerText = data.enterprise
		this.abbr.innerText = data.addr
		this.addressText.innerText = data.address
		this.fullname.innerText = data.name
		setAttr(this.phoneLink , {
			href: 'tel:' + data.phone,
			innerText: data.phone
		})
		data.task ?  this.attentionTag && this.attentionTag.update(true) : this.attentionTag && this.attentionTag.update(false)


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

		console.log(this.managerTag)
		this.jobsText.innerText = data.production ? data.production.filter(el => el.length).join(', ') : ""
		this.vacancyLabel.update(data.vacancy)



		setTimeout(() => {
		if(data.country_name !== null) {
			this.countryInstance && !this.countryInstance.state.isDestroyed && this.countryInstance.setContent(`${data.country_name}`)
		}
			this.companyInstance && !this.companyInstance.state.isDestroyed && this.companyInstance.setContent(`${data.enterprise}`)
			this.nameInstance && !this.nameInstance.state.isDestroyed && this.nameInstance.setContent(`${data.name}`)
			this.addressInstance && !this.addressInstance.state.isDestroyed && this.addressInstance.setContent(`${data.address}`)
			this.jobsInstance && !this.jobsInstance.state.isDestroyed && this.jobsInstance.setContent(`${this.jobsText.innerText}`)
			this.managerInstance && !this.managerInstance.state.isDestroyed && this.managerInstance.setContent(`${data.manager}`)
		}, 0)
	
		this.data = data
		this.data.id_employer = id_employer
		this.data.index = index

	}


	onmount() {

		
		this.countryInstance = initRowTooltips(this.country)
		this.companyInstance = initRowTooltips(this.company)
		this.nameInstance = initRowTooltips(this.name)
		this.addressInstance = initRowTooltips(this.address)
		this.jobsInstance = initRowTooltips(this.jobs)
		if(this.data.manager) this.managerInstance = initRowTooltips(this.managerTag._el)
		// console.log(this.countryInstance)
		if(this.data.country_name === null) {
			this.countryInstance.disable()
		} else {
			this.countryInstance.enable()
		}

		
	}

	onunmount(){
		// console.log('unmount')
		this.companyInstance.destroy()
		this.countryInstance.destroy()
		this.nameInstance.destroy()
		this.addressInstance.destroy()
		this.jobsInstance.destroy()
		if(this.data.manager) this.managerInstance.destroy()
		// this.el = this.data = this.attentionTag = this.managerTag = this.vacancyLabel =  null
	}

	

}