// const sidebarWrapper = document.querySelector('.sidebar__wrapper');
const body = document.querySelector('body');
const sidebarListItems = document.querySelectorAll('.sidebar__list-item');
const rows = document.querySelectorAll('.row');
const sidebarSearchInput = document.querySelector('.sidebar__search-input');
const sidebarLayout = document.querySelector('.sidebar__layout');

////Tooltips Templates
const countryTemplate = document.querySelector('#country-popup');
const typeManufacturyTemplate = document.querySelector('#type-manufactury-popup');
const contactTemplate = document.querySelector('#contact-popup');
const managersTemplate = document.querySelector('#managers-popup');
const intermediariesTemplate = document.querySelector('#intermediaries-popup');
const lastContactTemplate = document.querySelector('#last-contact-popup');
const vacanciesTemplate = document.querySelector('#vacancies-popup');
const sortingTemplate = document.querySelector('#sorting-popup');
const typeFeedbackTemplate = document.querySelector('#type-feedback-popup')
const choiceClientTemplate = document.querySelector('#choice-client-feedback-popup')
const statusTemplate = document.querySelector('#status-popup')
const selectingTemplate = document.querySelector('#selecting-popup')
const typeWorkTemplate = document.querySelector('#type-work-popup')
const dateTermsTemplate = document.querySelector('#date-terms-popup')
const employerTypeTemplate = document.querySelector('#employer-type-popup')
const employerTypeTemplate2 = document.querySelector('#employer-type-popup2')
const workTypeTemplate = document.querySelector('#work-type-popup')
const pricePopupTemplate = document.querySelector('#price-popup')
// const statusChangeTemplate = document.querySelector('#status-change-popup')




///WorkModal elements

const workModalRows = document.querySelector('.work-modal .rows')
const workModalSidebar = document.querySelector('.work-modal .sidebar__layout')
const workModalAddTask = document.querySelector('.work-modal .add-task-group .add-item')
const workModalManagerSelect = document.querySelector('.work-modal .manager-select')
const modal2ManagerSelect = document.querySelector('#modal-2 .manager-select')
const modal2ContactSelect = document.querySelector('#modal-2 .contact-select')
const workModalCountrySelect = document.querySelector('.work-modal .country-select')
const workModalContactsHistory = document.querySelector('.work-modal .contacts-history .modal-row__layer');
const workModalVacanciesHistory = document.querySelector('.work-modal .vacancies-history .modal-row__layer');
const modalRowMediaWrapper = document.querySelector('.work-modal .modal-row__media-wrapper');
const modalRowMedia = document.querySelectorAll('.work-modal .modal-row__media');
const workModalMediaLayer = document.querySelector('.work-modal .media .modal-row__layer');
const mediaShowMore = document.querySelector('.work-modal .media .show-more');
const modalRowLayer = document.querySelectorAll('.work-modal .modal-row__layer');
const contactsHistory = document.querySelector('.work-modal .contacts-history');
const contactsHistoryShowMore = document.querySelector('.work-modal .contacts-history .show-more');

const vacanciesHistory = document.querySelector('.work-modal .vacancies-history');
const vacanciesHistoryShowMore = document.querySelector('.work-modal .vacancies-history .show-more');

const manufacturyTypeAddItem = document.querySelector('.work-modal .manufactury-type .add-item');
const manufacturyType = document.querySelector('.work-modal .manufactury-type');


const contactsHistoryAddItem = document.querySelector('.work-modal .contacts-history .add-item');


const workModalFeedbackDate = document.querySelector('.work-modal .modal-row__feedback-date input')
const modal2ContactDate = document.querySelector('#modal-2 .date-block input')


const feedbackAddItem = document.querySelector('.work-modal .feedback .add-item')
const addfeedbackForm = document.querySelector('.work-modal .feedback .add-feedback-form')


const modalSwitchers = document.querySelectorAll('[data-part]')
const modalParts = document.querySelectorAll('.my-modal-part')


// Popups elements

const confirmBtnTypeFeedback = document.querySelector('#type-feedback-popup .confirm-btn')






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
	clientsRow
	// mainInfoPrice
} from './vacancy'



export {
	// sidebarWrapper,
	sidebarListItems,
	rows,
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
	workModalFeedbackDate,
	modal2ManagerSelect,
	modal2ContactSelect,
	modal2ContactDate,
	feedbackAddItem,
	addfeedbackForm,
	statusTemplate,
	selectingTemplate,
	vacancyRows,
	statusLeft,
	typeWorkTemplate,
	dateTermsTemplate,
	sliders,
	employerTypeTemplate,
	employerTypeTemplate2,
	findEmployer,
	chooseEmployer, 
	chooseProductType,
	workTypeTemplate,
	chooseFullInfo,
	mainInfoChooseBlock,
	pricePopupTemplate,
	switcher,
	findEmployer2,
	chooseEmployer2,
	chooseProductType2,
	clientsRow,
	modalParts,
	modalSwitchers
	// mainInfoPrice
	// statusChangeTemplate
}