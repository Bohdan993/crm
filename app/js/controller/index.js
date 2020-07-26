import {

	initOverlayScrollbars,
	// sidebarListsToggle,
	playAudioHover,
	initPopups,
	initTooltips,
	initWorkPopup,
	test,
	initWorkModalSelect,
	sidebarSearchInput

} from '../model'

import {OverlayScrollbars} from '../../libs/libs'
import {

	sidebarListItems,
	rows,
	workModalRows,
	workModalSidebar,
	workModalManagerSelect,
	sidebarSearchInput as searchInput,
	workModalCountrySelect
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
		// this.test()
		// this.slt()
	},

	initOSB(){
		initOverlayScrollbars(workModalRows)
		initOverlayScrollbars(workModalSidebar)
		// initOverlayScrollbars(workModalSidebar)
		// console.log(OverlayScrollbars)
		OverlayScrollbars([document.querySelector('.sidebar__layout')], {
            paddingAbsolute: true,
            scrollbars: {
                autoHide: 'move',
                clickScrolling: true,
            },
            callbacks: {
            }
        });
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
	}

}


export {
	app
}