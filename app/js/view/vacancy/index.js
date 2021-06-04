const rows = document.querySelectorAll('.vacancy-rows .row')
const vacancyRowsWrapper = document.querySelector('.vacancy-rows-wrapper')
const statusLeft = document.querySelectorAll('.cell-status__left') 

const sliders = document.querySelectorAll('.cell-status__slider')

const findEmployer = document.querySelector('#employer-type-popup .input-group')
const findEmployer2 = document.querySelector('#employer-type-popup2 .input-group')

const chooseEmployer =  document.querySelector('.main-info_left .choose-employer')
const chooseEmployer2 = document.querySelector('.main-info_right .choose-employer')

const chooseProductType = document.querySelector('.main-info_left .choose-product-type')
const chooseProductType2 = document.querySelector('.main-info_right .employer-name')

const chooseFullInfo = document.querySelector('.main-info_left .full-info')

const mainInfoChooseBlock = document.querySelector('.main-info_left .main-info__choose-block')

const clientsModalLayer = document.querySelector('.clients .modal-row__layer')

const switcher  = document.querySelector('.switcher')
const clientsRow = document.querySelector('.row.clients.modal-row')

const datePopup = document.querySelector('#date-terms-popup')

const demandsRow = document.querySelector('.row.demands.modal-row')
const termsRow = document.querySelector('.row.terms.modal-row')

const sidebarVacancyForm = document.querySelector('.vacancy-modal__sidebar-vacancy-form')
const vacancyModalSidebarNotes = document.querySelector('.vacancy-modal__sidebar-notes')
const archiveActive = document.querySelector('.active-archive__statuses')
const modalLayerLeft = document.querySelector('.modal-row__layer.main-info_left')
const modalLayerRight = document.querySelector('.modal-row__layer.main-info_right')
const sidebarVacancy = document.querySelector('.vacancy-sidebar .sidebar__list-add')

const vacancyDeconste = document.querySelector('#vacancy-deconste')
const vacancyCopy = document.querySelector('#vacancy-copy')
const vacancyArchive = document.querySelector('#vacancy-archive')
const vacancyDelete = document.querySelector('#vacancy-delete')

const sidebarStatNumsVacancy = document.querySelector('.sidebar__stat-nums_vacancy')
export {

	rows,
	statusLeft,
	sliders,
	findEmployer,
	chooseProductType,
	chooseEmployer,
	chooseFullInfo,
	mainInfoChooseBlock,
	switcher,
	findEmployer2,
	chooseEmployer2,
	chooseProductType2,
	clientsRow,
	clientsModalLayer,
	datePopup,
	demandsRow,
	termsRow,
	sidebarVacancyForm,
	vacancyModalSidebarNotes,
	archiveActive,
	sidebarVacancy,
	modalLayerLeft,
	modalLayerRight,
	vacancyRowsWrapper,
	vacancyDeconste,
	vacancyCopy,
	vacancyArchive,
	sidebarStatNumsVacancy,
	vacancyDelete
	// mainInfoPrice
	
}