import {el, setAttr, place, tippy, Autocomplete} from '../../../../../libs/libs'
import TableVacancyClient from '../VacancyClients'
import showFullClientsRow from '../../../vacancy/showFullClientsRow'
import initOverlayScrollbars from '../../../OverlayScrollbarsInit'
import getVacancyClients from '../../../fetchingData/Vacancy/getVacancyClients'
import addClientToVacancy from '../../../fetchingData/Vacancy/VacancyModal/addClientToVacancy'
import storage from '../../../Storage'
import { initVacancyModalTooltip } from '../../../initToottips'
import storageVacancyClientsUpdate from '../../../CustomEvents/StorageVacancyClientsUpdate'


class AddClientPopup {
	constructor(){
		this.data =  JSON.parse(localStorage.getItem('clients'))
		this.result = ''
		this.el = el('div', 
				this.main = el('div#choice-client-popup.vacancy-modal-popup', 
				this.form = el('form.choiceClient-form', 
					this.searchGroup = el('div.input-group', 
						el('p', 'Выберите клиента'),
						this.findClient = el('input.info-area', {
							type: 'text'
						}),
						this.resultList = el('ul.autocomplete-result-list')
						),
					el('button.confirm-bnt', 
						el('span', 'ОК'))
					)
				)
			)

		this.autocomplete = new Autocomplete(this.searchGroup, {
			search: input => {
			  try {
							 if (input.length < 1) {
					        return []
					     }

					     return this.data.filter(client => {
						      return client.snp.toLowerCase()
						        .includes(input.toLowerCase())
						    })

			    	}
			    catch(err) {
			    		console.error(err)
			    }

		  },
		  renderResult(result, props) {
		  	return `
				    <li ${props}>
				      <div class="wiki-title">
				        ${result.snp}
				      </div>
				    </li>
				  `
		  },
		  
		  // // We want to display the title
		  getResultValue: result => {
		  	this.result = result
		  	sessionStorage.setItem('currClientVacancy', JSON.stringify(result.id))
		  	return result.snp
		  },
		  autoSelect: true

		})

		this.form.onsubmit = (e) => {
			e.preventDefault()
			// console.log(storage)
			// console.log(storage.setPartialState(this.parent.data.id, res, 'data'))
			addClientToVacancy({
				vacancy: this.parent.data.id,
				client: this.result.id
			}).then(res => {
				if(res !== 'fail') {
					this.parent.update(storage.setPartialState(this.parent.data.id, res, 'data')[this.parent.data.id])
					this.findClient.value = ''
					storageVacancyClientsUpdate.detail.id = String(this.parent.data.id)
					document.dispatchEvent(storageVacancyClientsUpdate)
					this.parent.add._tippy.hide()
				} else {
					return
				}
			})

			}

		}

	update(data){
		
	}

}

export default class ClientsComponent {
	constructor() {
		this.data = {}
		this.showed = false
		this.el = el('div.clients-layer',
				this.switcher = el('i.switcher', 
					el('i.s-union')),
				el('div.modal-row__controls', 
					el('p', 'Клиенты'),
					this.add = el('div.add-item', el('span', '+'), 'добавить клиента'
						)),
					this.modalLayer = el('div.modal-row__layer', 
						el('div.modal-row__clients-row.active',
							this.names = el('p')),
						this.vacancyClientsTable = new TableVacancyClient('vacancy-modal')) 
			)

		this.addClientPopup = new AddClientPopup()
		this.addClientPopup.main.style.display = "block"
		this.addClientPopup.parent = this
		// this.addClientInstance = initRowTooltips(this.country)

			// tippy(this.add, {
   //      content: this.addClientPopup.el,
   //    });

   document.addEventListener('storageupdate', (e) => {
   	
		if(e.detail.id === this.data.id) {
			if(e.detail.clazz === 'vacancy-row') {
						console.log('Vacancy-row:', storage)
						let data = storage.getState(this.data.id)
						// console.log(storage)
						this.vacancyClientsTable.update(data)
					}
		}
		
	})

	


	}


	update(data) {
		console.log(data)
		this.vacancyClientsTable.update(data)

		setAttr(this.names, {
				innerText: `${data.data.map(el => el.main.snp).join(', ')}`
			})

		this.data = data
	}


	onmount() {
		this.choiseClientInstance = initVacancyModalTooltip(this.add, this.addClientPopup.el, tippy)
		showFullClientsRow(this.switcher, this.el)
	}
} 
