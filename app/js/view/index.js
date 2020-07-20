const sidebarWrapper = document.querySelector('.sidebar__wrapper');
const sidebarListItems = document.querySelectorAll('.sidebar__list-item');
const rows = document.querySelectorAll('.row');

////Tooltips Templates
const countryTemplate = document.querySelector('#country-popup');
const typeManufacturyTemplate = document.querySelector('#type-manufactury-popup');
const contactTemplate = document.querySelector('#contact-popup');
const lastContactTemplate = document.querySelector('#last-contact-popup');




export {
	sidebarWrapper,
	sidebarListItems,
	rows,
	countryTemplate,
	typeManufacturyTemplate,
	contactTemplate,
	lastContactTemplate
}