import {OverlayScrollbars} from '../../libs/libs'



const initOverlayScrollbars = (node)=> {
	let flag = false
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
				// if(!flag) {
				let target = this.getElements().target
				let $this = this
				if(target.classList.contains('feedback-row__layer')) {
				
					target.parentNode.querySelector('.add-item').addEventListener('click', function(){
						$this.scroll({ y : "-100%"})
					}, {once: true})

					target.closest('.feedback-employer__layer').addEventListener('click', function(e){
						if(e.target.parentNode.classList.contains('show-more')) {
							$this.scroll({ y : "100%"})
						}
					}, {once: true})
					
				}
				else if(target.classList.contains('modal-row__layer')) {
					console.log(false)
					this.scroll({ y : "100%"})
				}

				flag = true
			// }
		},
		onScroll: function(eventArgs){
			// console.log('ss')
		}
	}
	
}); 

}




export default initOverlayScrollbars

