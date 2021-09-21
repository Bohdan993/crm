const body = document.querySelector('body')
const rows = document.querySelectorAll('.row')
const sidebarSearchInput = document.querySelector('.sidebar__search-input')
const sidebarLayout = document.querySelector('.sidebar__layout')
const sidebarEmployer = document.querySelector('.sidebar-employer .sidebar__list-add')
const employerRowsWrapper = document.querySelector('.employer-rows-wrapper')


////Tooltips Templates
const countryTemplate = document.querySelector('#country-popup')
const countryTemplateVacancy = document.querySelector('#country-popup-vacancy')
const typeManufacturyTemplate = document.querySelector('#type-manufactury-popup')
const contactTemplate = document.querySelector('#contact-popup')
const managersTemplate = document.querySelector('#managers-popup')
const intermediariesTemplate = document.querySelector('#intermediaries-popup')
const lastContactTemplate = document.querySelector('#last-contact-popup')
const vacanciesTemplate = document.querySelector('#vacancies-popup')
const sortingTemplate = document.querySelector('#sorting-popup')
const choiceClientTemplate2 = document.querySelector('#choice-client-popup')
const statusTemplate = document.querySelector('#status-popup')
const selectingTemplate = document.querySelector('#selecting-popup')
const typeWorkTemplate = document.querySelector('#type-work-popup')
const dateTermsTemplate = document.querySelector('#date-terms-popup')



///WorkModal elements

const workModalRows = document.querySelector('.work-modal .rows')
const workModalSidebar = document.querySelector('.work-modal .sidebar__layout')
const workModalAddTask = document.querySelector('.work-modal .add-task-group .add-item')
const workModalManagerSelect = document.querySelector('.work-modal .manager-select')
const modal2ManagerSelect = document.querySelector('#modal-2 .manager-select')
const modal2ContactSelect = document.querySelector('#modal-2 .contact-select')
const workModalCountrySelect = document.querySelector('.work-modal .country-select')
const workModalContactsHistory = document.querySelector('.work-modal .contacts-history .modal-row__layer')
const workModalVacanciesHistory = document.querySelector('.work-modal .vacancies-history .modal-row__layer')
const modalRowMediaWrapper = document.querySelector('.work-modal .modal-row__media-wrapper')
const modalRowMedia = document.querySelectorAll('.work-modal .modal-row__media')
const workModalMediaLayer = document.querySelector('.work-modal .media .modal-row__layer')
const workModalFeedback = document.querySelector('.work-modal .feedback .modal-row__layer')
const feedbackShowMore = document.querySelector('.work-modal .feedback .show-more')
const mediaShowMore = document.querySelector('.work-modal .media .show-more')
const modalRowLayer = document.querySelectorAll('.work-modal .modal-row__layer')
const contactsHistory = document.querySelector('.work-modal .contacts-history')
const contactsHistoryShowMore = document.querySelector('.work-modal .contacts-history .show-more')



const vacanciesHistory = document.querySelector('.work-modal .vacancies-history')
const vacanciesHistoryShowMore = document.querySelector('.work-modal .vacancies-history .show-more')

const manufacturyTypeAddItem = document.querySelector('.work-modal .manufactury-type .add-item')
const manufacturyType = document.querySelector('.work-modal .manufactury-type')

const contactsHistoryAddItem = document.querySelector('.work-modal .contacts-history .add-item')


const modalSwitchers = document.querySelectorAll('[data-part]')
const modalParts = document.querySelectorAll('.my-modal-part')

const changeDirection = document.querySelectorAll('.change-direction')

const editBtns = document.querySelectorAll('.modal-row__feedback-edit')
const sidebarMailingItem = document.querySelector('.sidebar-mailing-item')
const createVacancyItem = document.querySelector('#vacancy-create')

// Popups elements
const sidebarEmployerForm = document.querySelector('.work-modal__sidebar-employer-form')
const workModalSidebarNotes = document.querySelector('.work-modal__sidebar-notes')

const employerDelete = document.querySelector('#employer-delete')
const employerStatNums = document.querySelector('#sidebar__stat-nums')


import {
    rows as vacancyRows,
    statusLeft,
    sliders,
    findEmployer,
    chooseEmployer,
    chooseProductType,
    chooseFullInfo,
    mainInfoChooseBlock,
    switcher,
    findEmployer2,
    chooseEmployer2,
    chooseProductType2,
    clientsRow,
    clientsModalLayer,
    demandsRow,
    termsRow,
    sidebarVacancyForm,
    vacancyModalSidebarNotes,
    archiveActive,
    sidebarVacancy,
    modalLayerLeft,
    modalLayerRight,
    vacancyRowsWrapper,
    vacancyDelete,
    vacancyArchive,
    vacancyCopy,
    sidebarStatNumsVacancy
} from './vacancy'


export {
    rows,
    countryTemplate,
    typeManufacturyTemplate,
    contactTemplate,
    lastContactTemplate,
    managersTemplate,
    intermediariesTemplate,
    vacanciesTemplate,
    sortingTemplate,
    workModalRows,
    workModalSidebar,
    body,
    workModalManagerSelect,
    workModalAddTask,
    sidebarSearchInput,
    workModalCountrySelect,
    workModalContactsHistory,
    sidebarLayout,
    workModalVacanciesHistory,
    workModalFeedback,
    feedbackShowMore,
    modalRowMediaWrapper,
    modalRowMedia,
    modalRowLayer,
    contactsHistory,
    contactsHistoryShowMore,
    vacanciesHistory,
    vacanciesHistoryShowMore,
    manufacturyTypeAddItem,
    manufacturyType,
    contactsHistoryAddItem,
    workModalMediaLayer,
    mediaShowMore,
    modal2ManagerSelect,
    modal2ContactSelect,
    statusTemplate,
    selectingTemplate,
    vacancyRows,
    statusLeft,
    typeWorkTemplate,
    dateTermsTemplate,
    sliders,
    findEmployer,
    chooseEmployer,
    chooseProductType,
    chooseFullInfo,
    mainInfoChooseBlock,
    switcher,
    findEmployer2,
    chooseEmployer2,
    chooseProductType2,
    clientsRow,
    modalParts,
    modalSwitchers,
    changeDirection,
    choiceClientTemplate2,
    editBtns,
    clientsModalLayer,
    sidebarEmployer,
    employerRowsWrapper,
    sidebarEmployerForm,
    countryTemplateVacancy,
    workModalSidebarNotes,
    employerDelete,
    demandsRow,
    termsRow,
    employerStatNums,
    sidebarVacancyForm,
    vacancyModalSidebarNotes,
    archiveActive,
    sidebarVacancy,
    modalLayerLeft,
    modalLayerRight,
    vacancyRowsWrapper,
    vacancyDelete,
    vacancyArchive,
    vacancyCopy,
    sidebarStatNumsVacancy,
    sidebarMailingItem,
    createVacancyItem,
}