import {

	initOverlayScrollbars,
	// sidebarListsToggle,
	playAudioHover,
	initPopups,
	initTooltips,
	initWorkPopup

} from '../model'


import {

	sidebarWrapper,
	sidebarListItems,
	rows

} from '../view'

const app = {
	init() {
		this.initOSB()
		this.pah()
		this.ip()
		this.it()
		this.iwp()
		// this.test()
		// this.slt()
	},

	initOSB(){
		initOverlayScrollbars(sidebarWrapper)
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
	}

}


export {
	app
}