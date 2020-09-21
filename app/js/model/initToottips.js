import {tippy, createSingleton, sticky, delegate} from '../../libs/libs'
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
	employerTypeTemplate,
	employerTypeTemplate2,
	workTypeTemplate,
	pricePopupTemplate,
	choiceClientTemplate2
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
	if(managersTemplate) {
		managersTemplate.style.display = 'block';
	}
	if(dateTermsTemplate) {
		dateTermsTemplate.style.display = 'block'
	}
	if(employerTypeTemplate) {
		employerTypeTemplate.style.display = 'block'
	}
	if(workTypeTemplate) {
		workTypeTemplate.style.display = 'block'
	}
	if(pricePopupTemplate) {
		pricePopupTemplate.style.display = 'block'
	}
	if(employerTypeTemplate2) {
		employerTypeTemplate2.style.display = 'block'
	}
	if(choiceClientTemplate2) {
		choiceClientTemplate2.style.display = 'block'
	}
	
	
	
	
	
/////////////////////////////////////////////////////

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

	



function initWorkModalTooltip(parent, el, content){
		let instance = delegate(parent, {
			content,
			target: el,
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

initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-ico', typeFeedbackTemplate)
initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-choise', choiceClientTemplate)
initWorkModalTooltip('.row.clients', '.clients .modal-row__controls .add-item', choiceClientTemplate2)



function initVacancyTooltip(el, content){
		let instance = tippy(el, {
			content: `<div class="row-popup" id="status-change-popup">
					<form>
						<div class="input-group">
							<p class="status choosen"><span>Подготовка CV</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status choosen"><span>CV отправлено</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status ready"><span>Утвержден</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status ready"><span>Контракт подписан</span></p>
							<time></time>
						</div>
						<div class="input-group">
						 <p class="status wait"><span>Подан в визовый центр</span></p>
						 <time></time>
						</div>
					 	<div class="input-group">
							<p class="status department"><span>Получил разрешение</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status department"><span>Забрал разрешение</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status department"><span>Билеты куплены</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="status busy"><span>Трудоустроен</span></p>
							<time></time>
						</div>
						<div class="input-group">
							<p class="del-status delete"><span>Исключить из вакансии</span></p>
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
			sticky: 'reference',
			moveTransition: 'transform 0.2s ease-out',
			plugins: [sticky],
			onCreate(instance) {

			},
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})

				// status(instance)

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
			// content: ``,
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
initVacancyModalTooltip('.modal-row__layer.main-info_right .choose-employer', employerTypeTemplate2)
initVacancyModalTooltip('.modal-row__layer.main-info_left .choose-product-type .type-product', workTypeTemplate)
initVacancyModalTooltip('.modal-row__layer.main-info_left .main-info__price span', pricePopupTemplate)




}




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
			onCreate(instance) {
					// console.log('created sidebar tooltip')
			},
			onShown(instance) {
				document.addEventListener('keyup', function(e){
					if(e.keyCode === 27) {
						instance.hide();
					}
				})

				let children = instance.props.content.querySelectorAll('input')

				children.forEach((child, ind) => {
					child.addEventListener('change', function(){
		
						let check = [].every.call(children, (child) => {
							return	!child.checked
						})

							if(check) {

								instance.reference.children[1].style.display = 'none'
								instance.reference.classList.remove('active')
							} 

							if(child.checked) {
							instance.reference.children[1].style.display = 'block'
							instance.reference.classList.add('active')
						}
					})
				})

				instance.reference.children[1].addEventListener('click', function(e){
					e.stopPropagation();
					children.forEach(child=> {
						child.checked = false
					})

					this.style.display = 'none'

					instance.reference.classList.remove('active')
				})

			},
		})

		// console.log(instance);
	}





function initRowTooltips(el, content) {
		let instance = tippy(el, {
				content,
				appendTo: 'parent',
				onCreate(instance) {
						// console.log('create row tooltip')
						function chechOverflow(child) {
								if (child.tagName.toLowerCase() === 'p') {
						
								
										if (child.offsetWidth < child.scrollWidth && child.textContent !== "") {
										
												instance.enable();
										} else {
												instance.disable();
										}
								}

						}

						chechOverflow = debounce(chechOverflow, 250);

						// window.addEventListener('load', function() {
							// console.log([...instance.reference.children]);
						[...instance.reference.children].forEach(chechOverflow)
						// })
						window.addEventListener('resize', function() {
								[...instance.reference.children].forEach(chechOverflow)
						})


						//Этот момент нужно оптимизировать, чтобы не вызывать для каждой строки, а только для последней

						document.addEventListener('employerslistadd', function(e){
							
							const detail = e.detail.id
							const attr = instance.reference.closest('.row').getAttribute('data-id_employer')
							// console.log(detail)
							if(attr === detail) {
								[...instance.reference.children].forEach(chechOverflow)
							}
							
						})

						//

				},

				onMount(instance) {

				}
		})
		return instance
}



export default initTooltips


export {
	initSidebarTooltip,
	initRowTooltips
}