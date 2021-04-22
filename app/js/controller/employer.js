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
	getIntermediariesPopup,
	getCountryPopup,
	getManufacturyTypePopup,
	getTypeContact,
	getClients,
	// fetchScroll,
	employerFetchScroll,
	addNewEmployer,
	mountSearchInput,
	mountContactDataPopup,
	mountLastContactPopup,
	mountSortingPopup,
	mountVacancyPopup,
	mountContactHistoryModal,
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
		// this.msiv()
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
		employerFetchScroll(employerRowsWrapper)
	},
	mchm(){
		mountContactHistoryModal()
	},

}


export {
	app
}