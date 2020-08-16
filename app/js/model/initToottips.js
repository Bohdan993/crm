import {tippy, createSingleton} from '../../libs/libs'
import {throttle, debounce} from './helper'
import { 

	countryTemplate, 
	typeManufacturyTemplate, 
	contactTemplate, 
	lastContactTemplate,
	managersTemplate,
	intermediariesTemplate,
	vacanciesTemplate,
	sortingTemplate,
	typeFeedbackTemplate,
	choiceClientTemplate,
	body,
	selectingTemplate,
	statusTemplate,
	typeWorkTemplate,
	dateTermsTemplate,
	employerTypeTemplate
	// statusChangeTemplate	

} from '../view'

const initTooltips = () => {
	if(countryTemplate) {
		countryTemplate.style.display = 'block';
	}
	if(typeManufacturyTemplate) {
		typeManufacturyTemplate.style.display = 'block';
	}
	if(contactTemplate) {
		contactTemplate.style.display = 'block';
	}
	if(managersTemplate) {
			managersTemplate.style.display = 'block';
	}
	if(lastContactTemplate){
		lastContactTemplate.style.display = 'block';
	}
	if(intermediariesTemplate){
		intermediariesTemplate.style.display = 'block';
	}
	if(vacanciesTemplate) {
		vacanciesTemplate.style.display = 'block';
	}
	if(sortingTemplate){
		sortingTemplate.style.display = 'block';
	}
	if(typeFeedbackTemplate){
		typeFeedbackTemplate.style.display = 'block'
	}
	if(choiceClientTemplate){
		choiceClientTemplate.style.display = 'block'
	}
	if(statusTemplate){
		statusTemplate.style.display = 'block'
	}
	if(selectingTemplate){
		selectingTemplate.style.display = 'block'
	}
	if(typeWorkTemplate) {
		typeWorkTemplate.style.display = 'block'
	}
	if(dateTermsTemplate) {
		dateTermsTemplate.style.display = 'block'
	}
	if(employerTypeTemplate) {
		employerTypeTemplate.style.display = 'block'
	}
	
	
	
	
/////////////////////////////////////////////////////
	function initSidebarTooltip(el, content){
		let instance = tippy(el, {
			content,
			allowHTML: true,
			interactive: true,
			interactiveBorder: 5,
			interactiveDebounce: 0,
			placement: 'right',
			offset: [0, 20],
			hideOnClick: true,
			trigger: 'click',
			appendTo: () => document.body,
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})

				let children = instance.props.content.querySelectorAll('input')

				children.forEach(child => {
					child.addEventListener('change', function(){
							if(child.checked) {
							instance.reference.children[1].style.display = 'block'
						}
					})
				})

				instance.reference.children[1].addEventListener('click', function(){
					children.forEach(child=> {
						child.checked = false
					})

					this.style.display = 'none'
				})

			},
		})

		// console.log(instance);
	}
	/////////////////////////////////////////
	initSidebarTooltip('.country-filter-wrapper', countryTemplate)
////////////////////////////////////////////////////////////
	initSidebarTooltip('.contact-filter-wrapper', contactTemplate)
////////////////////////////////////////////////////////
	initSidebarTooltip('.type-manufactury-filter-wrapper', typeManufacturyTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.managers-filter-wrapper', managersTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.intermediaries-filter-wrapper', intermediariesTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.vacancies-filter-wrapper', vacanciesTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.last-contact-filter-wrapper', lastContactTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.sorting-stats-wrapper', sortingTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.stages-vacancies-filter-wrapper', statusTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.selecting-stats-wrapper', selectingTemplate)
////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.type-work-filter-wrapper', typeWorkTemplate)
////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.date-terms-filter-wrapper', dateTermsTemplate)
////////////////////////////////////////////////////////////////////////////////

	



function initWorkModalTooltip(el, content){
		let instance = tippy(el, {
			content,
			allowHTML: true,
			interactive: true,
			interactiveBorder: 5,
			interactiveDebounce: 0,
			placement: 'bottom',
			offset: [0, 20],
			hideOnClick: true,
			trigger: 'click',
			appendTo: () => document.body,
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})
			},
		})

	}

initWorkModalTooltip('.add-feedback-form .modal-row__feedback-ico', typeFeedbackTemplate)
initWorkModalTooltip('.add-feedback-form .modal-row__feedback-choise', choiceClientTemplate)


function initVacancyTooltip(el, content){
		let instance = tippy(el, {
			content: `<div class="row-popup" id="status-change-popup">
          <form>
            <div class="input-group">
              <p class="status choosen">Подготовка CV</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status choosen">CV отправлено</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status ready">Утвержден</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status ready">Контракт подписан</p>
              <time></time>
            </div>
            <div class="input-group">
             <p class="status wait">Подан в визовый центр</p>
             <time></time>
            </div>
           	<div class="input-group">
              <p class="status department">Получил рашрешение</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status department">Забрал разрешение</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status department">Билеты куплены</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status busy">Трудоустроен</p>
              <time></time>
            </div>
            <div class="input-group">
              <p class="status delete">Исключить из вакансии</p>
            </div>
          </form>
        </div>`,
			// content: content.innerHTML, 
			allowHTML: true,
			interactive: true,
			interactiveBorder: 5,
			interactiveDebounce: 0,
			placement: 'right',
			offset: [0, 20],
			hideOnClick: true,
			trigger: 'click',
			onCreate(instance) {

			},
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})

				// let child = instance.reference.querySelector('.active')
				// console.log(child)
			},
			appendTo: () => document.body,
		})

		// let singleton = createSingleton(instance, {delay: 1000});
	}


	initVacancyTooltip('.cell-status__slider')

function initVacancyModalTooltip(el, content){
		let instance = tippy(el, {
			content,
			allowHTML: true,
			maxWidth: 364,
			interactive: true,
			interactiveBorder: 5,
			interactiveDebounce: 0,
			placement: 'bottom',
			offset: [0, 8],
			hideOnClick: true,
			trigger: 'click',
			appendTo: () => document.body,
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})
			},
		})

	}

initVacancyModalTooltip('.modal-row__layer.main-info_left .choose-employer', employerTypeTemplate)

function initRowTooltips(el, content){
	let instance = tippy(el, {
		content,
		appendTo: 'parent',
		onCreate(instance) {

			function chechOverflow(child){
				// console.log(child.offsetWidth === child.scrollWidth)
			
				if(child.tagName.toLowerCase() === 'p') {
					console.log(child.offsetWidth < child.scrollWidth)
						if(child.offsetWidth < child.scrollWidth){
	    				instance.enable();
	    				// console.log(true)
	          }
	          else{
	          	instance.disable();
	          	// console.log(false)
	         }
				}
			
			}

			chechOverflow = debounce(chechOverflow, 250)

			window.addEventListener('load', function(){
				[...instance.reference.children].forEach(chechOverflow)
			})
			window.addEventListener('resize', function(){
				[...instance.reference.children].forEach(chechOverflow)
			})

			// document.addEventListener('fullscreenchange', function(){
			// 	[...instance.reference.children].forEach(chechOverflow)
			// })
		

  	},
	})
	return instance
}

let countryInstance = initRowTooltips('.row__name')

countryInstance.forEach(el=> {

	el.setContent('Норвегия')

})

}


export default initTooltips