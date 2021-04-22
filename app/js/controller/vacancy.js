import {
	initOverlayScrollbars,
	initTooltips,
	initToastr,
	initWorkModalSelect,
	addNewTask,
	setFeedbackDate,
	addFeedbackForm,
	setDateToSlider,
	autocompleteInput,
	showChooseBlockFullInfo,
	switchModalParts,
	feedbackEdit,
	getEmployersList,
	getManagerPopup,
	getManagerVacancyPopup,
	getIntermediariesPopup,
	getCountryPopup,
	getManufacturyTypePopup,
	getTypeContact,
	getClients,
	// fetchScroll,
	vacancyFetchScroll,
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
	getVacancyEmployers,
	addNewVacancy,
	mountActiveArchive,
	mountVacancyStatusesPopup
} from '../model'

import {
	sidebarLayout,
	workModalRows,
	workModalSidebar,
	workModalManagerSelect,
	workModalAddTask,
	workModalFeedbackDate,
	modal2ManagerSelect,
	modal2ContactSelect,
	modal2ContactDate,
	feedbackAddItem,
	addfeedbackForm,
	sliders,
	findEmployer,
	findEmployer2,
	chooseEmployer, 
	chooseProductType,
	workTypeTemplate,
	chooseFullInfo,
	mainInfoChooseBlock,
	chooseEmployer2,
	chooseProductType2,
	modalParts,
	modalSwitchers,
	editBtns,
	workModalFeedback,
	employerRowsWrapper,
	vacancyRowsWrapper

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.it()
		this.iwms()
		this.ant()
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
		this.maa()
		this.anv()
		this.gve()
		this.mvsp()
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
		// if(vacancyRowsWrapper) {
		vacancyFetchScroll(vacancyRowsWrapper)
		// }
	},
	mchm(){
		mountContactHistoryModal()
	},
	gvl(){
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
	maa(){
		mountActiveArchive()
	},
	anv(){
		addNewVacancy()
	},
	gve(){
		getVacancyEmployers()
	},
	mvsp(){
		mountVacancyStatusesPopup()
	}

}


export {
	app
}