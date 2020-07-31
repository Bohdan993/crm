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
	},

	callbacks : {
			onContentSizeChanged: function(eventArgs) {
				if(this.getElements().target.classList.contains('modal-row__layer')) {
					this.scroll({ y : "100%"  })
				}
		},

		// onHostSizeChanged: function(eventArgs){
		// 	console.log(eventArgs)
		// }
	}
	
}); 

}




export default initOverlayScrollbars

