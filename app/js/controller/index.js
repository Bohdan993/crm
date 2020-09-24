import {
	initOverlayScrollbars,
	initTooltips,
	initToastr,
	test,
	initWorkModalSelect,
	sidebarSearchInput,
	show5Rows,
	addManufacturyType,
	show1Row,
	addNewTask,
	deleteTask,
	setFeedbackDate,
	addFeedbackForm,
	showFullRow,
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
	getIntermediariesPopup,
	getCountryPopup,
	getManufacturyTypePopup,
	addNewEmployer,
	mountSearchInput,
	mountContactDataPopup,
	mountLastContactPopup,
	mountSortingPopup,
	mountVacancyPopup
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
	clientsModalLayer

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.it()
		this.t()
		this.iwms()
		this.ssi()
		this.s5r()
		this.s1r()
		this.amt()
		this.ant()
		this.dt()
		this.sfd()
		this.aff()
		this.sfr()
		this.srs()
		this.sdts()
		this.ai()
		this.scbfi()
		this.sfcr()
		this.smp()
		this.lts()
		this.cd()
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


	},

	initOSB(){
		initOverlayScrollbars(sidebarLayout)
		initOverlayScrollbars(workModalRows)
		initOverlayScrollbars(workModalSidebar)
		initOverlayScrollbars(workModalFeedback)
		initOverlayScrollbars(clientsModalLayer)
	},

	it() {
		initTooltips()
	},
	itstr() {
		initToastr()
	},
	t(){
		test()
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
	ssi(){
		// sidebarSearchInput(searchInput)
	},

	s5r() {

		// if(contactsHistory) {
		// 	show5Rows(contactsHistoryShowMore, contactsHistory)
		// }

		if(vacanciesHistory) {
			show5Rows(vacanciesHistoryShowMore, vacanciesHistory)
		}

	},
	s1r() {
		show1Row(feedbackShowMore, workModalFeedback)
	},
	amt() {
		// if(manufacturyType) {
		// 	addManufacturyType(manufacturyTypeAddItem, manufacturyType)
		// }
		
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



	sfr(){
		if(vacancyRows){
			showFullRow(vacancyRows)
		}
	},

	srs() {
		switchRowStatuses(statusLeft)
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

	sfcr() {
		if(clientsRow) {
			showFullClientsRow(switcher, clientsRow)
		}
		
	},

	smp() {
		switchModalParts(modalSwitchers, modalParts)
	},

	lts() {
		// linkToSocial(socialLinks)
	},

	cd() {
		changeDirection(changeDirectionArrows)
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
	}

}


export {
	app
}