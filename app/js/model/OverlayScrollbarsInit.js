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
				let target = this.getElements().target
				let $this = this
				if(target.classList.contains('feedback-row__layer')) {
					target.parentNode.querySelector('.add-item').addEventListener('click', function(){
						$this.scroll({ y : "-100%"})
					})

					target.parentNode.querySelector('.show-more').addEventListener('click', function(){
						$this.scroll({ y : "100%"})
					})
					
				}
				else if(target.classList.contains('modal-row__layer')) {
					this.scroll({ y : "100%"})
				}
		},
		onScroll: function(eventArgs){
			// console.log('ss')
		}
	}
	
}); 

}




export default initOverlayScrollbars

