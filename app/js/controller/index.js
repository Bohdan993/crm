import {

	initOverlayScrollbars,
	// sidebarListsToggle,
	playAudioHover,
	initPopups,
	initTooltips,
	initWorkPopup,
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
	showRemoveBtnOnChecking
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

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.pah()
		this.ip()
		this.it()
		this.iwp()
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
	iwp() {
		initWorkPopup()
	},
	t(){
		test()
	},
	iwms(){
		initWorkModalSelect(workModalManagerSelect)
		initWorkModalSelect(workModalCountrySelect)
		initWorkModalSelect(modal2ManagerSelect)
		initWorkModalSelect(modal2ContactSelect)
		
	},
	ssi(){
		sidebarSearchInput(searchInput)
	},
	ciwie(){
		checkIfWrapperIsEmpty(modalRowLayer)
	},
	s5r() {
		show5Rows(contactsHistoryShowMore, contactsHistory)
		show5Rows(vacanciesHistoryShowMore, vacanciesHistory)
	},
	s1r() {
		show1Row(mediaShowMore, modalRowMedia)
	},
	amt() {
		addManufacturyType(manufacturyTypeAddItem, manufacturyType)
	},

	ach() {
		addContactHistory(contactsHistoryAddItem, contactsHistory)
	},

	cmw() {
		checkMediaWidth(modalRowMediaWrapper,modalRowMedia)
	},
	ant() {
		addNewTask(workModalAddTask)
	},
	dt() {
		deleteTask(body)
	},
	sfd() {
		setFeedbackDate(workModalFeedbackDate)
		setFeedbackDate(modal2ContactDate)
		
	},

	aff() {
		addFeedbackForm(feedbackAddItem, addfeedbackForm)
	},

	srboc() {
		showRemoveBtnOnChecking()
	}

}


export {
	app
}