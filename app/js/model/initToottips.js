import {tippy} from '../../libs/libs'
import {throttle, debounce} from './helper'
import { 

	countryTemplate, 
	typeManufacturyTemplate, 
	contactTemplate, 
	lastContactTemplate

} from '../view'

const initTooltips = () => {
	
	countryTemplate.style.display = 'block';
	typeManufacturyTemplate.style.display = 'block';
	contactTemplate.style.display = 'block';
	lastContactTemplate.style.display = 'block';
/////////////////////////////////////////////////////
	function initSidebarTooltip(el, content){
		tippy(el, {
			content,
			allowHTML: true,
			interactive: true,
			interactiveBorder: 5,
			interactiveDebounce: 0,
			placement: 'right',
			offset: [0, 20],

		})
	}
	/////////////////////////////////////////
	initSidebarTooltip('.country-filter-wrapper', countryTemplate)
////////////////////////////////////////////////////////////
	initSidebarTooltip('.contact-filter-wrapper', contactTemplate)
////////////////////////////////////////////////////////
	initSidebarTooltip('.type-manufactury-filter-wrapper', typeManufacturyTemplate)
/////////////////////////////////////////////////////////////////////////////////
	initSidebarTooltip('.last-contact-filter-wrapper', lastContactTemplate)

// console.log(detectOverflow);

function initRowTooltips(el, content){
	let instance = tippy(el, {
		content,
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