import {isChildOf} from '../helper'

const showFullRow = (row) => {
	slideToggle(row)
	
	function slideToggle(linkToggle) {
	// for(let i = 0; i < linkToggle.length; i++){

	  linkToggle.addEventListener('click', function(event){

	  		let container  = this.querySelector('.table-full')
	  		
	  		if(event.target.classList.contains('no-open')) {
					return
				}

				if(isChildOf(event.target, container)) {
					return
				}
		    

		    if (container && !container.classList.contains('active')) {
		      
		      container.classList.add('active');
		      container.style.height = 'auto';

		      let height = container.clientHeight + 'px';

		      container.style.height = '0px';

		      setTimeout(function () {
		        container.style.height = height;
		      }, 0);
		      
		    } else {
		      
		      container.style.height = '0px';

		      this.addEventListener('transitionend', function () {
		        container.classList.remove('active');
		      }, {
		        once: true
		      });
		      
		    }
	    
	  });

	// }
}
}

export default showFullRow