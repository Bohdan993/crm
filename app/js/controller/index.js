import {
	initOverlayScrollbars,
	initTooltips,
	initToastr,
	initWorkModalSelect,
	sidebarSearchInput,
	show5Rows,
	initWorkPopup,
	addNewTask,
	deleteTask,
	setFeedbackDate,
	addFeedbackForm,
	switchRowStatuses,
	setDateToSlider,
	autocompleteInput,
	showChooseBlockFullInfo,
	showFullClientsRow,
	switchModalParts,
	changeDirection,
	feedbackEdit,
	getEmployersList,
	getManagerPopup,
	getManagerVacancyPopup,
	getIntermediariesPopup,
	getCountryPopup,
	getManufacturyTypePopup,
	getTypeContact,
	getClients,
	fetchScroll,
	addNewEmployer,
	mountSearchInput,
	mountContactDataPopup,
	mountLastContactPopup,
	mountSortingPopup,
	mountVacancyPopup,
	mountContactHistoryModal,
	mountSearchInputVacancy,
	getVacancyList,
	getCountryVacancyPopup,
	mountSortingVacancyPopup,
	getVacancyWorkType,
	getStatusesVacancyPopup,
	mountDateAndTermsPopup,
	getClientsVacancy,
	mountClientsVacancy
} from '../model'

import {OverlayScrollbars} from '../../libs/libs'
import {
	body,
	rows,
	sidebarLayout,
	workModalRows,
	workModalSidebar,
	workModalManagerSelect,
	sidebarSearchInput as searchInput,
	workModalCountrySelect,
	contactsHistoryShowMore,
	contactsHistory,
	vacanciesHistory,
	vacanciesHistoryShowMore,
	manufacturyTypeAddItem,
	manufacturyType,
	workModalMediaLayer,
	mediaShowMore,
	workModalAddTask,
	workModalFeedbackDate,
	modal2ManagerSelect,
	modal2ContactSelect,
	modal2ContactDate,
	feedbackAddItem,
	addfeedbackForm,
	vacancyRows,
	statusLeft,
	sliders,
	findEmployer,
	findEmployer2,
	chooseEmployer, 
	chooseProductType,
	workTypeTemplate,
	chooseFullInfo,
	mainInfoChooseBlock,
	switcher,
	chooseEmployer2,
	chooseProductType2,
	clientsRow,
	modalParts,
	modalSwitchers,
	changeDirection as changeDirectionArrows,
	editBtns,
	workModalFeedback,
	feedbackShowMore,
	clientsModalLayer,
	employerRowsWrapper

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.it()
		// this.t()
		this.iwms()
		this.ant()
		this.dt()
		this.sfd()
		this.aff()
		this.sdts()
		this.ai()
		this.scbfi()
		this.smp()
		this.fe()
		this.gel()
		this.gmp()
		this.gip()
		this.gcp()
		this.ane()
		this.itstr()
		this.gmtp()
		this.msi()
		this.msdp()
		this.mlcp()
		this.msp()
		this.mvp()
		this.fs()
		this.mchm()
		this.gtc()
		this.gc()
		this.gvl()
		this.gcvp()
		this.msvp()
		this.gvwt()
		this.gmvp()
		this.gsvp()
		this.msiv()
		this.mdatp()
		this.gcv()
		this.mcv()
	},

	initOSB(){
		initOverlayScrollbars(sidebarLayout)
		initOverlayScrollbars(workModalRows)
		initOverlayScrollbars(workModalSidebar)
		initOverlayScrollbars(workModalFeedback)
	},

	it() {
		initTooltips()
	},
	itstr() {
		initToastr()
	},
	iwms(){
		if(workModalManagerSelect) {
			initWorkModalSelect(workModalManagerSelect)
		}

		
		if(modal2ManagerSelect){
			initWorkModalSelect(modal2ManagerSelect)
		}
		

		if(modal2ContactSelect){
			initWorkModalSelect(modal2ContactSelect)
		}
	},
	ant() {
		if(workModalAddTask) {
			addNewTask(workModalAddTask)
		}
		
	},
	dt() {
		deleteTask(body)
	},
	sfd() {
		if(workModalFeedbackDate) {
			setFeedbackDate(workModalFeedbackDate)
		}
		
		if(modal2ContactDate) {
			setFeedbackDate(modal2ContactDate)
		}
		
		
	},
	aff() {
		if(addfeedbackForm) {
			addFeedbackForm(feedbackAddItem, addfeedbackForm)
		}
		
	},
	sdts() {
		setDateToSlider(sliders)
	},
	ai() {
		if(findEmployer) {
			autocompleteInput(findEmployer, chooseEmployer, chooseProductType)
		}

		if(findEmployer2) {
			autocompleteInput(findEmployer2, chooseEmployer2, chooseProductType2)
		}
		
	},

	scbfi() {
		if(workTypeTemplate) {
			showChooseBlockFullInfo(workTypeTemplate, {
				prev: chooseProductType,
				next: chooseFullInfo,
				block: mainInfoChooseBlock
			})
		}
		
	},
	smp() {
		switchModalParts(modalSwitchers, modalParts)
	},
	fe() {
		 feedbackEdit(editBtns)
	},

	gel() {
		getEmployersList()
	},

	gmp() {
		getManagerPopup()
	},
	gmvp(){
		getManagerVacancyPopup()
	},
	gip() {
		getIntermediariesPopup()
	},
	gcp() {
		// console.log('ddfdf')
		getCountryPopup()
	},
	gmtp(){
		getManufacturyTypePopup()
	},
	gtc(){
		getTypeContact()
	},
	gc(){
		getClients()
	},
	ane() {
		addNewEmployer()
	},
	msi(){
		mountSearchInput()
	},
	msdp(){
		mountContactDataPopup()
	},
	mlcp(){
		mountLastContactPopup()
	},
	msp(){
		mountSortingPopup()
	},
	mvp() {
		mountVacancyPopup()
	},
	fs(){
		if(employerRowsWrapper) {
			fetchScroll(employerRowsWrapper)
		}
	},
	mchm(){
		mountContactHistoryModal()
	},
	gvl(){
		// console.log(getVacancyList)
		getVacancyList()
	},
	gcvp(){
		getCountryVacancyPopup()
	},
	msvp(){
		mountSortingVacancyPopup(	)
	},
	gvwt(){
		getVacancyWorkType()
	},
	gsvp(){
		getStatusesVacancyPopup()
	},
	msiv() {
		mountSearchInputVacancy()
	},
	mdatp(){
		mountDateAndTermsPopup()
	},
	gcv(){
		getClientsVacancy()
	},
	mcv() {
		mountClientsVacancy()
	}

}


export {
	app
}