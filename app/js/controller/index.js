import {

	initOverlayScrollbars,
	// sidebarListsToggle,
	playAudioHover,
	initPopups

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
	}

}


export {
	app
}