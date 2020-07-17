import {OverlayScrollbars} from '../../libs/libs'



const initOverlayScrollbars = (node)=> {
	let instance = OverlayScrollbars(node, {
	className       : "os-theme-dark",
	sizeAutoCapable : true,
	paddingAbsolute : true,
	scrollbars : {
		clickScrolling : true,
		autoHide : 'leave',
		autoHideDelay: 50
	}
}); 
}




export default initOverlayScrollbars
