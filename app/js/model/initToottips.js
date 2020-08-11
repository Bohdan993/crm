import {tippy} from '../../libs/libs'
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
	dateTermsTemplate

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