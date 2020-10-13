import getEmployersList from './fetchingData/getEmployersList'
import {
    tippy,
    createSingleton,
    sticky,
    delegate
} from '../../libs/libs'
import {
    throttle,
    debounce
} from './helper'
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

    if (countryTemplate) {
        countryTemplate.style.display = 'block';
    }
    if (typeManufacturyTemplate) {
        typeManufacturyTemplate.style.display = 'block';
    }
    if (contactTemplate) {
        contactTemplate.style.display = 'block';
    }
    if (lastContactTemplate) {
        lastContactTemplate.style.display = 'block';
    }
    if (intermediariesTemplate) {
        intermediariesTemplate.style.display = 'block';
    }
    if (vacanciesTemplate) {
        vacanciesTemplate.style.display = 'block';
    }
    if (sortingTemplate) {
        sortingTemplate.style.display = 'block';
    }
    if (typeFeedbackTemplate) {
        typeFeedbackTemplate.style.display = 'block'
    }
    if (choiceClientTemplate) {
        choiceClientTemplate.style.display = 'block'
    }
    if (statusTemplate) {
        statusTemplate.style.display = 'block'
    }
    if (selectingTemplate) {
        selectingTemplate.style.display = 'block'
    }
    if (typeWorkTemplate) {
        typeWorkTemplate.style.display = 'block'
    }
    if (managersTemplate) {
        managersTemplate.style.display = 'block';
    }
    if (dateTermsTemplate) {
        dateTermsTemplate.style.display = 'block'
    }
    if (employerTypeTemplate) {
        employerTypeTemplate.style.display = 'block'
    }
    if (workTypeTemplate) {
        workTypeTemplate.style.display = 'block'
    }
    if (pricePopupTemplate) {
        pricePopupTemplate.style.display = 'block'
    }
    if (employerTypeTemplate2) {
        employerTypeTemplate2.style.display = 'block'
    }
    if (choiceClientTemplate2) {
        choiceClientTemplate2.style.display = 'block'
    }

    /////////////////////////////////////////////////////




    /////////////////////////////////////////
    initSidebarTooltip('.country-filter-wrapper', countryTemplate)
    ////////////////////////////////////////////////////////////
    initSidebarTooltip('.type-manufactury-filter-wrapper', typeManufacturyTemplate)
    ////////////////////////////////////////////////////////
    initSidebarTooltip('.contact-filter-wrapper', contactTemplate)
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


    ////////////////////////////////////////////////////////////////////////////////
    // initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-ico', typeFeedbackTemplate)
    // initWorkModalTooltip('.row.feedback', '.add-feedback-form .modal-row__feedback-choise', choiceClientTemplate)
    // initWorkModalTooltip('.row.clients', '.clients .modal-row__controls .add-item', choiceClientTemplate2)
    /////////////////////////////////////////////////////////////////////////////////

    function initVacancyTooltip(el, content) {
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
                document.addEventListener('keyup', function(e) {
                    if (e.keyCode === 27) {
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

    function initVacancyModalTooltip(el, content) {
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
                document.addEventListener('keyup', function(e) {
                    if (e.keyCode === 27) {
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


///////////////////////////////////initSidebarTooltip BLOCK////////////////////////////

function initSidebarTooltip(el, content) {

		let removeCheckingHandlerFlag = false
		let childChangeHandlerFlag = false

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
                console.log(instance)

        		function checkIfShowRemoveFilterButton(storageKey){
						  sessionStorage.getItem(storageKey) && JSON.parse(sessionStorage.getItem(storageKey))  !== '' ? (instance.reference.children[1].style.display = 'block',
						  instance.reference.classList.add('active')) : null
        		}

        		switch(instance.id) {
						  case 1:
							checkIfShowRemoveFilterButton('countryFilter')
						    break
						  case 2:
						    checkIfShowRemoveFilterButton('typeManufacturyFilter')
						    break
						  case 3:
						    checkIfShowRemoveFilterButton('contactDataFilter')
						    break
						  case 4:
						    checkIfShowRemoveFilterButton('managerFilter')
						    break
						  case 5:
						    checkIfShowRemoveFilterButton('intermediariesFilter')
                            checkIfShowRemoveFilterButton('intermediaryFilter')
						    break
						  case 6:
					        checkIfShowRemoveFilterButton('vacancyActiveFilter')
                            checkIfShowRemoveFilterButton('vacancyTypeFilter')
                            checkIfShowRemoveFilterButton('vacancyTermFilter')
						    break
						  case 7:
						    checkIfShowRemoveFilterButton('lastContactFilter')
						    break
						  case 8:
						    checkIfShowRemoveFilterButton('sortFilter')
						    break
						 	case 9:
						    // alert( 'Маловато9' )
						    break
						  case 10:
						    // alert( 'Маловато10' )
						    break
						  default:
						  	throw new Error('Возникла ошибка')
					}
  
        },
        onShown(instance) {
        let children = instance.props.content.querySelectorAll('input')
            document.addEventListener('keyup', function(e) {
                if (e.keyCode === 27) {
                    instance.hide();
                }
            })

            
            if(!childChangeHandlerFlag) {
            	children.forEach((child, ind) => {
                child.addEventListener('change', childChangeHandler.bind(null, children, child, instance))
           	 })

            	childChangeHandlerFlag = true
            }
           

            if(!removeCheckingHandlerFlag) {
            	instance.reference.children[1].addEventListener('click', removeCheckingHandler.bind(instance.reference.children[1], children, instance))

            	removeCheckingHandlerFlag = true
            }
        },
    })
}



function childChangeHandler(children, child, instance, e) {

	let check = [].every.call(children, (child) => {
      return !child.checked
  })

	let some = [].some.call(children, (child) => {
      return child.checked
  })


  if (check) {

      instance.reference.children[1].style.display = 'none'
      instance.reference.classList.remove('active')
  }

  if (child.checked || some) {
      instance.reference.children[1].style.display = 'block'
      instance.reference.classList.add('active')
  }
}


function removeCheckingHandler(children, instance, e){
    // Перенести e.stopPropagation() в файл disablePropagationOnSidebarFilterRemove
	e.stopPropagation();
	switch(instance.id) {
			case 1:
		    getEmployersList({country: ''})
		    sessionStorage.removeItem('countryFilter')
		    break
		  case 2:
		    getEmployersList({production: ''})
		    sessionStorage.removeItem('typeManufacturyFilter')
		    break
		  case 3:
		    getEmployersList({contact: ''})
		    sessionStorage.removeItem('contactDataFilter')
		    break
		  case 4:
		    getEmployersList({manager: ''})
            sessionStorage.removeItem('managerFilter')
		    break
		  case 5:
            getEmployersList({intermediaries: ''})
            sessionStorage.removeItem('intermediariesFilter')
            getEmployersList({intermediary: ''})
            sessionStorage.removeItem('intermediaryFilter')
		    break
		  case 6:
		    getEmployersList({vacancy_active: ''})
            sessionStorage.removeItem('vacancyActiveFilter')
            getEmployersList({vacancy_type: ''})
            sessionStorage.removeItem('vacancyTypeFilter')
            getEmployersList({vacancy_term: ''})
            sessionStorage.removeItem('vacancyTermFilter')
		    break
		  case 7:
		    getEmployersList({last_contact: ''})
            sessionStorage.removeItem('lastContactFilter')
		    break
		  case 8:
		    getEmployersList({sort: ''})
            sessionStorage.removeItem('sortFilter')
		    break
		 	case 9:
		    alert( 'Маловато9' )
		    break
		  case 10:
		    alert( 'Маловато10' )
		    break
		  default:
		  	throw new Error('Возникла ошибка')
	}
  

  children.forEach(child => {
      child.checked = false
      // child.dispatchEvent(new Event('change'))
  })

  this.style.display = 'none'
  instance.reference.classList.remove('active')
}


//////////////////////////////END initSidebarTooltip BLOCK/////////////////////////////////


//////////////////////////////START initRowTooltips BLOCK/////////////////////////////////
function initRowTooltips(el, content) {
    let instance = tippy(el, {
        content,
        appendTo: 'parent',
        onCreate(instance) {
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

            [...instance.reference.children].forEach(chechOverflow)

            window.addEventListener('resize', function() {
                [...instance.reference.children].forEach(chechOverflow)
            })

            //Этот момент нужно оптимизировать, чтобы не вызывать событие для каждой строки работодателя, а только для последней (которую добавили в список)

            document.addEventListener('employerslistadd', function(e) {

                const detail = e.detail.id
                const attr = instance.reference.closest('.row').getAttribute('data-id_employer')
                // console.log(detail)
                if (attr === detail) {
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

//////////////////////////////END initRowTooltips BLOCK/////////////////////////////////

//////////////////////////////START initWorkModalTooltip BLOCK/////////////////////////////////
function initWorkModalTooltip(parent, el, content) {
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
        onCreate(instance){
            console.log('dfdf')
        },
        onShown(instance) {
            document.addEventListener('keyup', function(e) {
                if (e.keyCode === 27) {
                    instance.hide();
                }
            })
        },
    })

}

//////////////////////////////END initWorkModalTooltip BLOCK/////////////////////////////////

export default initTooltips

export {
    initRowTooltips, // to './Components/Employer/EmployerRow.js'
    initWorkModalTooltip // to './Components/FeedbackComponent'
}