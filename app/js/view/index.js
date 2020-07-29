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



///WorkModal elements

const workModalRows = document.querySelector('.work-modal .rows')
const workModalSidebar = document.querySelector('.work-modal .sidebar__layout')
const workModalManagerSelect = document.querySelector('.work-modal .manager-select')
const workModalCountrySelect = document.querySelector('.work-modal .country-select')
const workModalContactsHistory = document.querySelector('.work-modal .contacts-history .modal-row__layer');
const workModalVacanciesHistory = document.querySelector('.work-modal .vacancies-history .modal-row__layer');







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
	workModalRows,
	workModalSidebar,
	body,
	workModalManagerSelect,
	sidebarSearchInput,
	workModalCountrySelect,
	workModalContactsHistory,
	sidebarLayout,
	workModalVacanciesHistory
}