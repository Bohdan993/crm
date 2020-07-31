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
	addContactHistory

} from '../model'

import {OverlayScrollbars} from '../../libs/libs'
import {

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
		this.amt()
		this.ach()
		// this.test()
		// this.slt()
	},

	initOSB(){
		initOverlayScrollbars(sidebarLayout)
		initOverlayScrollbars(workModalRows)
		initOverlayScrollbars(workModalSidebar)
		initOverlayScrollbars(workModalContactsHistory)
		initOverlayScrollbars(workModalVacanciesHistory)
		
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
	amt() {
		addManufacturyType(manufacturyTypeAddItem, manufacturyType)
	},

	ach() {
		addContactHistory(contactsHistoryAddItem, contactsHistory)
	}

}


export {
	app
}