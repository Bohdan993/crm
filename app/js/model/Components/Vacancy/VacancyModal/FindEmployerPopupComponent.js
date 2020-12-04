import {el, setAttr, place, Autocomplete} from '../../../../../libs/libs'
import loadEmployerInfo from '../../../fetchingData/Vacancy/VacancyModal/loadEmployerInfo.js'

export default class FindEmployerPopupComponent {

	constructor(){
		this.el = el('div.vacancy-modal-popup#employer-type-popup', 
				this.form = el('form', 
					el('p.vacancy-modal__title', `Введите имя работодателя 
						или название организации`),
					this.searchGroup = el('div.input-group', 
						el('input.find-employer.info-area#find-employer'), 
						el('ul.autocomolete-result-list')
						),
					this.btn = el('button.confirm-bnt', 
						el('span', 'ОК')
						)
					)
			)

		this.autocomplete = new Autocomplete(this.searchGroup, {
		 search: input => {
			    return new Promise(resolve => {
			      if (input.length < 3) {
			        return resolve([])
			      }

			      loadEmployerInfo({})
			        .then(response => console.log(response))
			        // .then(data => {
			        //   resolve(data.query.search)
			        // })
			    })
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
		  	
		  	return result.snp
		  },
		  autoSelect: true

		})

		this.form.addEventListener('submit', (e) => {
			e.preventDefault()

			
		})
	}

	update(){

	}

}