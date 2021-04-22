import {el, setAttr, place, Autocomplete} from '../../../../../libs/libs'
import loadEmployerInfo from '../../../fetchingData/Vacancy/VacancyModal/loadEmployerInfo'
// import storage from '../../../Storage'
import storageVacancyEmployerDataAdd from '../../../CustomEvents/storageVacancyEmployerDataAdd'

export default class FindEmployerPopupComponent {

	constructor(type){
		this.data =  JSON.parse(localStorage.getItem('employersVacancy'))
		this.el = el('div.vacancy-modal-popup#employer-type-popup', 
				this.form = el('form', 
					el('p.vacancy-modal__title', `Введите имя работодателя 
						или название организации`),
					this.searchGroup = el('div.input-group', 
						this.findEmployer = el('input.find-employer.info-area#find-employer'), 
						el('ul.autocomplete-result-list')
						),
					this.btn = el('button.confirm-bnt', 
						el('span', 'ОК')
						)
					)
			)

		// console.log(this.data)

		this.autocomplete = new Autocomplete(this.searchGroup, {

	search: input => {
			  try {
							 if (input.length < 1) {
					        return []
					     }
					     return this.data.filter(employer => {
						      return employer.name.toLowerCase()
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
				        ${((result?.name) || ' ') + (result.enterprise ? '\u00A0 - \u00A0' : ' ') + (result?.enterprise || ' ')}
				      </div>
				    </li>
				  `
		  },
		  
		  // // We want to display the title
		  getResultValue: result => {
		  	this.result = result
		  	return `${((result?.name) || ' ') + (result.enterprise ? '\u00A0 - \u00A0' : ' ') + (result?.enterprise || ' ')}`
		  },
		  autoSelect: true

		})

		this.form.addEventListener('submit', (e) => {
			e.preventDefault()
			// console.log(this.result.id)

			console.log(this.parent)

			loadEmployerInfo({
				vacancy: this.parent.data.idVac,
				employer: this.result.id
			}).then(res => {
				if(res !== 'fail') {

					this.parent.chooseEmployer 
					? this.parent.chooseEmployer._el._tippy.hide() 
					: this.parent.employerNameParagraph._tippy.hide()

					// storage.setState('vacancyEmployerData', res)

					console.log(this.result.id, res)

					storageVacancyEmployerDataAdd.detail.id = 'vacancyEmployerData'
					storageVacancyEmployerDataAdd.detail.employerId = this.result.id
					storageVacancyEmployerDataAdd.detail.vacancyEmployerData = res

					document.dispatchEvent(storageVacancyEmployerDataAdd)

					this.findEmployer.value = ''
				} else {
					return
				}
			})
		})
	}

	update(){

	}

}