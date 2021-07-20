import {
	el,
	setAttr,
	place,
	tippy,
	Autocomplete
} from '../../../../../libs/libs'
import TableVacancyClient from '../VacancyClients'
import showFullClientsRow from '../../../vacancy/showFullClientsRow'
import addClientToVacancy from '../../../fetchingData/Vacancy/VacancyModal/addClientToVacancy'
import clientAddToVacancyEvent from '../../../CustomEvents/clientAddToVacancyEvent'
import storage from '../../../Storage'
import vacancyStorage from '../../../Storage/globalVacancies'
import {
	initVacancyModalTooltip
} from '../../../initToottips'


class AddClientPopup {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('clientsVacancy'))
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

				} catch (err) {
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
			getResultValue: result => {
				this.result = result
				sessionStorage.setItem('currClientVacancy', JSON.stringify(result.id))
				return result.snp
			},
			autoSelect: true

		})

		this.form.onsubmit = (e) => {
			e.preventDefault()

			addClientToVacancy({
				vacancy: this.parent.data.id,
				client: this.result.id
			}).then(res => {
				if (res !== 'fail') {

					let statusesArr = vacancyStorage.getPartialState(this.parent.data.id, 'id_vacancy', 'status')

					let [firstInd, secondInd, ...rest] = statusesArr
					vacancyStorage.setPartialState(this.parent.data.id, 'id_vacancy', 'status', [firstInd - 1, secondInd + 1, ...rest])

					storage.setPartialState(this.parent.data.id, res, 'data')

					this.findClient.value = ''
					this.parent.add._tippy.hide()

					clientAddToVacancyEvent.detail.id = this.parent.data.id
					document.dispatchEvent(clientAddToVacancyEvent)
				} else {
					return
				}

			})

		}

	}

}

export default class ClientsComponent {
	constructor() {
		this.data = {}
		this.showed = false
		this.el = el('div.clients-layer.modal-row__inner-layer',
			this.switcher = place(el('i.switcher',
				el('i.s-union'))),
			el('div.modal-row__controls',
				el('p', 'Клиенты'),
				this.add = el('div.add-item', el('span', '+'), 'добавить клиента')),
			this.modalLayer = el('div.modal-row__layer.empty-layer',
				el('div.modal-row__clients-row.active',
					this.names = el('p')),
				this.vacancyClientsTable = new TableVacancyClient('vacancy-modal'))
		)



		this.clientaddtovacancyeventHandler = (e) => {
			if (e.detail.id === this.data.id) {
				let data = storage.getState(this.data.id)
				this.update(data)
			}
		}


		this.clientupdateinvacancyeventHandler = (e) => {

			if (e.detail.id === this.data.id) {
				let data = storage.getState(this.data.id)
				data.data.forEach(el => {
					if (el.vacancy.id === e.detail.clientId) {
						let res = el.status_history.find(el => el.id_status === e.detail.statusId)
						if (res) {
							res.date = new Date().toLocaleDateString()
						} else {
							el.status_history.push({
								id_status: e.detail.statusId,
								date: new Date().toLocaleDateString()
							})
						}
					}
				})

				this.vacancyClientsTable.update(data)
			}

		}

		this.clientdeletefromvacancyeventHandler = (e) => {
			if (e.detail.id === this.data.id) {
				let data = storage.getState(this.data.id)
				this.update(data)
			}
		}


		this.addClientPopup = new AddClientPopup()
		this.addClientPopup.main.style.display = "block"
		this.addClientPopup.parent = this

	}


	update(data) {


		const {
			data: clients
		} = data


		setAttr(this.names, {
			innerText: `${clients.map(el => el.main.snp).join(', ')}`
		})

		clients.length ? this.switcher.update(true) : this.switcher.update(false)

		setAttr(this.modalLayer, {
			classList: clients.length ? 'modal-row__layer' : 'modal-row__layer empty-layer'
		})

		this.data = data
	
		this.vacancyClientsTable.update(data)
	}


	onmount() {
		this.choiseClientInstance = initVacancyModalTooltip(this.add, this.addClientPopup.el, tippy)
		showFullClientsRow(this.switcher._el, this.el)
		document.addEventListener('clientaddtovacancyevent', this.clientaddtovacancyeventHandler)
		document.addEventListener('clientupdateinvacancyevent', this.clientupdateinvacancyeventHandler)
		document.addEventListener('clientdeletefromvacancyevent', this.clientdeletefromvacancyeventHandler)
	}

	onunmount() {
		if (this.choiseClientInstance) this.choiseClientInstance.destroy()
		document.removeEventListener('clientaddtovacancyevent', this.clientaddtovacancyeventHandler)
		document.removeEventListener('clientupdateinvacancyevent', this.clientupdateinvacancyeventHandler)
		document.removeEventListener('clientdeletefromvacancyevent', this.clientdeletefromvacancyeventHandler)
	}
}