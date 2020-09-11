import {

	initOverlayScrollbars,
	// sidebarListsToggle,
	playAudioHover,
	initPopups,
	initTooltips,
	// initWorkPopup,
	initToastr,
	test,
	initWorkModalSelect,
	sidebarSearchInput,
	checkIfWrapperIsEmpty,
	checkMediaWidth,
	show5Rows,
	addManufacturyType,
	addContactHistory,
	show1Row,
	addNewTask,
	deleteTask,
	setFeedbackDate,
	addFeedbackForm,
	showRemoveBtnOnChecking,
	showFullRow,
	switchRowStatuses,
	setDateToSlider,
	autocompleteInput,
	showChooseBlockFullInfo,
	showFullClientsRow,
	switchModalParts,
	linkToSocial,
	changeDirection,
	feedbackEdit,
	getEmployersList,
	getManagerPopup,
	getIntermediariesPopup,
	getCountryPopup,
	addNewEmployer
} from '../model'

import {OverlayScrollbars} from '../../libs/libs'
import {
	body,
	sidebarListItems,
	rows,
	sidebarLayout,
	workModalRows,
	workModalSidebar,
	workModalManagerSelect,
	sidebarSearchInput as searchInput,
	workModalCountrySelect,
	workModalContactsHistory,
	workModalVacanciesHistory,
	modalRowMediaWrapper,
	modalRowMedia,
	modalRowLayer,
	contactsHistoryShowMore,
	contactsHistory,
	vacanciesHistory,
	vacanciesHistoryShowMore,
	manufacturyTypeAddItem,
	manufacturyType,
	contactsHistoryAddItem,
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
	socialLinks,
	changeDirection as changeDirectionArrows,
	editBtns,
	workModalFeedback,
	feedbackShowMore,
	clientsModalLayer

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.pah()
		this.ip()
		this.it()
		// this.iwp()
		this.t()
		this.iwms()
		this.ssi()
		this.ciwie()
		this.s5r()
		this.s1r()
		this.amt()
		this.ach()
		this.cmw()
		this.ant()
		this.dt()
		this.sfd()
		this.aff()
		this.srboc()
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
		// this.test()
		// this.slt()
	},

	initOSB(){
		initOverlayScrollbars(sidebarLayout)
		initOverlayScrollbars(workModalRows)
		initOverlayScrollbars(workModalSidebar)
		initOverlayScrollbars(workModalContactsHistory)
		initOverlayScrollbars(workModalVacanciesHistory)
		initOverlayScrollbars(workModalMediaLayer)
		initOverlayScrollbars(workModalFeedback)
		initOverlayScrollbars(clientsModalLayer)
		
		
		// console.log(OverlayScrollbars)
		// OverlayScrollbars([document.querySelector('.sidebar__layout')], {
  //           paddingAbsolute: true,
  //           scrollbars: {
  //               autoHide: 'move',
  //               clickScrolling: true,
  //           },
  //           callbacks: {
  //           }
  //       });
	},
	// slt(){
	// 	sidebarListsToggle(sidebarListItems)
	// }
	pah(){
		playAudioHover(rows)
	},

	ip(){
		initPopups()
	},
	it() {
		initTooltips()
	},
	itstr() {
		initToastr()
	},
	iwp() {
		// initWorkPopup()
	},
	t(){
		test()
	},
	iwms(){
		if(workModalManagerSelect) {
			initWorkModalSelect(workModalManagerSelect)
		}

		if(workModalCountrySelect) {
			initWorkModalSelect(workModalCountrySelect)
		}
		
		if(modal2ManagerSelect){
			initWorkModalSelect(modal2ManagerSelect)
		}
		

		if(modal2ContactSelect){
			initWorkModalSelect(modal2ContactSelect)
		}
		
		
		
	},
	ssi(){
		sidebarSearchInput(searchInput)
	},
	ciwie(){
		checkIfWrapperIsEmpty(modalRowLayer)
	},
	s5r() {

		if(contactsHistory) {
			show5Rows(contactsHistoryShowMore, contactsHistory)
		}

		if(vacanciesHistory) {
			show5Rows(vacanciesHistoryShowMore, vacanciesHistory)
		}

	},
	s1r() {
		show1Row(feedbackShowMore, workModalFeedback)
	},
	amt() {
		if(manufacturyType) {
			addManufacturyType(manufacturyTypeAddItem, manufacturyType)
		}
		
	},

	ach() {
		addContactHistory(contactsHistoryAddItem, contactsHistory)
	},

	cmw() {
		checkMediaWidth(modalRowMediaWrapper,modalRowMedia)
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

	srboc() {
		showRemoveBtnOnChecking()
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
		linkToSocial(socialLinks)
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
	ane() {
		addNewEmployer()
	}

}


export {
	app
}