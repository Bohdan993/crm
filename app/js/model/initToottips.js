import getEmployersList from './fetchingData/Employer/getEmployersList'
import getVacancyList from './fetchingData/Vacancy/getVacancyList'
import {
    tippy,
    hideAll,
    sticky,
} from '../../libs/libs'
import {
    debounce
} from './helper'
import {

    countryTemplate,
    countryTemplateVacancy,
    typeManufacturyTemplate,
    contactTemplate,
    lastContactTemplate,
    managersTemplate,
    intermediariesTemplate,
    vacanciesTemplate,
    sortingTemplate,
    selectingTemplate,
    statusTemplate,
    typeWorkTemplate,
    dateTermsTemplate,


} from '../view'


const initTooltips = () => {

    if (countryTemplate) {
        countryTemplate.style.display = 'block';
    }
    if (countryTemplateVacancy) {
        countryTemplateVacancy.style.display = 'block';
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

    /////////////////////////////////////////
    initSidebarTooltip('.country-filter-wrapper', countryTemplate)
    ////////////////////////////////////////////////////////////
    initSidebarTooltip('.country-filter-wrapper-vacancy', countryTemplateVacancy)
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
    initSidebarTooltip('.managers-filter-wrapper-vacancy', managersTemplate)
    ////////////////////////////////////////////////////////////////////////////////


}


///////////////////////////////////initSidebarTooltip BLOCK////////////////////////////

function checkIfShowRemoveFilterButton(storageKey, instance) {
    sessionStorage.getItem(storageKey) && (JSON.parse(sessionStorage.getItem(storageKey)) !== '' && JSON.parse(sessionStorage.getItem(storageKey)) !== 'date') ?
        (instance.reference.children[1].style.display = 'block',
            instance.reference.classList.add('active')) :
        null
}

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
            if (instance.reference.classList.contains('country-filter-wrapper-vacancy')) {

                checkIfShowRemoveFilterButton('countryFilterVacancy', instance)

            } else if (instance.reference.classList.contains('type-work-filter-wrapper')) {

                checkIfShowRemoveFilterButton('v-vacancyTypeFilter', instance)
                checkIfShowRemoveFilterButton('typeManufacturyVacancyFilter', instance)

            } else if (instance.reference.classList.contains('date-terms-filter-wrapper')) {

                checkIfShowRemoveFilterButton('jobStartFilter', instance)
                checkIfShowRemoveFilterButton('jobPeriodFilter', instance)

            } else if (instance.reference.classList.contains('managers-filter-wrapper-vacancy')) {

                checkIfShowRemoveFilterButton('managerFilterVacancy', instance)

                ///********************* <-------------> *************************/

            } else if (instance.reference.classList.contains('managers-filter-wrapper')) {
                //*comment* Тут сделать по аналогии, только подставить ключ из sessionStorage который ты использовал для меток
                //*comment* Этот код отрабатывает тогда, когда страница загрузилась, и проверяет есть по ключу в sessionStorage какие то данные
                //*comment* Если есть,то отображать кретик у фильтра
                checkIfShowRemoveFilterButton('managerFilter', instance)
                checkIfShowRemoveFilterButton('marksFilter', instance)

            } else if (instance.reference.classList.contains('stages-vacancies-filter-wrapper')) {

                checkIfShowRemoveFilterButton('stagesOfVacancies', instance)

            } else if (instance.reference.classList.contains('selecting-stats-wrapper')) {

                checkIfShowRemoveFilterButton('sortFilterVacancy', instance)

            } else if (instance.reference.classList.contains('country-filter-wrapper')) {

                checkIfShowRemoveFilterButton('countryFilter', instance)

            } else if (instance.reference.classList.contains('type-manufactury-filter-wrapper')) {

                checkIfShowRemoveFilterButton('typeManufacturyFilter', instance)

            } else if (instance.reference.classList.contains('contact-filter-wrapper')) {

                checkIfShowRemoveFilterButton('contactDataFilter', instance)

            } else if (instance.reference.classList.contains('intermediaries-filter-wrapper')) {

                checkIfShowRemoveFilterButton('intermediariesFilter', instance)
                checkIfShowRemoveFilterButton('intermediaryFilter', instance)

            } else if (instance.reference.classList.contains('vacancies-filter-wrapper')) {

                checkIfShowRemoveFilterButton('vacancyActiveFilter', instance)
                checkIfShowRemoveFilterButton('vacancyTypeFilter', instance)
                checkIfShowRemoveFilterButton('vacancyTermFilter', instance)

            } else if (instance.reference.classList.contains('last-contact-filter-wrapper')) {

                checkIfShowRemoveFilterButton('lastContactFilter', instance)

            } else if (instance.reference.classList.contains('sorting-stats-wrapper')) {

                checkIfShowRemoveFilterButton('sortFilter', instance)

            } else {

                throw new Error('Виникла помилка')

            }

        },
        onShown(instance) {
            let children = instance.props.content.querySelectorAll('input')

            if (!childChangeHandlerFlag) {
                children.forEach((child, ind) => {
                    child.addEventListener('change', childChangeHandler.bind(null, children, child, instance))
                })

                childChangeHandlerFlag = true
            }


            if (!removeCheckingHandlerFlag) {
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

    let val = [].some.call(children, (child) => {
        return child.getAttribute('type') === 'text' && child.value !== ''
    })


    if (check) {

        instance.reference.children[1].style.display = 'none'
        instance.reference.classList.remove('active')
    }


    if (child.checked || some) {
        instance.reference.children[1].style.display = 'block'
        instance.reference.classList.add('active')
    }


    if (val) {
        instance.reference.children[1].style.display = 'block'
        instance.reference.classList.add('active')
    }

    if (child.id === 'sorting-date') {
        instance.reference.children[1].style.display = 'none'
        instance.reference.classList.remove('active')
    }


}


function removeCheckingHandler(children, instance, e) {
    // Перенести e.stopPropagation() в файл disablePropagationOnSidebarFilterRemove
    e.stopPropagation();

    if (instance.reference.classList.contains('country-filter-wrapper-vacancy')) {

        getVacancyList({country: ''})
        sessionStorage.removeItem('countryFilterVacancy')

    } else if (instance.reference.classList.contains('type-work-filter-wrapper')) {

        getVacancyList({'type_vacancy': '', 'type_production': ''})
        sessionStorage.removeItem('v-vacancyTypeFilter')
        sessionStorage.removeItem('typeManufacturyVacancyFilter')

    } else if (instance.reference.classList.contains('date-terms-filter-wrapper')) {

        getVacancyList({job_start: '', job_period: ''})
        sessionStorage.removeItem('jobStartFilter')
        sessionStorage.removeItem('jobPeriodFilter')

    } else if (instance.reference.classList.contains('managers-filter-wrapper-vacancy')) {

        getVacancyList({manager: ''})
        sessionStorage.removeItem('managerFilterVacancy')

    } else if (instance.reference.classList.contains('managers-filter-wrapper')) {
        //*comment* Дописать в аргумент функции название ключа для меток. Этот код отрабатывает когда пользователь
        //*comment* нажимает крестик в фильтре
        getEmployersList({manager: '', marks: ''})
        sessionStorage.removeItem('managerFilter')
        sessionStorage.removeItem('marksFilter')
    } else if (instance.reference.classList.contains('stages-vacancies-filter-wrapper')) {

        getVacancyList({status: ''})
        sessionStorage.removeItem('stagesOfVacancies')

    } else if (instance.reference.classList.contains('selecting-stats-wrapper')) {

        getVacancyList({sort: 'date'})
        sessionStorage.removeItem('sortFilterVacancy')

    } else if (instance.reference.classList.contains('country-filter-wrapper')) {

        getEmployersList({country: ''})
        sessionStorage.removeItem('countryFilter')

    } else if (instance.reference.classList.contains('type-manufactury-filter-wrapper')) {

        getEmployersList({production: ''})
        sessionStorage.removeItem('typeManufacturyFilter')

    } else if (instance.reference.classList.contains('contact-filter-wrapper')) {

        getEmployersList({contact: ''})
        sessionStorage.removeItem('contactDataFilter')

    } else if (instance.reference.classList.contains('intermediaries-filter-wrapper')) {

        getEmployersList({intermediaries: '', intermediary: ''})
        sessionStorage.removeItem('intermediariesFilter')
        sessionStorage.removeItem('intermediaryFilter')

    } else if (instance.reference.classList.contains('vacancies-filter-wrapper')) {

        getEmployersList({vacancy_active: '', vacancy_type: '', vacancy_term: ''})
        sessionStorage.removeItem('vacancyActiveFilter')
        sessionStorage.removeItem('vacancyTypeFilter')
        sessionStorage.removeItem('vacancyTermFilter')

    } else if (instance.reference.classList.contains('last-contact-filter-wrapper')) {

        getEmployersList({last_contact: ''})
        sessionStorage.removeItem('lastContactFilter')

    } else if (instance.reference.classList.contains('sorting-stats-wrapper')) {

        getEmployersList({sort: 'date'})
        sessionStorage.removeItem('sortFilter')

    } else {

        throw new Error('Виникла помилка')

    }


    children.forEach(child => {


        child.checked = false
        if (child.id === 'sorting-date') {
            child.checked = true
        }
        child.getAttribute('type') === 'text' ? child.value = '' : null
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

            window.addEventListener('resize', function () {
                [...instance.reference.children].forEach(chechOverflow)
            }, {once: true})

            //Этот момент нужно оптимизировать, чтобы не вызывать событие для каждой строки работодателя, а только для последней (которую добавили в список)

            document.addEventListener('employerslistadd', function (e) {
                const detail = e.detail.id
                const attr = instance.reference.closest('.row').getAttribute('data-id_employer')
                if (attr === detail) {
                    [...instance.reference.children].forEach(chechOverflow)
                }

            }, {once: true})

            //

        },

        onMount(instance) {

        }
    })
    return instance
}

