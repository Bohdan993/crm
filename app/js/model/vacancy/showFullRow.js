import {isChildOf} from '../helper'

const showFullRow = (row, event) => {
	slideToggle(row, event)
}


	function slideToggle(linkToggle, event) {

	  		let container  = linkToggle.querySelector('.table-full')
	  		
	  		if(event.target.classList.contains('no-open')) {
					return
				}

				if(isChildOf(event.target, container)) {
					return
				}
		    

		    if (container && !container.classList.contains('active')) {
		    	// console.log(container)
		      
		      container.classList.add('active')
		      container.style.height = 'auto'

		      let height = container.clientHeight + 'px'

		      container.style.height = '0px'

		      setTimeout(function () {
		        container.style.height = height
		      }, 0)
		      
		    } else {
		      	// console.log(container)
		      container.style.height = '0px'

		      linkToggle.addEventListener('transitionend', function () {
		        container.classList.remove('active')
		      }, {
		        once: true
		      });
		      
		    }
}
export default showFullRow