//////////////////////////////END initRowTooltips BLOCK/////////////////////////////////

//////////////////////////////START initWorkModalTooltip BLOCK/////////////////////////////////
function initWorkModalTooltip(el, content) {
    let instance = tippy(el, {
        content: content,
        allowHTML: true,
        interactive: true,
        interactiveBorder: 5,
        interactiveDebounce: 0,
        placement: 'bottom',
        offset: [0, 20],
        hideOnClick: true,
        trigger: 'click',
        appendTo: () => document.body,
        onCreate(instance) {

        },
        onShown(instance) {
        },
    })
    return instance
}

//////////////////////////////END initWorkModalTooltip BLOCK/////////////////////////////////


//////////////////////////////START initVacancyTooltip BLOCK/////////////////////////////////

function initVacancyTooltip(el, content = '') {
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
        sticky: 'reference',
        moveTransition: 'transform 0.2s ease-out',
        plugins: [sticky],
        appendTo: () => document.body,
    })

    return instance
}

//////////////////////////////END initVacancyTooltip BLOCK/////////////////////////////////


function initVacancyModalTooltip(el, content, tippy) {
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
        onCreate(instance) {
        },
        onShown(instance) {
            const input = instance.popper.querySelector('input')

            input.focus()
        }
    })
    return instance
}


document.addEventListener('keydown', onkeydown)
document.addEventListener('keyup', onkeydown)

function onkeydown(e) {
    if (e.keyCode === 27) {
        hideAll()
    }
}


export default initTooltips

export {
    initVacancyModalTooltip,
    initRowTooltips, // to './Components/Employer/EmployerRow.js'
    initWorkModalTooltip, // to './Components/FeedbackComponent'
    initVacancyTooltip
}